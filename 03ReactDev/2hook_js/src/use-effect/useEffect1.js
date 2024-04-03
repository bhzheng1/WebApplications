import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

const ChatAPI = {
    handle: null,
    isOnline: false,

    login: function () {
        this.isOnline = true;
        if (this.handle) this.handle({ isOnline: true });
    },

    logout: function () {
        this.isOnline = false;
        if (this.handle) this.handle({ isOnline: false });
    },

    subscribeToFriendStatus: function (id, handle) {
        console.log(`subscribed userId: ${id}`);
        this.handle = handle;
    },
    unsubscribeFromFriendStatus: function (id, handle) {
        console.log(`unsubscribed userId: ${id}`);
        this.handle = null;
    },
};

function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);
    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }

    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        setIsOnline(null);
        // 注意返回的函数 也被 React 自身获得，并且在组件卸载的时候执行这个函数。
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(
                props.friend.id,
                handleStatusChange
            );
        };
    }, [props.friend.id]); // 仅当 id 改变时，才会重新订阅。

    if (isOnline === null) {
        return "Loading....";
    }
    return (
        <div>
            {console.log("FriendStatus refresh")}
            {isOnline ? "Online" : "Offline"}
        </div>
    );
}

function App() {
    const [show, setShow] = useState(true);
    const [count, setCount] = useState(0);
    const [userId, setUserId] = useState(1);
    return (
        <div>
            userId: {userId} <br />
            count: {count}{" "}
            <button onClick={() => setCount(count + 1)}>add count</button>{" "}
            <br />
            {show ? (
                <FriendStatus friend={{ id: userId, name: "user name" }} />
            ) : null}
            <button onClick={() => setShow(!show)}>show/close</button>
            <button onClick={() => setUserId(userId + 1)}>userId + 1</button>
            <button onClick={() => ChatAPI.login()}>login</button>
            <button onClick={() => ChatAPI.logout()}>logout</button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
