import { openDb } from "@/db/confgDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const db = await openDb();

    try{
        const form = await req.formData();
        const file = form.get("file") as File | null;
        const name = (form.get("name") as string | null) ?? undefined
        const produtoId = form.get("produto_id") as string | null;

        if (!file){
            return NextResponse.json({ message: "Imagem necessaria" }, { status: 400 });
        }
        // Converte o arquivo em ArrayBuffer para depois virar Buffer do Node
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // Tipo MIME da imagem (ex: image/jpeg). Se não houver, usa tipo genérico
        const tipo = file.type || "application/octet-stream";
        const originalName = name ?? file.name ?? "sem nome";

        await db.run("INSERT INTO Imagens (produto_id, name, tipo, imagem) VALUES (?, ?, ?, ?)",
             [produtoId ? parseInt(produtoId) : null, originalName, tipo, buffer]
        );

        return Response.json({ message: "Imagem salva", name: originalName });
    } catch (err){
        console.log("Falha ao salvar imagem: ", err)
        return Response.json({ error: "Falha no upload." }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
  const db = await openDb();

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const name = url.searchParams.get("name");

    if (!id && !name) {
      return NextResponse.json({ error: "É necessário fornecer id ou name" }, { status: 400 });
    }

    let imagem;

    if (id) {
      imagem = await db.get(
        "SELECT id, produto_id, name, tipo, imagem FROM Imagens WHERE id = ?",
        [parseInt(id)]
      );
    } else if (name) {
      imagem = await db.get(
        "SELECT id, produto_id, name, tipo, imagem FROM Imagens WHERE name = ?",
        [name]
      );
    }

    if (!imagem) {
      return NextResponse.json({ error: "Imagem não encontrada" }, { status: 404 });
    }

    return new Response(imagem.imagem, {
      status: 200,
      headers: {
        "Content-Type": imagem.tipo,
        "Content-Disposition": `inline; filename="${imagem.name}"`,
      },
    });
  } catch (err) {
    console.log("Erro ao buscar imagem: ", err);
    return NextResponse.json({ error: "Falha ao buscar imagem" }, { status: 500 });
  }
}
