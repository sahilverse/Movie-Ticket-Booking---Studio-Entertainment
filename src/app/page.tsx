"use client";
import MovieCarousel from "@/components/NowShowing/Carousel/MovieCarousel";
import NowShowing from "@/components/NowShowing/NowShowing";
import Slider from "@/components/Slider/Slider";

export default function Home() {
  return (
    <div className="main_container mt-8">


      <Slider />

      <NowShowing />

      <MovieCarousel />

    </div>
  );
}
