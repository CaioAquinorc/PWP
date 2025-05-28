import React from 'react';
import "./navBar.css"
import LinkNav, { LinkIterface } from '../linkNav';

export default function NavBar() {

    const links: LinkIterface[] = [
        {
            url: "/", label: "Home"
        },
        {
            url: "/loginPage", label: "Login"
        },
        {
            url: "/redPasswordPage", label: "RePage"
        },
        {
            url: "/changePasswordPage", label: "ChangePage"
        }
    ]
    return (
        <header>
            <ul className="navBar">
                {links.map((link)=> (
                    <LinkNav
                        url={link.url}
                        label={link.label}
                    />
                ))}
            </ul>
        </header>
    )
}