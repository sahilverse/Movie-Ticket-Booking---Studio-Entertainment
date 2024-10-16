import ComingSoon from "@/components/comingSoon/ComingSoon";
import NowShowing from "@/components/nowShowing/NowShowing";
import Slider from "@/components/slider/Slider";





export default function Home() {

  return (
    <main className="main_container mt-8">


      <Slider />

      <NowShowing />





      {/* TODO:  */}
      <ComingSoon />




    </main>
  );
}
