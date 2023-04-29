import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
// functions which return components 
// solves the problem of the Page component mounting before the Layout.
const Layout = ({ children }) => (
    <div>
      <header>My header</header>
      {children}
      <header>My footer</header>
    </div>
  );
  
  // HOC
  const withLayout = (Component) => (props) => (
    <Layout>
      {/* All props are passed through to the Component being wrapped */}
      <Component {...props} /> /
    </Layout>
  );
  
  // Pages
  // the Page is wrapped by the HOC: withPage() -> Layout -> Page
  const PageA = withLayout(() => <p>This is Page A</p>);
  const PageB = withLayout(() => <p>This is Page B</p>);
  
  // Routes
  export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/pageA" element={<PageA/>} />
          <Route path="/pageB" element={<PageB/>} />
        </Routes>
      </BrowserRouter>
    );
  }