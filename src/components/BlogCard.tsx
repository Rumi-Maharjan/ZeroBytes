"use client";

import React from "react";
import Image from "next/image";

interface BlogCardProps {
    image: string;
    category: string;
    title: string;
    date: string;
    variant?: "wide" | "";
}

const BlogCard: React.FC<BlogCardProps> = ({ image, category, title, date, variant= "wide" }) => {
    return (
        <div className="w-full relative z-0">
            <Image src={image} alt="image" height={10000} width={10000} className={`object-cover rounded-lg relative aspect-[3/2.5] ${variant === "wide" ? "lg:aspect-[3/1.3]" : "lg:aspect-[3/1.8]"}`} />
            <div className="absolute lg:bottom-8 lg:left-8 text-white lg:w-[60%] flex flex-col gap-1 bottom-5 left-5 pr-6">
                <p className="lg:text-sm guardian-medium flex items-center gap-2 text-white text-xs uppercase"><span>|</span>{category}</p>
                <p className="guardian-semibold lg:text-[40px] line-clamp-2 leading-tight text-2xl lg:line-clamp-3">{title}</p>
                <p className="lato-regular lg:text-opacity-80 lg:text-[13px] text-white mt-2 text-xs">{date}</p>
            </div>
        </div>
    );
};

export default BlogCard;