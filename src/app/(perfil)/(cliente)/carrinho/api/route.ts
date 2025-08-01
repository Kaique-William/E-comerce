import { openDb } from "../../../../../db/confgDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = await openDb();
  try {
    const carrinho = await db.all(
      "SELECT id_carrinho, id_cliente, id_item, nome_item, valor FROM carrinho"
    );
    return NextResponse.json(carrinho);
  } catch (error) {
    if (error instanceof Error && error.message.includes("no such table")) {
      await db.exec(`
        CREATE TABLE Carrinho (
          id_carrinho INTEGER PRIMARY KEY AUTOINCREMENT,
          id_cliente INTEGER NOT NULL,
          id_item INTEGER NOT NULL,
          nome_item TEXT NOT NULL,
          quantidade INTEGER NOT NULL, valor real not null DEFAULT 0,

          FOREIGN KEY (id_cliente) REFERENCES usuarios(id_usuario),
          FOREIGN KEY (id_item) REFERENCES produtos(id_produto)
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
  const { id_cliente, id_item, nome_item, valor } = await req.json();

  try {
    await db.run(
      "INSERT INTO carrinho (id_cliente, id_item, nome_item, valor) VALUES (?, ?, ?, ?)",
      [id_cliente, id_item, nome_item, valor]
    );
    return NextResponse.json(
      { message: "Item adicionado ao carrinho!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao adicionar ao carrinho" },
      { status: 409 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const db = await openDb();
  const dados = await req.json();
  const { id_carrinho, ...campos } = dados;

  if (!id_carrinho) {
    return NextResponse.json(
      { error: "ID do carrinho é obrigatório" },
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
  values.push(id_carrinho);

  try {
    await db.run(
      `UPDATE carrinho SET ${setClause} WHERE id_carrinho = ?`,
      values
    );
    return NextResponse.json(
      { message: "Carrinho atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao atualizar carrinho" },
      { status: 409 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const db = await openDb();
  const { id_carrinho } = await req.json();
  try {
    await db.run("DELETE FROM carrinho WHERE id_carrinho = ?", [id_carrinho]);
    return NextResponse.json(
      { message: "Item removido do carrinho!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao remover do carrinho" },
      { status: 409 }
    );
  }
}