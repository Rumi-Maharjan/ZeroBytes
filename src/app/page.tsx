import React from "react";
import MasterLayout from "@/components/MasterLayout/MasterLayout";
import FeaturedSection from "@/components/HomePage/FeaturedSection";
import LatestNews from "@/components/HomePage/LatestNews";
import Hardware from "@/components/HomePage/Hardware";
import Software from "@/components/HomePage/Software";
import LifeHacks from "@/components/HomePage/LifeHacks";
import TechNews from "@/components/HomePage/TechNews";

export default function Home() {
  return (
    <MasterLayout>
      <FeaturedSection />
      <LatestNews />
      <Hardware />
      <Software />
      <LifeHacks />
      <TechNews />
    </MasterLayout>
  );
};
