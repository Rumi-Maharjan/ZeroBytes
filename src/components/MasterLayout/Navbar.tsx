"use client";

import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineMenu } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { API_Get } from "@/service/apiService";
import { Category } from "@/service/data";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();
    const [category, setCategory] = useState<Category[]>([]);

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

    const handleMenuToggle = () => {
        setIsMenuOpen((prev) => !prev);
        setIsSearchOpen(false);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleSearchToggle = () => {
        setIsSearchOpen((prev) => !prev);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = () => {
        console.log("Search submitted:", searchQuery);
        closeSearch();
    };

    const navLinks = [
        { label: "Explore", href: "/" },
        { label: "Latest", href: "/latest" },
        // { label: "Hardware", href: "/hardware" },
        // { label: "Software", href: "/software" },
        // { label: "Life Hacks", href: "/life-hacks" },
        // { label: "Tech News", href: "/tech-news" },
    ];

    const createSlug = (title: string): string => {
        return `/${title.toLowerCase().replace(/\s+/g, "-")}`;
    };

    return (
        <div className="border-b border-lightGray py-6 fixed top-0 w-full bg-white z-10 side">
            <div className="max-w-screen-2xl mx-auto">
                <div className="text-logo flex items-center justify-between">
                    <div className="lg:hidden">
                        <div className="text-3xl cursor-pointer" onClick={handleMenuToggle}><HiOutlineMenu /></div>
                        <AnimatePresence>
                            {isMenuOpen && (
                                <>
                                    <motion.div
                                        className="fixed inset-0 bg-black bg-opacity-50 z-40 top-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={closeMenu}
                                    ></motion.div>
                                    <motion.div
                                        className="fixed top-0 left-0 h-full bg-white text-lightBlack flex flex-col items-start gap-5 z-50 shadow-lg w-72 p-6"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "0%" }}
                                        exit={{ x: "-100%" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex flex-col gap-8">
                                            <p className="orbitron font-semibold text-2xl">ZeroBytes</p>
                                            <div className="flex flex-col text-lg guardian-regular gap-6">
                                                {navLinks.map((link, index) => (
                                                    <Link key={index} href={link.href}>
                                                        <p className={`${pathname === link.href ? "text-lightGreen" : ""}`}>{link.label}</p>
                                                    </Link>
                                                ))}
                                                {category.map((link, index) => (
                                                    <Link key={index} href={createSlug(link.title)}>
                                                        <p className={`${pathname === createSlug(link.title) ? "text-lightGreen" : ""}`}>{link.title}</p>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                    <Link href="/"><p className="orbitron font-semibold text-2xl cursor-pointer">ZeroBytes</p></Link>
                    <div className="lg:flex items-center lato-semibold hidden menu-gap">
                        {navLinks.map((link, index) => (
                            <Link key={index} href={link.href}>
                                <p className={`${pathname === link.href ? "text-lightGreen" : ""}`}>{link.label}</p>
                            </Link>
                        ))}
                        {category.map((link, index) => (
                            <Link key={index} href={createSlug(link.title)}>
                                <p className={`${pathname === createSlug(link.title) ? "text-lightGreen" : ""}`}>{link.title}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="text-2xl cursor-pointer" onClick={handleSearchToggle}>{isSearchOpen ? <IoClose /> : <CiSearch />}</div>
                </div>

                <AnimatePresence>
                    {isSearchOpen && (
                        <div className="lg:block hidden">
                            <motion.div
                                className="fixed inset-0 bg-black bg-opacity-50 z-40 top-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={closeSearch}
                            ></motion.div>
                            <motion.div
                                className="fixed top-0 right-0 h-full bg-white text-lightBlack flex flex-col items-start gap-5 z-50 shadow-lg xl:w-[30rem] p-6 w-[25rem]"
                                initial={{ x: "100%" }}
                                animate={{ x: "0%" }}
                                exit={{ x: "100%" }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex flex-col gap-8 w-full">
                                    <div className="text-logo text-2xl cursor-pointer" onClick={closeSearch}><IoClose /></div>
                                    <div className="w-full relative">
                                        <input
                                            type="text"
                                            className="w-full border-b border-search outline-none py-3 relative"
                                            placeholder="Search blogs"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                        <button onClick={handleSearchSubmit} className="text-logo text-2xl absolute right-0 py-3 font-bold"><CiSearch /></button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isSearchOpen && (
                        <div className="lg:hidden">
                            <motion.div
                                className="fixed inset-0 bg-black bg-opacity-50 z-40 top-20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={closeSearch}
                            ></motion.div>
                            <motion.div
                                className="fixed top-20 text-lightBlack flex flex-col items-start gap-5 z-50 shadow-lg p-6 w-full h-fit left-0 bg-logo"
                                initial={{ y: "-100%" }}
                                animate={{ y: "0%" }}
                                exit={{ y: "-100%" }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="w-full relative">
                                    <input
                                        type="text"
                                        className="w-full outline-none p-3 relative rounded-md"
                                        placeholder="Search blogs"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <button onClick={handleSearchSubmit} className="text-logo text-2xl absolute right-0 p-3 font-bold"><CiSearch /></button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default Navbar;