import { openDb } from "../../../../../db/confgDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = await openDb();
  try {
    const historico = await db.all(
      "SELECT id_compra, id_produto, fornecedor, quantidade_itens_pedidos, quantidade_itens_chegou, valor, data_pedido, data_estimada_chegada, data_chegada, observacoes FROM historico_compras"
    );
    return NextResponse.json(historico);
  } catch (error) {
    if (error instanceof Error && error.message.includes("no such table")) {
      await db.exec(`
        CREATE TABLE historico_compras (
          id_compra INTEGER PRIMARY KEY AUTOINCREMENT,
          id_produto INTEGER,
          fornecedor TEXT,
          quantidade_itens_pedidos INTEGER,
          quantidade_itens_chegou INTEGER,
          valor NUMERIC,
          data_pedido INTEGER,
          data_estimada_chegada INTEGER,
          data_chegada INTEGER,
          observacoes TEXT
        )
      `);
      return NextResponse.json([]);
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const db = await openDb();
  const {
    id_produto,
    fornecedor,
    quantidade_itens_pedidos,
    quantidade_itens_chegou,
    valor,
    data_pedido,
    data_estimada_chegada,
    data_chegada,
    observacoes,
  } = await req.json();

  try {
    await db.run(
      "INSERT INTO historico_compras (id_produto, fornecedor, quantidade_itens_pedidos, quantidade_itens_chegou, valor, data_pedido, data_estimada_chegada, data_chegada, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id_produto, fornecedor, quantidade_itens_pedidos, quantidade_itens_chegou, valor, data_pedido, data_estimada_chegada, data_chegada, observacoes]
    );
    return NextResponse.json(
      { message: "Histórico de compra criado com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao criar histórico de compra" },
      { status: 409 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const db = await openDb();
  const dados = await req.json();
  const { id_compra, ...campos } = dados;

  if (!id_compra) {
    return NextResponse.json(
      { error: "ID do histórico de compra é obrigatório" },
      { status: 400 }
    );
  }

  const keys = Object.keys(campos);
  if (keys.length === 0) {
    return NextResponse.json(
      { error: "Nenhum campo para atualizar" },
      { status: 400 }
    );
  }

  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const values = keys.map((key) => campos[key]);
  values.push(id_compra);

  try {
    await db.run(
      `UPDATE historico_compras SET ${setClause} WHERE id_compra = ?`,
      values
    );
    return NextResponse.json(
      { message: "Histórico de compra atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao atualizar histórico de compra" },
      { status: 409 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const db = await openDb();
  const { id_compra } = await req.json();
  try {
    await db.run("DELETE FROM historico_compras WHERE id_compra = ?", [id_compra]);
    return NextResponse.json(
      { message: "Histórico de compra excluído com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao excluir histórico de compra" },
      { status: 409 }
    );
  }
}