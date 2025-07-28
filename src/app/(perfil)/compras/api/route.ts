import { openDb } from "../../../../db/confgDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = await openDb();
  try {
    const compras = await db.all(
      "SELECT id_compra, id_item, nome_item, id_pedido, data_compra, data_estimada_entrega, data_entrega, valor FROM compras"
    );
    return NextResponse.json(compras);
  } catch (error) {
    if (error instanceof Error && error.message.includes("no such table")) {
      await db.exec(`
        CREATE TABLE compras (
          id_compra INTEGER PRIMARY KEY AUTOINCREMENT,
          id_item INTEGER,
          nome_item TEXT,
          id_pedido INTEGER,
          data_compra INTEGER,
          data_estimada_entrega INTEGER,
          data_entrega INTEGER,
          valor NUMERIC
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
    id_item,
    nome_item,
    id_pedido,
    data_compra,
    data_estimada_entrega,
    data_entrega,
    valor,
  } = await req.json();

  try {
    await db.run(
      "INSERT INTO compras (id_item, nome_item, id_pedido, data_compra, data_estimada_entrega, data_entrega, valor) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id_item, nome_item, id_pedido, data_compra, data_estimada_entrega, data_entrega, valor]
    );
    return NextResponse.json(
      { message: "Compra criada com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao criar compra" },
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
      { error: "ID da compra é obrigatório" },
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
      `UPDATE compras SET ${setClause} WHERE id_compra = ?`,
      values
    );
    return NextResponse.json(
      { message: "Compra atualizada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao atualizar compra" },
      { status: 409 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const db = await openDb();
  const { id_compra } = await req.json();
  try {
    await db.run("DELETE FROM compras WHERE id_compra = ?", [id_compra]);
    return NextResponse.json(
      { message: "Compra excluída com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao excluir compra" },
      { status: 409 }
    );
  }
}