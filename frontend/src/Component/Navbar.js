import useGetCurrentUser from "../Hook/useGetCurrentUser";

const Navbar = ({ children }) => {
    const currentUser = useGetCurrentUser();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between ">
        <a className="navbar-brand" href="/">
            {currentUser.username}
        </a>
        <a className="navbar-brand " href="/login">
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
