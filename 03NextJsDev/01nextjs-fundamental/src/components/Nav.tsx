"use client";

import React from "react";
import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const Nav = () => {
    const segment = useSelectedLayoutSegment();
    return (
        <nav className="flex justify-between bg-nav p-4">
            <div className="flex items-center space-x-4">
                <Link href="/">
                    <FontAwesomeIcon icon={faHome} className="icon" />
                </Link>
                <Link href="/posts/new">
                    <FontAwesomeIcon icon={faTicket} className="icon" />
                </Link>
                <Link href="/standard-page">standard page</Link>
                {segment !== "login" ? <Link href="/login">Login</Link> : null}
            </div>
            <div>
                <p className="text-default-text">bzheng1@gmail.com</p>
            </div>
        </nav>
    );
};

export default Nav;
