import { openDb } from "../../../../../db/confgDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  const db = await openDb();

  // Tenta buscar dados da tabela 'usuarios'
  try {
    const usuarios = await db.all(
      "SELECT id_usuario, nome, email, senha, telefone, endereco, cargo FROM usuarios"
    );
    return NextResponse.json(usuarios);
  } catch (error) {
    // Se a tabela não existir, cria e retorna vazia
    if (error instanceof Error && error.message.includes("no such table")) {
      await db.exec(`
      CREATE TABLE Usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        telefone TEXT NOT NULL UNIQUE,
        endereco TEXT,
        cargo TEXT enum["ADM", "Cliente"] DEFAULT "Cliente")
      `);
      return NextResponse.json([]);
    }
    // Outro erro
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
    email,
    senha,
    telefone,
    endereco,
  } = await req.json();

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    await db.run(
      "INSERT INTO usuarios (nome, email, senha, telefone, endereco) VALUES (?, ?, ?, ?, ?)",
      [nome, email, hashedPassword, telefone, endereco]
    );

    return NextResponse.json(
      { message: "Usuário criado com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "erro ao criar usuário" },
      { status: 409 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const db = await openDb();
  const dados = await req.json();
  const { id, ...campos } = dados;

  if (!id) {
    return NextResponse.json(
      { error: "ID do usuário é obrigatório" },
      { status: 400 }
    );
  }

  // Monta dinamicamente os campos a serem atualizados
  const keys = Object.keys(campos);
  if (keys.length === 0) {
    return NextResponse.json(
      { error: "Nenhum campo para atualizar" },
      { status: 400 }
    );
  }

  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const values = keys.map((key) => campos[key]);
  values.push(id);

  try {
    await db.run(`UPDATE usuarios SET ${setClause} WHERE id = ?`, values);

    return NextResponse.json(
      { message: "Usuário atualizado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "erro ao atualizar usuário" },
      { status: 409 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const db = await openDb();
  const { id } = await req.json();
  try {
    await db.run("DELETE FROM usuarios WHERE id = ?", [id]);
    return NextResponse.json(
      { message: "Usuário excluido com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return NextResponse.json(
      { error: "erro ao excluir usuário" },
      { status: 409 }
    );
  }
}
