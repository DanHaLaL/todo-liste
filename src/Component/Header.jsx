const Header = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo ou Nom du Projet */}
        <a href="#" className="block item-center">
          <img src="public\logo-todo.png" alt="Mon-logo" className="h-10 w-10 rounded-full objet-cover mr-3"/>
          <span className="text-white text-3xl font-bold">Todo</span>
        </a>
        {/* Liens de Navigation */}
        <div className="space-x-8"> {/* Ajout d'espace entre les liens */}
          <a
            href="/"
            className="text-white text-lg hover:text-blue-200 transition duration-300 ease-in-out"
          >
            Home
          </a>
          <a
            href="/Page2"
            className="text-white text-lg hover:text-blue-200 transition duration-300 ease-in-out"
          >
            Service
          </a>
          <a
            href="#"
            className="text-white text-lg hover:text-blue-200 transition duration-300 ease-in-out"
          >
            Contacts
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header