import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Message from "./Message";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/message" element={<Message />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
