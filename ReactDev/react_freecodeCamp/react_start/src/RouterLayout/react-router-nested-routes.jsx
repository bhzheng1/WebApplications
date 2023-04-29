import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Layout
const Layout = () => (
    <div>
        <header>My header</header>
        <Outlet />
        <header>My footer</header>
    </div>
);

// Pages
const PageA = () => <p>This is Page A</p>;
const PageB = () => <p>This is Page B</p>;

// Routes
// not possible to have multiple types of layouts
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/backend' element={<Layout />}>
                    <Route path="pageA" element={<PageA />} />
                    <Route path="pageB" element={<PageB />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}