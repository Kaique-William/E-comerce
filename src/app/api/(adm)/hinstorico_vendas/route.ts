import { openDb } from "../../../../db/confgDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = await openDb();
  try {
    const historico = await db.all(
      "SELECT id_vendas, id_cliente, id_itens, destino, quantidade_total, valor_total, quantidade_itens, valor_unitario, data_compra, data_confirmacao_venda, data_entrega FROM historico_vendas"
    );
    return NextResponse.json(historico);
  } catch (error) {
    if (error instanceof Error && error.message.includes("no such table")) {
      await db.exec(`
        CREATE TABLE Historico_vendas (
          id_vendas INTEGER PRIMARY KEY AUTOINCREMENT,
          id_cliente INTEGER NOT NULL,
          id_itens INTEGER NOT NULL,
          destino TEXT NOT NULL,
          quantidade_total INTEGER NOT NULL,
          valor_total REAL NOT NULL,
          quantidade_itens INTEGER NOT NULL,
          valor_unitario REAL NOT NULL,
          data_compra DATE NOT NULL,
          data_pagamento DATE NOT NULL,
          data_entrega DATE,
          data_estimada_entrega DATE,

          FOREIGN KEY (id_cliente) REFERENCES usuarios(id_usuario),
          FOREIGN KEY (id_itens) REFERENCES produtos(id_produto)
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
    id_cliente,
    id_itens,
    destino,
    quantidade_total,
    valor_total,
    quantidade_itens,
    valor_unitario,
    data_compra,
    data_confirmacao_venda,
    data_entrega,
  } = await req.json();

  try {
    await db.run(
      "INSERT INTO historico_vendas (id_cliente, id_itens, destino, quantidade_total, valor_total, quantidade_itens, valor_unitario, data_compra, data_confirmacao_venda, data_entrega) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id_cliente, id_itens, destino, quantidade_total, valor_total, quantidade_itens, valor_unitario, data_compra, data_confirmacao_venda, data_entrega]
    );
    return NextResponse.json(
      { message: "Histórico de venda criado com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao criar histórico de venda" },
      { status: 409 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const db = await openDb();
  const dados = await req.json();
  const { id_vendas, ...campos } = dados;

  if (!id_vendas) {
    return NextResponse.json(
      { error: "ID do histórico de venda é obrigatório" },
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
  values.push(id_vendas);

  try {
    await db.run(
      `UPDATE historico_vendas SET ${setClause} WHERE id_vendas = ?`,
      values
    );
    return NextResponse.json(
      { message: "Histórico de venda atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao atualizar histórico de venda" },
      { status: 409 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const db = await openDb();
  const { id_vendas } = await req.json();
  try {
    await db.run("DELETE FROM historico_vendas WHERE id_vendas = ?", [id_vendas]);
    return NextResponse.json(
      { message: "Histórico de venda excluído com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao excluir histórico de venda" },
      { status: 409 }
    );
  }
}