import React from "react";
import MasterLayout from "@/components/MasterLayout/MasterLayout";
import CategoryPage from "@/components/Category/CategoryPage";

const Category: React.FC = () => {
    return (
        <MasterLayout>
            <CategoryPage />
        </MasterLayout>
    );
};

export default Category;