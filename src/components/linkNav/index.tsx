import React from "react";
import Link from 'next/link';

export interface LinkIterface {
    url: string;
    label: string;
}

export default function LinkNav ( props : LinkIterface ) {
    return (
        <li>
            <Link href={props.url}>
                {props.label}
            </Link>
        </li>
    )
}