import robotImage from '../assets/robot.png';
import userImage from '../assets/user.png';
import './ChatMessage.css';

export function ChatMessage({ message, sender }) {
    return (
        <div
            className={
                sender === 'user'
                    ? 'chat-message-user'
                    : 'chat-message-robot'
            }
        >
            {sender === 'robot' && (
                <img
                    src={robotImage}
                    alt="Robot"
                    className="chat-message-icon"
                />
            )}

            <div className="chat-message-text">
                {message}
            </div>

            {sender === 'user' && (
                <img
                    src={userImage}
                    alt="User"
                    className="chat-message-icon"
                />
            )}
        </div>
    );
}