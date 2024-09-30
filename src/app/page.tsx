"use client";

import ComingSoon from "@/components/ComingSoon/ComingSoon";
import Footer from "@/components/Footer/Footer";
import NowShowing from "@/components/NowShowing/NowShowing";
import Slider from "@/components/Slider/Slider";


export default function Home() {
  return (
    <div className="main_container mt-8">


      <Slider />

      <NowShowing />

      <ComingSoon />

      <Footer />


    </div>
  );
}
