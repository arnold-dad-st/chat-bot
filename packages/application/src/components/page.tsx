import React, { useEffect } from 'react';
import { Widget, addResponseMessage, renderCustomComponent } from 'react-chat-widget';

export const Chat = () => {
    useEffect(() => {
        addResponseMessage('Welcome to this awesome chat!');
    }, []);

    const handleNewUserMessage = (newMessage: string) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        addResponseMessage('New message incoming');
    };

    return (
        <div className="App">
            Chat
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                renderCustomComponent={(args: any) => {
                    console.log('args: ',args);
                    return (
                        <div>Hi</div>
                    )
                }}
            />
        </div>
    );
};