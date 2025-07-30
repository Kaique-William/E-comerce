export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="bg-black p-5 rounded-full inline-block"></div>
      <form action="">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-700 p-2 w-100 rounded-full placeholder:text-center"
        />
      </form>
      <div className="bg-white p-5  rounded-full inline-block"></div>
    </header>
  );
}
