import { Outlet } from "react-router";
import React from "react";
import Header from "./Header";
const Layout = () => {
  return (
    <>
    <Header></Header>
    <main className="App">
      <Outlet />
    </main>
    </>
  );
};
export default Layout