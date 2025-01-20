import Galery from 'src/components/galery/Galery';
import Hero from 'src/components/hero/Hero';
import About from 'src/components/about/About';
import Mentors from 'src/components/mentors/Mentors';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Galery />
      <Mentors />
    </>
  );
}

export default Home;
