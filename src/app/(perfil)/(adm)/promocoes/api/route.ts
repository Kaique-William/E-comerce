import { openDb } from "../../../../../db/confgDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = await openDb();
  try {
    const promocoes = await db.all(
      "SELECT id_promocao, tipo, titulo, descricao, id_item_principal, id_item_brinde, desconto FROM promocoes"
    );
    return NextResponse.json(promocoes);
  } catch (error) {
    if (error instanceof Error && error.message.includes("no such table")) {
      await db.exec(`
        CREATE TABLE promocoes (
          id_promocao INTEGER PRIMARY KEY AUTOINCREMENT,
          tipo INTEGER,
          titulo TEXT,
          descricao TEXT,
          id_item_principal INTEGER,
          id_item_brinde INTEGER,
          desconto NUMERIC
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
    tipo,
    titulo,
    descricao,
    id_item_principal,
    id_item_brinde,
    desconto,
  } = await req.json();

  try {
    await db.run(
      "INSERT INTO promocoes (tipo, titulo, descricao, id_item_principal, id_item_brinde, desconto) VALUES (?, ?, ?, ?, ?, ?)",
      [tipo, titulo, descricao, id_item_principal, id_item_brinde, desconto]
    );
    return NextResponse.json(
      { message: "Promoção criada com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao criar promoção" },
      { status: 409 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const db = await openDb();
  const dados = await req.json();
  const { id_promocao, ...campos } = dados;

  if (!id_promocao) {
    return NextResponse.json(
      { error: "ID da promoção é obrigatório" },
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
  values.push(id_promocao);

  try {
    await db.run(
      `UPDATE promocoes SET ${setClause} WHERE id_promocao = ?`,
      values
    );
    return NextResponse.json(
      { message: "Promoção atualizada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao atualizar promoção" },
      { status: 409 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const db = await openDb();
  const { id_promocao } = await req.json();
  try {
    await db.run("DELETE FROM promocoes WHERE id_promocao = ?", [id_promocao]);
    return NextResponse.json(
      { message: "Promoção excluída com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "erro ao excluir promoção" },
      { status: 409 }
    );
  }
}