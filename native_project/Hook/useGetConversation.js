/*
import {useContext} from "react";
import {userContext} from "../Context/UserContext";
import useGetCurrentUser from "./useGetCurrentUser";

export default function useGetConversation() {
    const storedUser = useContext(userContext);
    const currentUser = useGetCurrentUser();

    return function (topic) {
        return fetch(`http://localhost:8245/chat/${topic}/${currentUser.userid}`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${storedUser}`
            }
        })
            .then(res => res.json())
    }
}*/
