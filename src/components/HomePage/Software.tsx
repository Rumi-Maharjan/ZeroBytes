"use client";

import React, { useState, useEffect } from "react";
import AddCard1 from "../AddCard1";
import Header from "../Header";
import BlogCard from "../BlogCard";
import BlogCard2 from "../BlogCard2";
import Link from "next/link";
import { API_Get, API_GetImage } from "@/service/apiService";

const Software: React.FC = () => {
    const [category, setCategory] = useState<any | null>(null);
    const [blogs, setBlogs] = useState<any[]>([]);

    const fetchCategory = async () => {
        try {
            const data: any = await API_Get("categories");
            console.log("Cateogry1: ", data.docs[1]);
            setCategory(data.docs[1]);
        } catch (error) {
            console.log("Error fetching category1: ", error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);


    const fetchBlogs = async () => {
        try {
            const data: any =await API_Get("blogs");
            console.log("Hardware Blogs: ", data.docs);
            // setBlogs(data.blogs);
            if (category && category.id) {
                const filteredBlogs = data.docs.filter((blog: any) => 
                    blog.category.some((cat: any) => cat.id === category.id)
                );
                setBlogs(filteredBlogs);
            } else {
                setBlogs([]);
            }
        } catch (error) {
            console.log("Error fetching software blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [category]);

    const createSlug = (title: string): string => {
        return `/${title.toLowerCase().replace(/\s+/g, "-")}`;
    };

    console.log("Software Blogs:", blogs);

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
            <div className="max-w-screen-2xl mx-auto py-14">
                {category && blogs.length > 0 && (
                    <div className="lg:w-[70%] w-full lg:mb-10 mb-8">
                        <Header
                            title={category.title}
                            titleClassName="lg:text-[40px] text-2xl uppercase"
                            linkHref={createSlug(category.title)}
                        />
                    </div>
                )}
                <div className="flex lg:flex-row flex-col gap-7 lg:gap-14 items-start">
                    {category && blogs.length > 0 && (
                        <div className="lg:w-[70%] flex flex-col gap-6">
                            <div>
                                <Link href={`/blog/${encodeURIComponent(blogs[0]?.title)}?id=${blogs[0]?.id}`}>
                                    <BlogCard
                                        image={API_GetImage(blogs[0]?.thumb_image.url)}
                                        category={blogs[0]?.sub_category?.length > 0 ? blogs[0]?.sub_category[0].title : blogs[0]?.category[0].title}
                                        title={blogs[0]?.title}
                                        date={formatDate(blogs[0]?.createdAt)}
                                        variant=""
                                    />
                                </Link>
                            </div>
                            <div className="grid lg:grid-cols-2 gap-6 grid-cols-1">
                                {blogs.slice(1, 3).map((data, index) => (
                                    <Link key={index} href={`/blog/${encodeURIComponent(data?.title)}?id=${data?.id}`}>
                                        <BlogCard2
                                            image={API_GetImage(data?.thumb_image.url)}
                                            category={data?.sub_category?.length > 0 ? data?.sub_category[0].title : data?.category[0].title}
                                            title={data?.title}
                                            date={formatDate(data?.createdAt)}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="lg:flex-1 py-7 w-full lg:mb-0 mb-4 lg:py-0">
                        <AddCard1 />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Software;