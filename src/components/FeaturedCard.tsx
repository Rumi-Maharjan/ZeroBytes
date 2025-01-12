"use client";

import React from "react";
import Image from "next/image";

interface FeaturedCardProps {
    category: string;
    title: string;
    description: string;
    date: string;
    image: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ category, title, description, date, image }) => {
    const removeAnchorTags = (htmlContent: any) => {
        if (!htmlContent) {
            return '';
        }
        const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
        doc.querySelectorAll('a').forEach(anchor => anchor.remove());
        return doc.body.innerHTML;
    };

    const cleanDescription = removeAnchorTags(description);

    return (
        <div className="w-full h-full lato-regular">
            <Image src={image} alt="image" width={10000} height={10000} className="object-cover w-full rounded-lg lg:aspect-[2/1.2] aspect-[2/1.5]" />
            <div className="flex flex-col gap-2 mt-3">
                <p className="guardian-medium lg:text-sm text-lightGreen flex items-center gap-2 text-xs uppercase">|<span>{category}</span></p>
                <p className="text-logo guardian-semibold lg:text-[32px] lg:line-clamp-1 text-xl line-clamp-2 lg:leading-normal">{title}</p>
                <div className="text-logo text-opacity-80 line-clamp-2 lg:text-base text-sm"><div dangerouslySetInnerHTML={{ __html: cleanDescription }} /></div>
                <p className="text-logo text-opacity-80 lg:text-[13px] mt-1 text-xs">{date}</p>
            </div>
        </div>
    );
};

export default FeaturedCard;