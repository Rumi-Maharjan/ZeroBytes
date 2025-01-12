"use client";

import React from "react";
import Image from "next/image";

interface LatestCardProps {
    category: string;
    title: string;
    date: string;
    image: string;
}

const LatestCard: React.FC<LatestCardProps> = ({ title, date, image }) => {
    return (
        <div className="w-full flex gap-4 items-center md:gap-3">
            <Image src={image} alt="image" height={10000} width={10000} className="object-cover rounded-lg md:w-[32%] aspect-[3/2.3] w-32" />
            <div className="flex flex-col lg:gap-1">
                <p className="guardian-semibold xl:line-clamp-3 text-logo lg:line-clamp-2 md:line-clamp-1">{title}</p>
                <p className="md:text-[13px] text-xs mt-1 text-logo text-opacity-80">{date}</p>
            </div>
        </div>
    );
};

export default LatestCard;