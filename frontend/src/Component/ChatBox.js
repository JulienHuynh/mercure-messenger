import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useGetConversation from "../Hook/useGetConversation"
import useGetCurrentUser from "../Hook/useGetCurrentUser";

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const {topic} = useParams();
    const getConversation = useGetConversation();
    const currentUser = useGetCurrentUser();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleMessage = (e) => {
        const chatData  = JSON.parse(e.data);
        console.log(chatData);
        let newMessages = [];
        Object.values(chatData).forEach(x => newMessages.push(x));
        setMessages(newMessages[0]);
    }

    useEffect(() => {
        getConversation(topic);

        const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', `https://example.com/chat/{topic}`);

        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close()
        }
    }, [])

    return (
        <div className="w-100">
            <h1 className='m-5 text-center'>Chatbox</h1>
            <div>
                {messages.map((message) => (
                    (message.id !== currentUser.userid) ?
                        <div className="w-100 d-flex justify-content-start">
                            <div className="bg-light text-black m-3 p-3 rounded w-75">
                                <div className="d-flex justify-content-between">
                                    <div className="fw-bold">{message.username}</div>
                                    <div>{message.date.date}</div>
                                </div>
                                <div>{message.content}</div>
                            </div>
                        </div>
                    :
                        <div className="w-100 d-flex justify-content-end">
                            <div className="bg-primary text-white m-3 p-3 rounded w-75">
                                <div className="d-flex justify-content-between">
                                    <div className="fw-bold">{message.username}</div>
                                    <div>{message.date.date}</div>
                                </div>
                                <div>{message.content}</div>
                            </div>
                        </div>
                ))}
            </div>
            <div className="position-fixed w-75 bottom-0 m-4">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="message" className="form-label">Envoyer un message</label>
                    <div className="d-flex">
                        <input type="textarea" id="message" className="form-control" placeholder="Écrire un nouveau message..."/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    <input type="hidden" id="userId" value={currentUser.userid}/>
                </form>
            </div>
        </div>
    )
}