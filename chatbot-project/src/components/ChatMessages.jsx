import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage.jsx';
import './ChatMessages.css';


function ChatMessages({ chatMessages }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const containerElm = containerRef.current;

        if (containerElm) {
            containerElm.scrollTop = containerElm.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div
            className="chat-messages-container"
            ref={containerRef}
        >
            {chatMessages.map((chatMessage) => (
                <ChatMessage
                    key={chatMessage.id}
                    message={chatMessage.message}
                    sender={chatMessage.sender}
                />
            ))}
        </div>
    );
}

export default ChatMessages;