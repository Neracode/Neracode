import { iconsImages } from 'src/assets';
import MyContainer from 'src/components/template/MyCountainer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Hero = () => {
  return (
    <MyContainer
      containerId="hero"
      containerStyle="md:my-20 max-md:mb-20 flex justify-between items-center max-lg:flex-col-reverse gap-8 overflow-hidden">
      <div className="flex-1 max-sm:mt-10">
        <div className="flex items-center gap-[1rem]">
          <LazyLoadImage
            src={iconsImages.star}
            alt="Star Icon"
            effect="blur"
          />
          <div className="text-xl max-sm:text-sm text-[#7A6F6F]">
            Make a trust with us
          </div>
          <LazyLoadImage
            src={iconsImages.star}
            alt="Star Icon"
            effect="blur"
          />
        </div>
        <h1 className="text-6xl max-sm:text-3xl max-xl:text-5xl mt-3">
          Bangun potensi dirimu sebagai Profesional Coder bersama
          Neracode.
        </h1>
        <div className="mt-3">
          Pengen ngoding, tapi masih pusing? Sokin aja sini sama
          Neracode!
        </div>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeT8cX1sG1nKo1cYyQmgCm3bY3aL0ZoKdDg08cGMldhF4iqww/viewform"
          rel="noreferrer"
          target="_blank"
          className="flex justify-center items-center text-lg mt-6 px-[1.5rem] py-[.5rem] border border-black rounded-full w-fit gap-[1rem] hover:bg-[#25263A] hover:text-[#FEFCFB] ease-in-out duration-300 group">
          <div className="relative flex items-center">
            <LazyLoadImage
              src={iconsImages.curl_arrow}
              alt="Curl Arrow"
              effect="blur"
              className="absolute -top-4 left-40"
            />
            <button className="relative">Gabung yuk</button>
            <svg
              className="-rotate-45 group-hover:rotate-0 ease-in-out duration-300 w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 5L19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>
      </div>
      <LazyLoadImage
        src={iconsImages.computer}
        alt="Computer Illustration"
        effect="blur"
        width={400}
        height={350}
        className="max-sm:mt-10"
      />
    </MyContainer>
  );
};

export default Hero;
