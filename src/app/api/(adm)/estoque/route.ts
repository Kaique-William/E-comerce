import { openDb } from "../../../../db/confgDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = await openDb();
  try {
    const estoque = await db.all(
      `SELECT id_produto, nome, valor, quantidade, quantidade_minima,
              data_ultima_remeca, quantidade_ultima_remeca, categoria, tipo,
              color, marca, tamanho, descricao
       FROM Estoque`
    );
    return NextResponse.json(estoque);
  } catch (error) {
    if (error instanceof Error && error.message.includes("no such table")) {
      await db.exec(`
        CREATE TABLE Produtos (
          id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          valor REAL NOT NULL,
          quantidade INTEGER NOT NULL,
          quantidade_minima INTEGER NOT NULL,
          data_ultima_remeca DATE,
          quantidade_ultima_remeca INTEGER NOT NULL,
          categoria TEXT,
          tipo TEXT,
          color TEXT,
          marca TEXT,
          tamanho TEXT,
          descricao TEXT
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
    categoria,
    tipo,
    color,
    marca,
    tamanho,
    descricao,
  } = await req.json();

  const valorConvertido =
    typeof valor === "string" ? parseFloat(valor.replace(",", ".")) : valor;

  try {
    const result = await db.run(
      `INSERT INTO Estoque (nome, valor, quantidade, quantidade_minima,
        data_ultima_remeca, quantidade_ultima_remeca, categoria, tipo, color,
        marca, tamanho, descricao)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        valorConvertido,
        quantidade,
        quantidade_minima,
        data_ultima_remeca,
        quantidade_ultima_remeca,
        categoria,
        tipo,
        color,
        marca,
        tamanho,
        descricao,
      ]
    );
    return NextResponse.json({
      message: "Produto adicionado com sucesso",
      id: result.lastID,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
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
  const values = keys.map((key) => {
    if (key === "valor" && typeof campos[key] === "string") {
      return parseFloat(campos[key].replace(",", "."));
    }
    return campos[key];
  });
  values.push(id_produto);

  try {
    await db.run(
      `UPDATE Estoque SET ${setClause} WHERE id_produto = ?`,
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
    await db.run("DELETE FROM Estoque WHERE id_produto = ?", [id_produto]);
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
