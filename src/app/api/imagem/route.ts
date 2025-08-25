import { openDb } from "@/db/confgDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const db = await openDb();

    try{
        const form = await req.formData();
        const files = form.getAll("file") as File[];
        const name = (form.get("name") as string | null) ?? undefined
        const produtoId = form.get("produto_id") as string | null;
        const perfil_id = form.get("perfil_id") as string | null;

        if (files.length === 0) {
            return NextResponse.json({ message: "Nenhuma imagem enviada, apenas dados do produto" });
        }

        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const tipo = file.type || "application/octet-stream";
            const originalName = name ?? file.name ?? "sem nome";

            await db.run(
                "INSERT INTO Imagens (produto_id, perfil_id, name, tipo, imagem) VALUES (?, ?, ?, ?, ?)",
                [produtoId ? parseInt(produtoId) : null, perfil_id ? parseInt(perfil_id) : null, originalName, tipo, buffer]
            );
        }
        
        return NextResponse.json({ message: "Imagens salvas com sucesso" });
    } catch (err){
        console.log("Falha ao salvar imagem: ", err)
        return Response.json({ error: "Falha no upload." }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
  const db = await openDb();

  try {
    const url = new URL(req.url);
    const idImagem = url.searchParams.get("id");
    const name = url.searchParams.get("name");
    const idProduto = url.searchParams.get("idP");
    const idPerfil = url.searchParams.get("idU");

    if (!idImagem && !name && !idProduto && !idPerfil) {
      return NextResponse.json(
        { error: "É necessário fornecer um parâmetro de busca!" },
        { status: 400 }
      );
    }

    // Caso seja para pegar várias imagens de um produto
    if (idProduto) {
      const imagens = await db.all(
        "SELECT id, produto_id, name, tipo, imagem FROM Imagens WHERE produto_id = ?",
        [parseInt(idProduto)]
      );

      if (!imagens || imagens.length === 0) {
        return NextResponse.json(
          { error: "Nenhuma imagem encontrada para esse produto" },
          { status: 404 }
        );
      }

      // Retornar como JSON com base64 ou array de URLs
      const imagensFormatadas = imagens.map(img => ({
        id: img.id,
        produto_id: img.produto_id,
        name: img.name,
        tipo: img.tipo,
        base64: Buffer.from(img.imagem).toString("base64"),
      }));

      return NextResponse.json(imagensFormatadas);
    }

    // Single image: busca por id, name ou perfil_id
    const colunaValor: [string, any] | null = idImagem
      ? ["id", parseInt(idImagem)]
      : name
      ? ["name", name]
      : idPerfil
      ? ["perfil_id", parseInt(idPerfil)]
      : null;

    if (!colunaValor) {
      return NextResponse.json(
        { error: "Parâmetro inválido" },
        { status: 400 }
      );
    }

    const [coluna, valor] = colunaValor;
    const imagem = await db.get(
      `SELECT id, produto_id, name, tipo, imagem FROM Imagens WHERE ${coluna} = ?`,
      [valor]
    );

    if (!imagem) {
      return NextResponse.json({ error: "Imagem não encontrada" }, { status: 404 });
    }

    // Retorna a imagem como binário direto
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
