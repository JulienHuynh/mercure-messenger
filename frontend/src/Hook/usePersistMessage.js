import {useContext} from "react";
import {userContext} from "../Context/UserContext";

export default function usePersistMessage() {
    const storedUser = useContext(userContext);

    return function (topic, content, userId) {
        return fetch(`http://localhost:8245/chat/persist-message`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${storedUser}`
            },
            body: new URLSearchParams({
                userId: userId,
                topic: topic,
                content: content
            })
        })
            .then(res => res.json())
    }
}