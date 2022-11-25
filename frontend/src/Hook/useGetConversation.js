import {useContext} from "react";
import {userContext} from "../Context/UserContext";

export default function useGetConversation() {
    const storedUser = useContext(userContext);

    return function (topic) {
        return fetch(`http://localhost:8245/chat/${topic}`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${storedUser}`
            }
        })
            .then(res => res.json())
    }
}