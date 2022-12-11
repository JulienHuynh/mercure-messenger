import {useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import {NavLink} from "react-router-dom";
import useBuildTopicId from "../Hook/useBuildTopicId";

export default function UserList() {
    const [userList, setUserList] = useState([]);
    const getUserList = useGetUserList();
    const buildTopicId = useBuildTopicId();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = e.target[0].value;
    }

    useEffect(() => {
        getUserList().then(data => setUserList(data.users));
    }, [])

    return (
        <div className="w-100">
            <h1 className='m-5 text-center'>Utilisateurs</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {userList.map((user) => (
                    <NavLink key={user.id} to={`/chat/${buildTopicId(user.id)}`} className='w-25 text-white text-decoration-none d-block text-center'>
                        <form className='mx-3 mb-3' onSubmit={handleSubmit}>
                            <button className='btn btn-dark w-100' type='submit' value={user.id}>{user.username}</button>
                        </form>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}