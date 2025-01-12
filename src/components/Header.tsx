"use client";
import React from "react";
import Link from "next/link";

interface HeaderProps {
    title: string;
    titleClassName: string;
    linkHref: string;
}

const Header: React.FC<HeaderProps> = ({ title, titleClassName, linkHref }) => {
    return (
        <div className="w-full flex items-center lg:gap-6 justify-between gap-3">
            <p className={`guardian-semibold -mt-1 text-logo ${titleClassName}`}>{title}</p>
            <div className="border-b flex-1 border-lightGreen"></div>
            <Link href={linkHref}><p className="guardian-medium lg:text-sm text-lightGreen text-xs">SEE MORE</p></Link>
        </div>
    );
};

export default Header;