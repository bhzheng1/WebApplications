import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/stream");

    eventSource.addEventListener("new_message", (event) => {
      setEvents([...events, event.data]);
    });

    eventSource.onerror = () => {
      console.error("An error occurred while receiving events");
    };

    return () => {
      eventSource.close();
    };
  }, [events]);

  return (
    <div className="App">
      <ul>
        {events.map((event) => (
          <li key={event}>{event}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
