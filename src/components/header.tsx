export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-3 sm:p-4 flex items-center justify-between">
      <div className="bg-black p-3 sm:p-4 md:p-5 rounded-full inline-block flex-shrink-0"></div>
      
      <form action="" className="flex-1 px-2 sm:px-4 max-w-md mx-2">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-700 p-2 w-full rounded-full placeholder:text-center text-sm sm:text-base"
        />
      </form>
      
      <div className="bg-white p-3 sm:p-4 md:p-5 rounded-full inline-block flex-shrink-0"></div>
    </header>
  );
}
