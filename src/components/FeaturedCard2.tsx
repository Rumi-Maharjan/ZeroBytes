"use client";

import React from "react";
import Image from "next/image";

interface FeaturedCard2Props {
    category: string;
    title: string;
    date: string;
    image: string;
}

const FeaturedCard2: React.FC<FeaturedCard2Props> = ({ category, title, date, image }) => {
    return (
        <div className="w-full h-fit lato-regular flex lg:flex-col flex-row lg:gap-0 gap-4 items-center lg:items-start">
            <Image src={image} alt="image" width={10000} height={10000} className="object-cover lg:w-full rounded-lg lg:aspect-[2/1.2] aspect-[3/2.5] w-32" />
            <div className="flex flex-col gap-2 lg:mt-3">
                <p className="guardian-medium lg:text-sm text-lightGreen flex items-center gap-2 text-xs uppercase">|<span>{category}</span></p>
                <p className="text-logo guardian-semibold line-clamp-2 lg:text-lg">{title}</p>
                <p className="text-logo text-opacity-80 lg:text-[13px] mt-1 text-xs">{date}</p>
            </div>
        </div>
    );
};

export default FeaturedCard2;