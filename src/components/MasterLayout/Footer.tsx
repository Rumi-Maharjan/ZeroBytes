"use client";

import React from "react";
import { FaXTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";

const Footer: React.FC = () => {

    const footerLinks = [
        { label: "Explore", href: "/" },
        { label: "Latest", href: "/latest" },
        { label: "Hardware", href: "/hardware" },
        { label: "Software", href: "/software" },
        { label: "Life Hacks", href: "/life-hacks" },
        { label: "Tech News", href: "/tech-news" },
        { label: "Privacy Policy", href: "/" },
        { label: "Terms & Conditions", href: "/" }
    ];

    return (
        <div className="py-8 w-full bg-footer side">
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex items-center flex-col text-white gap-9">
                    <p className="orbitron font-semibold text-2xl text-green-400">ZeroBytes</p>
                    <div className="flex items-center md:gap-x-14 text-sm lato-semibold flex-wrap gap-x-6 justify-center gap-y-4 md:gap-y-5">
                        {footerLinks.map((link, index) => (
                            <Link key={index} href={link.href}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-8 text-xl">
                        <FaXTwitter />
                        <FaInstagram />
                        <FaFacebook />
                        <FaLinkedin />
                    </div>
                    <p className="lato-regular text-xs">&copy; 2025 ZeroBytes NP. All Rights Reserved</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;