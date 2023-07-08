function Header({ showForm }) {
  return (
    <header className="bg-gray-100 border-b border-gray-300 p-4">
      <div className="flex flex-1 items-center">
        <a href="#">
          <span className="sr-only">Workflow</span>
          <img
            className="h-8 w-auto sm:h-10"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt=""
            loading="lazy"
          />
        </a>
        <h1 className="text-2xl font-bold text-gray-900 ml-2">Chat App</h1>
        <span className="text-sm text-gray-500 ml-2">v1.0</span>
      </div>

      <div className="flex flex-1 justify-end items-center">
        <span
          className="px-2 py-1 rounded-full text-sm font-bold  bg-gray-300 text-gray-100 mr-2"
          style={{
            backgroundColor: showForm ? "#f56565" : "#48bb78",
          }}
        >
          {showForm ? "Not Connected" : "Connected"}
        </span>
      </div>
    </header>
  );
}

export default Header;
