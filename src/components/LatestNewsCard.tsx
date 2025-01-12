"use client";

import React from "react";
import Image from "next/image";

interface LatestNewsCardProps {
    category: string;
    title: string;
    date: string;
    image: string;
}

const LatestNewsCard: React.FC<LatestNewsCardProps> = ({ category, title, date, image }) => {
    return (
        <div className="w-full flex gap-4 items-center lg:gap-7">
            <Image src={image} alt="image" height={10000} width={10000} className="object-cover rounded-lg lg:w-64 lg:aspect-[2/1.2] w-32 aspect-[3/2.5]" />
            <div className="flex flex-col gap-2 lg:gap-3">
                <p className="uppercase guardian-medium text-lightGreen lg:text-sm text-xs flex items-center gap-2">|<span>{category}</span></p>
                <p className="guardian-semibold line-clamp-2 text-logo lg:text-lg">{title}</p>
                <p className="lg:text-[13px] text-xs mt-1 text-logo text-opacity-80">{date}</p>
            </div>
        </div>
    );
};

export default LatestNewsCard;