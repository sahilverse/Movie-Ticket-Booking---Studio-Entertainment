import ComingSoon from "@/components/comingSoon/ComingSoon";
import NowShowing from "@/components/nowShowing/NowShowing";
import Slider from "@/components/slider/Slider";
import mockMovies from "@/test/MovieCardTypeTest";
import { SliderType } from "@/types/types";



export default function Home() {

  const comingSoonMovies = mockMovies.filter(movie => !movie.shows || movie.shows.length === 0);
  const nowShowingMovies = mockMovies.filter(movie => movie.shows.some(show => new Date(show.startTime).getTime() > Date.now()))
  const sliders = [...nowShowingMovies.filter(movie => movie.landscapeImageUrl),
  ...comingSoonMovies.filter(movie => movie.landscapeImageUrl)
  ].filter((movie, index, self) => self.findIndex(m => m.id === movie.id) === index);

  return (
    <main className="main_container mt-8">


      <Slider movies={sliders as SliderType[]} />

      <NowShowing movies={nowShowingMovies} />

      <ComingSoon movies={comingSoonMovies} />

    </main>
  );
}
