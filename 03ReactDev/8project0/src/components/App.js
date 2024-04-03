import { useState } from "react";
import Banner from "./Banner";
import logo from "../assets/logo.png";
import Cart from "./Cart";
import Footer from "./Footer";
import ShoppingList from "./ShoppingList";
import "../styles/Layout.css";

function App() {
    const [cart, setCart] = useState([]);
    return (
        <div>
            <Banner>
                <img src={logo} alt="Jungle House" className="jh-logo" />
                <h1 className="jh-title">Jungle House</h1>
            </Banner>
            <div className="jh-layout-inner">
                <Cart cart={cart} updateCart={setCart} />
                <ShoppingList cart={cart} updateCart={setCart} />
            </div>
            <Footer />
        </div>
    );
}

export default App;
