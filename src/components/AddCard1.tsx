"use client";

import React from "react";

const AddCard1: React.FC = () => {
    return (
        <div className="lg:w-full flex flex-col gap-2 w-[80%] mx-auto">
            <p className="lg:hidden text-sm text-ad lato-regular text-center">Advertisement</p>
            <div className="w-full bg-forest flex items-center justify-center guardian-semibold text-xl text-lightGreen aspect-[3/2.5] mx-auto">
                ADS
            </div>
        </div>
    );
};

export default AddCard1;