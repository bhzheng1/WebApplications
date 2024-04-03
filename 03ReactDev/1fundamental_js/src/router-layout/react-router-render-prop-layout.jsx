import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
// Render Props
const Layout = ({ children }) => (
  <div>
    <header>My header</header>
    {children}
    <header>My footer</header>
  </div>
);

// Pages
// the layout is nested in the page component: Page -> Layout -> Render prop content
const PageA = () => <Layout>This is Page A</Layout>;
const PageB = () => <Layout>This is Page B</Layout>;

// Routes
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pageA" element={<PageA></PageA>} />
        <Route path="/pageB" element={<PageB></PageB>} />
      </Routes>
    </BrowserRouter>
  );
}