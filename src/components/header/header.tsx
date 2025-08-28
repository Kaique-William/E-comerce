import BotaoCategoria from "./botaoCategoria";
import BotaoPerfil from "./botaoPerfil";

export default function Header() {
  


  return (
    <header className="bg-gray-800 text-white p-3 sm:p-4 flex items-center justify-between relative">
      <BotaoCategoria />

      {/* Search */}
      <form action="" className="flex-1 px-2 sm:px-4 max-w-md mx-2">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-700 p-2 w-full rounded-full placeholder:text-center text-sm sm:text-base"
        />
      </form>

      <BotaoPerfil />

    </header>
  );
}
