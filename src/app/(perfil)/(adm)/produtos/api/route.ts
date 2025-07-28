import { openDb } from "../../../../../db/confgDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = await openDb();
  try {
    const produtos = await db.all(
      "SELECT id_produto, nome, valor, quantidade, quantidade_minima, data_ultima_remeca, quantidade_ultima_remeca FROM produtos"
    );
    return NextResponse.json(produtos);
  } catch (error) {
    if (error instanceof Error && error.message.includes("no such table")) {
      await db.exec(`
        CREATE TABLE produtos (
          id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT,
          valor NUMERIC,
          quantidade INTEGER,
          quantidade_minima INTEGER,
          data_ultima_remeca INTEGER,
          quantidade_ultima_remeca INTEGER
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
    nome,
    valor,
    quantidade,
    quantidade_minima,
    data_ultima_remeca,
    quantidade_ultima_remeca,
  } = await req.json();

  try {
    await db.run(
      "INSERT INTO produtos (nome, valor, quantidade, quantidade_minima, data_ultima_remeca, quantidade_ultima_remeca) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, valor, quantidade, quantidade_minima, data_ultima_remeca, quantidade_ultima_remeca]
    );
    return NextResponse.json(
      { message: "Produto criado com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { error: "erro ao criar produto" },
      { status: 409 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const db = await openDb();
  const dados = await req.json();
  const { id_produto, ...campos } = dados;

  if (!id_produto) {
    return NextResponse.json(
      { error: "ID do produto é obrigatório" },
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
  values.push(id_produto);

  try {
    await db.run(
      `UPDATE produtos SET ${setClause} WHERE id_produto = ?`,
      values
    );
    return NextResponse.json(
      { message: "Produto atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json(
      { error: "erro ao atualizar produto" },
      { status: 409 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const db = await openDb();
  const { id_produto } = await req.json();
  try {
    await db.run("DELETE FROM produtos WHERE id_produto = ?", [id_produto]);
    return NextResponse.json(
      { message: "Produto excluído com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    return NextResponse.json(
      { error: "erro ao excluir produto" },
      { status: 409 }
    );
  }
}