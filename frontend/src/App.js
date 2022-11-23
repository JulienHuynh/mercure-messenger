import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NeedAuth from "./Auth/NeedAuth";
import UserList from "./Component/UserList";
import Navbar from "./Component/Navbar";
import Sidebar from "./Component/Sidebar";
import ChatBox from "./Component/ChatBox";
import Login from "./Auth/Login";
import UserProvider from "./Context/UserContext";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Navbar>
                <div className="d-flex">
                    <Sidebar/>
                    <div className="col">
                        <Routes>
                            <Route path='/' element={
                                <NeedAuth>
                                    <UserList/>
                                </NeedAuth>
                            }/>
                            <Route path='/chat/:topic' element={
                                <NeedAuth>
                                    <ChatBox/>
                                </NeedAuth>
                            }/>
                            <Route path='/login' element={<Login/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
