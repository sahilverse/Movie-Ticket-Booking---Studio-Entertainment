import ComingSoon from "@/components/comingSoon/ComingSoon";
import NowShowing from "@/components/nowShowing/NowShowing";
import Slider from "@/components/slider/Slider";
import mockMovies from "@/test/MovieCardTypeTest";
import { SliderType } from "@/types/types";



export default function Home() {

  const sliders = mockMovies.filter(movie => movie.landscapeImageUrl);
  const comingSoonMovies = mockMovies.filter(movie => !movie.shows || movie.shows.length === 0);

  return (
    <main className="main_container mt-8">


      <Slider movies={sliders as SliderType[]} />

      <NowShowing movies={mockMovies} />

      <ComingSoon movies={comingSoonMovies} />

    </main>
  );
}
