import { useState } from 'react';
import { chatbot } from 'supersimpledev';
import "./ChatInput.css";


export function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState('');

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function sendMessage() {
        if (!inputText.trim()) return;

        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID(),
            },
        ];

        const response = chatbot.getResponse(inputText);

        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID(),
            },
        ]);

        setInputText('');
    }

    return (
        <div className="chat-input-container">
            <input
                type="text"
                placeholder="Send a message to Chatbot"
                size="30"
                onChange={saveInputText}
                value={inputText}
                className="chat-input"
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        sendMessage();
                    }
                }}
            />

            <button className="send-btn" onClick={sendMessage}>
                Send
            </button>
        </div>
    );
}