"use client";

import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Suspense } from "react";

interface Props {
    children: ReactNode;
}

const MasterLayout: React.FC<Props> = ({ children }) => {
    return (
        <Suspense>
            <div className="min-h-screen flex justify-between flex-col">
                <div>
                    <Navbar />
                    <main className="lato-regular text-black mt-[5rem] py-8">{children}</main>
                </div>
                <Footer />
            </div>
        </Suspense>
    );
};

export default MasterLayout;