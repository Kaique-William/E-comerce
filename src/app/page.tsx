import Promocoes from "@/components/promocoes";
import { openDb } from "../db/confgDB.js";

openDb();
export default async function Home() {
  return (
    <main>
      <Promocoes />
      <div className="text-center p-4">
        <h1>produtos</h1>
        <div className="flex justify-between">
          <div className="w-40 h-40 bg-amber-200"></div>
          <div className="w-40 h-40 bg-amber-200"></div>
          <div className="w-40 h-40 bg-amber-200"></div>
          <div className="w-40 h-40 bg-amber-200"></div>
          <div className="w-40 h-40 bg-amber-200"></div>
          <div className="w-40 h-40 bg-amber-200"></div>
        </div>
      </div>
    </main>
  );
}
