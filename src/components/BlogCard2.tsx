"use client";

import React from "react";
import Image from "next/image";

interface BlogCard2Props {
    image: string;
    category: string;
    title: string;
    date: string;
}

const BlogCard2: React.FC<BlogCard2Props> = ({ image, category, title, date }) => {
    return (
        <div className="w-full flex lg:flex-col lg:gap-2 flex-row gap-4 items-center lg:items-start">
            <Image src={image} alt="image" width={10000} height={10000} className="object-cover rounded-lg lg:aspect-[3/1.5] lg:w-full w-32 aspect-[3/2.5]" />
            <div className="flex flex-col gap-2">
                <p className="flex items-center gap-2 guardian-medium lg:text-sm text-lightGreen text-xs"><span>|</span>{category}</p>
                <p className="line-clamp-2 guardian-semibold lg:text-lg text-logo">{title}</p>
                <p className="text-logo text-opacity-80 text-[13px] mt-1 text-xs">{date}</p>
            </div>
        </div>
    );
};

export default BlogCard2;