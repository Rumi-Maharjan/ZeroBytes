"use client";

import React from "react";
import Image from "next/image";

interface CategoryCardProps {
    title: string;
    date: string;
    image: string;
    description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, date, image, description }) => {
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
        <div className="w-full flex gap-4 items-center lg:gap-7">
            <Image src={image} alt="image" height={10000} width={10000} className="object-cover rounded lg:w-72 lg:aspect-[2/1.2] w-32 aspect-[3/2.5]" />
            <div className="flex flex-col gap-2 lg:gap-3">
                <p className="guardian-semibold line-clamp-2 text-logo lg:text-lg">{title}</p>
                <div className="lg:block hidden">
                    <div className="text-logo text-opacity-80 line-clamp-3"><div dangerouslySetInnerHTML={{ __html: cleanDescription }} /></div>
                </div>
                <p className="lg:text-[13px] text-xs mt-1 text-logo text-opacity-80">{date}</p>
            </div>
        </div>
    );
};

export default CategoryCard;