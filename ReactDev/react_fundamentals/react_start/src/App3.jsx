import React from "react"
import Form from "./components/Form"
import Login from "./components/Login"
export default function App() {
    const [messages, setMessages] = React.useState(["a", "b"])
    return (
        <div>
            {messages.length ===0?
            <h1>You are all caught up!</h1>
            :<h1>You have {messages.length} unread {messages.length>1?" messages":" message"}!</h1>}
        <Form />
        <Login />
        </div>
    )
}