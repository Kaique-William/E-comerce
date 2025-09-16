import { openDb } from "@/db/confgDB.js";
import Promocoes from "@/components/home/promocoes";
import ListaProdutos from "@/components/home/listaProdutos";
import Link from "next/link";

openDb();

export default async function Home() {
  return (
    <main className="min-h-screen">
      {/* Container responsivo com padding ajustável */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seção de Promoções com responsividade */}
        <section className="mb-8 lg:mb-12">
          <div className="max-w-7xl mx-auto">
            <Promocoes />
          </div>
        </section>

        {/* Seção de Produtos com grid responsivo */}
        <section className="mb-8 lg:mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 ">
                Novos Produtos
              </h1>

              <Link
                href="/itens"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Ver todos os itens
              </Link>
            </div>
            <ListaProdutos />
          </div>
        </section>
      </div>
    </main>
  );
}
