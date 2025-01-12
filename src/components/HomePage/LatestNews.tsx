"use client";

import React, { useEffect, useState } from "react";
import Header from "../Header";
import LatestNewsCard from "../LatestNewsCard";
import { latestNewsData } from "../data";
import AddCard1 from "../AddCard1";
import Link from "next/link";
import { API_Get, API_GetImage } from "@/service/apiService";

const LatestNews: React.FC = () => {
    const [blogs, setBlogs] = useState<any[]>([]);

    const fetchBlogs = async () => {
        try {
            const data: any = await API_Get("blogs");
            console.log("LatestBlog: ", data.docs);
            setBlogs(data.docs); 
        } catch (error) {
            console.log("Error fetching latest blog:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
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
            <div className="max-w-screen-2xl mx-auto lg:my-14 my-5">
                <div className="lg:w-[70%] w-full mb-2">
                    <Header
                        title="Latest News"
                        titleClassName="lg:text-[32px] text-2xl"
                        linkHref="/latest"
                    />
                </div>
                <div className="flex lg:gap-14 lg:flex-row flex-col gap-7 items-start">
                    <div className="lg:w-[70%] flex flex-col">
                        {blogs.slice(0,6).map((data, index) => (
                            <div key={index} className="border-b border-borderColor lg:py-7 py-5">
                                <Link href={`/blog/${encodeURIComponent(data.title)}?id=${data.id}`}>
                                    <LatestNewsCard
                                        category={data?.sub_category?.length > 0 ? data?.sub_category[0].title : data?.category[0].title}
                                        title={data?.title}
                                        date={formatDate(data?.createdAt)}
                                        image={API_GetImage(data?.thumb_image.url)}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="lg:flex-1 py-7 w-full lg:mb-0 mb-4">
                        <AddCard1 />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestNews;