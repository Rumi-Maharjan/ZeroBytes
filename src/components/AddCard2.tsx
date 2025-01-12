"use client";

import React from "react";

const AddCard2: React.FC = () => {
    return (
        <div className="lg:w-[80%] mx-auto flex flex-col gap-2 w-[90%]">
            <p className="lato-regular font-medium text-ad text-sm text-center">Advertisement</p>
            <div className="bg-forest flex items-center justify-center guardian-semibold text-xl text-lightGreen lg:aspect-[3/0.7] aspect-[3/1]">
                ADS
            </div>
        </div>
    );
};

export default AddCard2;