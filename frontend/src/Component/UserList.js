import {useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import useBackendPing from "../Hook/useBackendPing";
import {NavLink} from "react-router-dom";

export default function UserList() {
    const [userList, setUserList] = useState([]);

    const getUserList = useGetUserList();
    const backendPing = useBackendPing();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = e.target[0].value;
        backendPing(userId).then(data => console.log(data))
    }

    const handleMessage = (e) => {
        document.querySelector('h1').insertAdjacentHTML('afterend', '<div class="alert alert-success w-75 mx-auto">Ping !</div>');
        window.setTimeout(() => {
            const $alert = document.querySelector('.alert');
            $alert.parentNode.removeChild($alert);
        }, 2000);
        console.log(JSON.parse(e.data));
    }

    useEffect(() => {
        getUserList().then(data => setUserList(data.users));

        const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', 'https://example.com/my-private-topic');

        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close()
        }

    }, [])

    return (
        <div className="w-100">
            <h1 className='m-5 text-center'>Utilisateurs</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {userList.map((user) => (
                    <NavLink to={`/chat/1`} className='w-25 text-white text-decoration-none d-block text-center'>
                        <form className='mx-3 mb-3' onSubmit={handleSubmit}>
                            <button className='btn btn-dark w-100' type='submit' value={user.id}>{user.username}</button>
                        </form>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}