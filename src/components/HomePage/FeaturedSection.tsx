"use client";

import React, { useEffect, useState } from "react";
import FeaturedCard from "../FeaturedCard";
import FeaturedCard2 from "../FeaturedCard2";
import Link from "next/link";
import { API_Get, API_GetImage } from "@/service/apiService";

const FeaturedSection: React.FC = () => {
    const [blogs, setBlogs] = useState<any[]>([]);

    const fetchCateogry = async () => {
        try {
            const data:any = await API_Get("blogs");
            console.log("Blogs: ", data.docs);
            setBlogs(data.docs);
        } catch (error) {
            console.log("Error fetching blogs: ", error);
        }
    };

    useEffect(() => {
        fetchCateogry();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    return (
        <div className="side">
            <div className="max-w-screen-2xl mx-auto lg:border-b lg:border-borderColor pb-14">
                {blogs && blogs.length > 0 && (
                    <div className="flex lg:gap-6 lg:flex-row flex-col gap-7">
                        <div className="lg:w-[70%] h-full">
                            <Link href={`/blog/${encodeURIComponent(blogs[0]?.title)}?id=${blogs[0]?.id}`}>
                                <FeaturedCard
                                    category={blogs[0]?.sub_category?.length > 0 ? blogs[0]?.sub_category[0].title : blogs[0]?.category[0].title}
                                    title={blogs[0]?.title}
                                    image={API_GetImage(blogs[0]?.thumb_image.url)}
                                    description={blogs[0]?.description_html}
                                    date={formatDate(blogs[0]?.createdAt)}
                                />
                            </Link>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col lg:gap-5 justify-between h-full gap-7">
                                {blogs.slice(1).map((data, index) => (
                                    <Link key={index} href={`/blog/${encodeURIComponent(data?.title)}?id=${data?.id}`}>
                                        <FeaturedCard2
                                            category={data?.sub_category?.length > 0 ? data?.sub_category[0].title : data?.category[0].title}
                                            title={data?.title}
                                            date={formatDate(data?.createdAt)}
                                            image={API_GetImage(data?.thumb_image.url)}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default FeaturedSection;