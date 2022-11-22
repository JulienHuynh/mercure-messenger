import {useState, createContext} from "react";

export const userContext = createContext('');

export default function UserProvider(props) {
    const [user, setUser] = useState('');

    return (
        <userContext.Provider value={[user, setUser]}>
            {props.children}
        </userContext.Provider>
    )
}