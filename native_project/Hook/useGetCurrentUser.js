import {useContext} from "react";
import {userContext} from "../Context/UserContext";

export default function useGetCurrentUser() {
    const storedUser = useContext(userContext);
    console.log(storedUser);

    return JSON.parse(atob(storedUser[0].split('.')[1])).mercure.payload;
}
