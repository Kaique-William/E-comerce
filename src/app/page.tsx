import { openDb } from "../db/confgDB.js";
import Promocoes from "@/components/home/promocoes";
import ListaProdutos from "@/components/home/listaProdutos";

openDb();
export default async function Home() {
  return (
    <main>
      <Promocoes />
      <div className="text-center p-4">
        <h1>produtos</h1>
        <ListaProdutos />
      </div>
    </main>
  );
}
