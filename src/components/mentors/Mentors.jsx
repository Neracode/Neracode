import {
  Splide,
  SplideSlide,
  SplideTrack,
} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Card from 'src/components/mentors/Card';
import MyContainer from 'src/components/template/MyCountainer';
import MentorsData from 'src/data/MentorsData';

const Mentors = () => {
  return (
    <MyContainer containerId="mentors" background="mt-20">
      <Splide
        hasTrack={false}
        options={{
          perPage: 5,
          rewind: true,
          rewindByDrag: true,
          speed: 700,
          easing: 'cubic-bezier(.75, .2, .2, 0.94)',
          pagination: false,
          gap: 35,
          breakpoints: {
            620: { perPage: 2 },
            768: { perPage: 3 },
            1024: { perPage: 4 },
          },
        }}>
        <div className="custom-wrapper">
          <div className="grid gap-4 grid-cols-[auto_auto] max-md:grid-cols-1 items-end">
            <div className="grid gap-2">
              <h2 className="text-2xl max-sm:text-xs">
                Tim Neracode.
              </h2>
              <h1 className="text-5xl max-sm:text-2xl">
                Siapa aja sih mereka?
              </h1>
              <p className="text-lg mt-3">
                Temukan para mentor berpengalaman dan inspiratif yang
                siap membantu Anda mencapai tujuan Anda. Di sini, Anda
                akan menemukan komunitas mentor luar biasa, terdiri
                dari para profesional dan pakar di berbagai bidang.
              </p>
            </div>
            <div className="splide__arrows relative w-[12rem] mb-8 flex justify-between">
              <button
                className="splide__arrow--prev"
                aria-label="Previous">
                <svg
                  className="w-20 h-8 border rounded-full border-black cursor-pointer hover:bg-[#25263A] hover:text-[#FEFCFB] transition-all duration-300"
                  viewBox="0 0 105 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M72.5146 12L80.9999 20.4853"
                    stroke="currentcolor"
                    strokeLinecap="round"
                  />
                  <path
                    d="M24 20.4853H81"
                    stroke="currentcolor"
                    strokeLinecap="round"
                  />
                  <path
                    d="M72.5146 28.9706L80.9999 20.4853"
                    stroke="currentcolor"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                className="splide__arrow--next"
                aria-label="Next">
                <svg
                  className="w-20 h-8 border rounded-full border-black cursor-pointer hover:bg-[#25263A] hover:text-[#FEFCFB] transition-all duration-300"
                  viewBox="0 0 105 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M72.5146 12L80.9999 20.4853"
                    stroke="currentcolor"
                    strokeLinecap="round"
                  />
                  <path
                    d="M24 20.4853H81"
                    stroke="currentcolor"
                    strokeLinecap="round"
                  />
                  <path
                    d="M72.5146 28.9706L80.9999 20.4853"
                    stroke="currentcolor"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <SplideTrack>
            {MentorsData.map(({ name, posisi, angkatan, img }) => (
              <SplideSlide key={name}>
                <Card
                  posisi={posisi}
                  nama={name}
                  angkatan={angkatan}
                  imgSrc={img}
                />
              </SplideSlide>
            ))}
          </SplideTrack>
        </div>
      </Splide>
    </MyContainer>
  );
};

export default Mentors;
