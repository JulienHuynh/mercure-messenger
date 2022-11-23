import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NeedAuth from "./Auth/NeedAuth";
import UserList from "./Component/UserList";
import Navbar from "./Component/Navbar";
import Sidebar from "./Component/Sidebar";
import Login from "./Auth/Login";
import UserProvider from "./Context/UserContext";

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navbar>
                <NeedAuth>
                <div className="d-flex">
                                    <Sidebar/>
                                    <UserList/>
                                </div>
                </NeedAuth>
              </Navbar>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );

}

export default App;
