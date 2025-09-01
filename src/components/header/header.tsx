import BotaoCategoria from "./botaoCategoria";
import BotaoPerfil from "./botaoPerfil";
import LinhaPesquisa from "./linhaPesquisa";

export default function Header() {
  


  return (
    <header className="bg-gray-800 text-white p-3 sm:p-4 flex items-center justify-between relative">
      <BotaoCategoria />

      <LinhaPesquisa />

      <BotaoPerfil />

    </header>
  );
}
