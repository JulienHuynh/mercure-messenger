const Navbar = ({ children }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <a class="navbar-brand" href="/">
          Nom_utilisateur_connecté
        </a>
        <a class="navbar-brand d-flex justify-content-between" href="/login">
          Logout
        </a>
      </nav>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Navbar;
