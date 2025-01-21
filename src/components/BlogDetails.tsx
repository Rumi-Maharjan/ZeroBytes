"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AddCard1 from "./AddCard1";
import LatestCard from "./Category/LatestCard";
import LatestNewsCard from "./LatestNewsCard";
import Image from "next/image";
import { API_Get, API_GetImage, API_Post } from "@/service/apiService";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import config from "../lib/config";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsLink45Deg } from "react-icons/bs";
import Head from "next/head";

const BlogDetails: React.FC = () => {
    const [blog, setBlog] = useState<any | null>(null);
    const [categoryBlog, setCategoryBlog] = useState<any[]>([]);
    const [latestBlog, setLatestBlog] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const searchParams = useSearchParams();

    const blogId = parseInt(searchParams.get("id") || "");
    const [loading, setLoading] = useState(false);

    console.log("id:", blogId);

    const fetchBlogs = async () => {
        try {
            const data: any = await API_Get("blogs");
            console.log("LatestBlog: ", data.docs);
            const filteredBlogs = data.docs.filter((b: any) => b.id !== blogId);
            setLatestBlog(filteredBlogs);
            const detail = data.docs.find((b: any) => b.id === blogId);
            console.log("Main Blog: ", detail);
            if (detail) {
                setBlog(detail);
                const categoryId = detail.category[0]?.id;
                if (categoryId) {
                    const similarBlogs = data.docs.filter(
                        (b: any) => b.category?.[0]?.id === categoryId && b.id !== blogId
                    );
                    setCategoryBlog(similarBlogs);
                }
            } else {
                console.log(`Blog with ID ${blogId} not found.`);
                setBlog(null);
            }
        } catch (error) {
            console.log("Error fetching latest blog:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchComment = async () => {
        try {
            const data: any = await API_Get("comments");
            const blogComment = data.docs.filter((c: any) => c.blogs.id === blogId)
            setComments(blogComment);
            console.log("comment:", blogComment);
        } catch (error) {
            console.log("Error fetching comments: ", error);
        }
    };

    useEffect(() => {
        fetchComment();
    }, [blogId]);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            if (!blog?.title) {
                console.log("Blog title is missing. Comment not posted.");
                return;
            }
    
            const commentData = {
                comment: data.comment,
                email: data.email,
                blogs: blogId,
                first_name: data.first_name,
            };
    
            const response = await API_Post("comments", commentData);
            if(response === 201) {
                Swal.fire({
                    icon:'success',
                    text:'Success',
                    title:'Comment Posted!',
                    timer: 2000
                })
            }
            console.log("Comment posted:", response);
            setLoading(false);
    
            fetchComment();
            reset();
        } catch (error) {
            console.log("Error posting comment:", error);
            reset();
            Swal.fire({
                icon:'error',
                title:'Error',
                text:'Error in submitting comment.',
                timer: 2000
            })
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    const formatBlogDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const imageTags = (htmlContent: any) => {
        if (!htmlContent) {
            return '';
        }
        const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
        doc.querySelectorAll('a').forEach((link: HTMLAnchorElement) => {
            const rawHref = link.getAttribute('href');
            if (rawHref) {
                const img = document.createElement('img');
                img.src = API_GetImage(rawHref);
                console.log("Raw href:", rawHref);
                img.alt = 'Image from link';
                img.className = 'w-full rounded-lg my-4';
                link.replaceWith(img);
            }
        });
        return doc.body.innerHTML;
    };
    
    
    const cleanDescription = imageTags(blog?.description_html);

    const handleFacebookShare = () => {
        const blogUrl = `${config.shareUrl}/blog/${encodeURIComponent(blog?.title)}?id=${blog?.id}`;
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`;
        window.open(shareUrl, "_blank", "noopener,noreferrer");
    }

    const handleTwitterShare = () => {
        const blogUrl = `${config.shareUrl}/blog/${encodeURIComponent(blog?.title)}?id=${blog?.id}`;
        const tweetText = encodeURIComponent(
            `${blog?.title} ${blogUrl}`
        );
        const shareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
        window.open(shareUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <>
            <Head>
                <title>{blog?.title}</title>
                <meta property="og:title" content={blog?.title} />
                <meta
                    property="og:description"
                    content={cleanDescription}
                />
                <meta property="og:image" content={API_GetImage(blog?.thumb_img)} />
                <meta property="og:url" content={`${config.shareUrl}/blog/${encodeURIComponent(blog?.title)}?id=${blog?.id}`} />
                <meta property="og:type" content="article" />
            </Head>
            <div className="side">
                {loading && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white opacity-75 z-50">
                        <img src="/images/loading.gif" className="object-contain" />
                    </div>
                )}
                <div className="max-w-screen-2xl mx-auto">
                    <div className="lg:w-[70%] flex flex-col gap-3 mb-5">
                        <p className="flex items-center gap-2 text-sm text-lightGreen uppercase guardian-medium"><span>|</span>{blog?.sub_category?.length > 0 ? blog?.sub_category[0].title : blog?.category[0].title}</p>
                        <p className="guardian-semibold lg:text-[40px] text-logo text-2xl leading-snug">{blog?.title}</p>
                        <div className="flex lg:items-center lg:justify-between md:flex-row flex-col gap-3 lg:mt-0 mt-3">
                            <p className="text-logo text-opacity-60 text-sm lato-regular font-medium">Published {formatBlogDate(blog?.createdAt)}</p>
                            <div className="flex items-center gap-4">
                                <div
                                    onClick={handleFacebookShare}
                                    className="cursor-pointer"
                                >
                                    <FaFacebook className="text-[2.5rem] text-facebook"/>
                                </div>
                                <div
                                    className="cursor-pointer rounded-full bg-instagram text-white p-2 text-2xl"
                                >
                                    <FaInstagram />
                                </div>
                                <div
                                    onClick={handleTwitterShare}
                                    className="cursor-pointer rounded-full bg-black text-white text-2xl p-2"
                                >
                                    <FaXTwitter />
                                </div>
                                <div className="cursor-pointer text-lightGreen rounded-full text-2xl p-2 bg-copy"><BsLink45Deg /></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex lg:flex-row flex-col gap-6 pb-7">
                        <div className="lg:w-[70%] h-full flex flex-col gap-5 lg:text-lg text-logo border-b border-lightGreen pb-8">
                            <div dangerouslySetInnerHTML={{ __html: cleanDescription }} />
                        </div>
                        <div className="flex-1">
                            {latestBlog && latestBlog.length > 0 && (
                                <div className="relative rounded-lg border border-lightGreen h-fit px-4 pt-7 mt-4 w-full lg:flex hidden flex-col">
                                    <div className="absolute -top-4 left-0 flex justify-center w-full"><p className="text-lightGreen border border-lightGreen guardian-medium rounded py-1 px-4 bg-white">Latest News</p></div>
                                        {latestBlog.slice(0,5).map((data, index) => (
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
                            <div className="lg:p-10 mt-5">
                                <AddCard1 />
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-[70%] pb-7 border-b border-lightGreen">
                        <p className="text-lg text-logo guardian-semibold mb-5">COMMENTS</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <textarea
                                {...register("comment")}
                                required
                                className="border border-lightGray w-full h-40 p-2"
                                placeholder="Comment Here"
                            >
                            </textarea>
                            <div className="flex items-centr gap-5 my-3">
                                <input
                                    type="text"
                                    {...register("first_name")}
                                    className="border border-lighGray lg:w-52 p-2 w-full"
                                    required
                                    placeholder="Name"
                                />
                                <input
                                    type="email"
                                    {...register("email")}
                                    className="border border-lighGray lg:w-52 p-2 w-full"
                                    required
                                    placeholder="Email"
                                />
                            </div>
                            <button type="submit" className="text-white bg-lightGreen p-2 w-40 rounded-md mt-2 text-sm">Send</button>
                        </form>
                        {comments && comments.length > 0 && (
                            <div className="w-full border border-lightGray flex flex-col gap-2 mt-10 overflow-y-auto max-h-80 thin-scrollbar px-5 py-3">
                                {comments.map((data, index) => (
                                    <div key={index} className="border-b border-lightGray pb-4 pt-2">
                                        <div className="flex items-center gap-4">
                                            <p className="text-lightGreen guardian-medium">{data?.first_name}</p>
                                            <p className="text-lightGray text-sm">{formatDate(data?.createdAt)}</p>
                                        </div>
                                        <p className="text-logo lg:text-base text-sm">{data?.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {categoryBlog && categoryBlog.length > 0 && (
                        <div className="lg:w-[70%] mt-7">
                            <p className="guardian-semibold lg:text-2xl text-logo text-xl">You May Also Like</p>
                            {categoryBlog.slice(0, 6).map((data, index) => (
                                <div key={index} className="border-b border-borderColor lg:py-7 py-5">
                                    <Link href={`/blog/${encodeURIComponent(data?.title)}?id=${data?.id}`}>
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
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogDetails;