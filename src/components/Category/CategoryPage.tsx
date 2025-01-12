"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaHouseChimney } from "react-icons/fa6";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import FeaturedCard from "../FeaturedCard";
import LatestCard from "./LatestCard";
import CategoryCard from "./CategoryCard";
import AddCard1 from "../AddCard1";
import { IoIosArrowBack } from "react-icons/io";
import { API_Get, API_GetImage } from "@/service/apiService";

const CategoryPage: React.FC = () => {
    const pathname = usePathname();
    const category = pathname?.split('/')[1] || "";
    const categoryName = category.replace(/-/g, " ");
    const [blogs, setBlogs] = useState<any[]>([]);
    const [categoryBlogs, setCategoryBlogs] = useState<any[]>([]);
    const [categoryId, setCategoryId] = useState<number | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const [currentPageRange, setCurrentPageRange] = useState(1);

    const totalItems = categoryBlogs.length - 1;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);

    const paginatedData = categoryBlogs.slice(startIndex, endIndex + 1);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };


    const fetchCateogry = async () => {
        try {
            const data:any = await API_Get("categories");
            const category = data.docs.find((cat: any) => cat.title.toLowerCase() === categoryName.toLowerCase());
            if (category) {
                setCategoryId(category.id);
            }
            console.log("recived category: ", category);
        } catch (error) {
            console.log("Error fetching categories: ", error);
        }
    };

    useEffect(() => {
        fetchCateogry();
    }, [categoryName]);

    const fetchBlogs = async () => {
        try {
            const data: any = await API_Get("blogs");
            console.log("LatestBlog: ", data.docs);
            if (categoryId) {
                const filteredBlogs = data.docs.filter((blog: any) => 
                    blog.category.some((cat: any) => cat.id === categoryId)
                );
                setBlogs(filteredBlogs);
            } else {
                setBlogs(data.docs);
            }
        } catch (error) {
            console.log("Error fetching latest blog:", error);
        }
    };
    
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchCategoryBlogs = async () => {
        try {
            const data: any =await API_Get("blogs");
            console.log("Hardware Blogs: ", data.docs);
            // setBlogs(data.blogs);
            if (categoryName.toLowerCase() === "latest") {
                setCategoryBlogs(data.docs);
            } else if (categoryId) {
                const filteredBlogs = data.docs.filter((blog: any) =>
                    blog.category.some((cat: any) => cat.id === categoryId)
                );
                setCategoryBlogs(filteredBlogs);
            } else {
                setCategoryBlogs([]);
            }
        } catch (error) {
            console.log("Error fetching category blogs:", error);
        }
    };

    useEffect(() => {
        fetchCategoryBlogs();
    }, [categoryId, categoryName]);

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
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex items-center gap-2">
                    <Link href="/"><FaHouseChimney className="text-lightGreen text-xl cursor-pointer" /></Link>
                    <IoIosArrowForward className="text-logo "/>
                    <p className="text-logo lato-regular capitalize font-medium">{categoryName}</p>
                </div>

                <div className="guardian-semibold text-logo capitalize text-5xl mt-10 mb-8 pb-8 lg:w-[70%] border-b border-borderColor">{categoryName}</div>

                <div className="flex lg:flex-row flex-col gap-6 border-b border-borderColor pb-7 mb-7">
                    <div className="lg:w-[70%] h-full">
                        {categoryBlogs && categoryBlogs.length > 0 && (
                            <Link href={`/blog/${encodeURIComponent(categoryBlogs[0]?.title)}?id=${categoryBlogs[0]?.id}`}>
                                <FeaturedCard
                                    category={categoryBlogs[0]?.sub_category?.length > 0 ? categoryBlogs[0]?.sub_category[0].title : categoryBlogs[0]?.category[0].title}
                                    title={categoryBlogs[0]?.title}
                                    image={API_GetImage(categoryBlogs[0]?.thumb_image.url)}
                                    description={categoryBlogs[0]?.description_html}
                                    date={formatDate(categoryBlogs[0]?.createdAt)}
                                />
                            </Link>
                        )}
                    </div>

                    {categoryName.toLowerCase() !== "latest" && (
                        <div className="flex-1 relative rounded-lg border border-lightGreen h-fit px-4 pt-7 mt-4">
                            <div className="absolute -top-4 left-0 flex justify-center w-full"><p className="text-lightGreen border border-lightGreen guardian-medium rounded py-1 px-4 bg-white">Latest News</p></div>
                            {blogs.slice(0,5).map((data, index) => (
                                <Link key={index} href={`/blog/${encodeURIComponent(data?.title)}?id=${data?.id}`}>
                                    <div className="flex flex-col border-b border-borderColor md:py-3 py-5 overflow-x-hidden">
                                        <LatestCard
                                            category={data?.sub_category?.length > 0 ? data?.sub_category[0].title : data?.category[0].title}
                                            title={data?.title}
                                            date={formatDate(data?.createdAt)}
                                            image={API_GetImage(data?.thumb_image.url)}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                </div>
                <div className="flex gap-14 md:flex-row flex-col">
                    <div className="lg:w-[70%] flex flex-col">
                        {paginatedData.map((data, index) => (
                            <Link key={index} href={`/blog/${encodeURIComponent(data?.title)}?id=${data?.id}`}>
                                <div key={index} className="py-6 border-b border-borderColor">
                                    <CategoryCard
                                        title={data?.title}
                                        date={formatDate(data?.createdAt)}
                                        image={API_GetImage(data?.thumb_image.url)}
                                        description={data?.description_html}
                                    />
                                </div>
                            </Link>
                        ))}
                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-10 mb-4">
                                {totalPages > 3 && (
                                    <button
                                        className={`px-3 py-2 rounded-full text-logo text-opacity-80`}
                                        onClick={() => setCurrentPageRange(prev => Math.max(prev - 3, 1))}
                                    >
                                        <IoIosArrowBack />
                                    </button>
                                )}
                                {Array.from({ length: Math.min(3, totalPages - (currentPageRange - 1)) }, (_, index) => (
                                    <button
                                        key={index + currentPageRange}
                                        onClick={() => handlePageClick(index + currentPageRange)}
                                        className={`px-3 py-1 rounded-full border text-sm ${
                                            currentPage === index + currentPageRange
                                                ? "bg-page text-white"
                                                : "text-page border-page"
                                        }`}
                                    >
                                        {index + currentPageRange}
                                    </button>
                                ))}
                                {totalPages > 3 && (
                                    <button
                                        className={`px-3 py-2 rounded-full text-logo text-opacity-80`}
                                        onClick={() => setCurrentPageRange(prev => Math.min(prev + 3, totalPages - 2))}
                                    >
                                        <IoIosArrowForward />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex-1 w-full">
                        <AddCard1 />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;