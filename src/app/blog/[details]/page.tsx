"use client";

import React from "react";
import MasterLayout from "@/components/MasterLayout/MasterLayout";
import BlogDetails from "@/components/BlogDetails";

const Blog: React.FC = () => {
    return (
        <MasterLayout>
            <BlogDetails />
        </MasterLayout>
    );
};


export default Blog;