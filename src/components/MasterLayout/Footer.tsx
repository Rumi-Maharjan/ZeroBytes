"use client";

import React, { useState, useEffect } from "react";
import { FaXTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";
import { API_Get } from "@/service/apiService";
import { Category } from "@/service/data";

const Footer: React.FC = () => {
    const [category, setCategory] = useState<Category[]>([]);

    const footerLinks = [
        { label: "Explore", href: "/" },
        { label: "Latest", href: "/latest" },
        // { label: "Hardware", href: "/hardware" },
        // { label: "Software", href: "/software" },
        // { label: "Life Hacks", href: "/life-hacks" },
        // { label: "Tech News", href: "/tech-news" },
        // { label: "Privacy Policy", href: "/" },
        // { label: "Terms & Conditions", href: "/" }
    ];

    const fetchCateogry = async () => {
        try {
            const data:any = await API_Get("categories");
            console.log("Catgory: ", data.docs);
            setCategory(data.docs);
        } catch (error) {
            console.log("Error fetching categories: ", error);
        }
    };

    useEffect(() => {
        fetchCateogry();
    }, []);

    const createSlug = (title: string): string => {
        return `/${title.toLowerCase().replace(/\s+/g, "-")}`;
    };

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
                        {category.map((link, index) => (
                            <Link key={index} href={createSlug(link.title)}>
                                <p>{link.title}</p>
                            </Link>
                        ))}
                        <Link href="/">
                            Privacy Policy
                        </Link>
                        <Link href="/">
                            Terms & Conditions
                        </Link>
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