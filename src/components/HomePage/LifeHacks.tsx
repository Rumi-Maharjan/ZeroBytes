"use client";

import React, { useState, useEffect } from "react";
import Header from "../Header";
import Image from "next/image";
import Link from "next/link";
import { API_Get, API_GetImage } from "@/service/apiService";

const LifeHacks: React.FC = () => {
    const [category, setCategory] = useState<any | null>(null);
    const [blogs, setBlogs] = useState<any[]>([]);

    const fetchCategory = async () => {
        try {
            const data: any = await API_Get("categories");
            console.log("Cateogry1: ", data.docs[2]);
            setCategory(data.docs[2]);
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
            console.log("Error fetching haware blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [category]);

    const createSlug = (title: string): string => {
        return `/${title.toLowerCase().replace(/\s+/g, "-")}`;
    };

    console.log("LifeHacks Blogs:", blogs);
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };
    
    return (
        <div className="side bg-black">
            <div className="w-full bg-black">
                {category && blogs.length > 0 && (
                    <div className="max-w-screen-2xl mx-auto lg:py-14 py-10">
                        <Header
                            title={category.title}
                            titleClassName="lg:text-[40px] text-2xl uppercase text-white"
                            linkHref={createSlug(category.title)}
                        />
                        <Link href={`/blog/${encodeURIComponent(blogs[0]?.title)}?id=${blogs[0]?.id}`}>
                            <div className="lg:gap-10 lg:items-center lg:mt-10 items-start flex lg:flex-row flex-col-reverse gap-5 w-full mt-8">
                                <div className="flex flex-col lg:gap-4 text-white gap-2 lg:w-[50%]">
                                    <p className="guardian-medium lg:text-sm flex items-center gap-2 text-xs"><span>|</span>{blogs[0]?.sub_category?.length > 0 ? blogs[0]?.sub_category[0].title : blogs[0]?.category[0].title}</p>
                                    <p className="guardian-semibold lg:text-[40px] line-clamp-2 leading-tight text-2xl">{blogs[0]?.title}</p>
                                    <p className="lato-regular lg:text-sm text-xs lg:mt-0 mt-1">{formatDate(blogs[0]?.createdAt)}</p>
                                </div>
                                <div className="lg:flex-1">
                                    <Image src={API_GetImage(blogs[0]?.thumb_image.url)} alt="image" height={10000} width={10000} className="object-cover rounded-md aspect-[3/2.5] lg:w-full" />
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LifeHacks;