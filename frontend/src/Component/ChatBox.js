import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useGetConversation from "../Hook/useGetConversation"

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const {topic} = useParams();
    const getConversation = useGetConversation();

    /* ----------------------  A TEST ---------------------- */

    const handleMessage = (e) => {
        console.log(JSON.parse(e.data));
    }

    useEffect(() => {
        getConversation(topic).then(data => setMessages(data.chat.messages));

        const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', 'https://example.com/my-private-topic');

        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close()
        }
    }, [])

    /* ----------------------  FIN TEST ---------------------- */

    return (
        <div className="w-100">
            <h1 className='m-5 text-center'>Chatbox</h1>
            <div className="d-flex flex-wrap justify-content-center">
                    TEST
            </div>
        </div>
    )
}