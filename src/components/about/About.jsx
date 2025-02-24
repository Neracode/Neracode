import Card from 'src/components/about/CardAbout';
import MyContainer from 'src/components/template/MyCountainer';
import { useEffect, useState, useRef } from 'react';
import TimelineData from 'src/data/TimelineData';
import { iconsImages } from 'src/assets';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const About = () => {
  const [isDropdownClicked, setDropdownClicked] = useState(null);
  const dropdownContainerRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target)
      ) {
        setDropdownClicked(null);
      }
    };

    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <>
      <MyContainer containerId="about" background="bg-gray-100">
        <div className="flex max-lg:flex-col gap-8 lg:items-center lg:justify-center">
          <div className="text-5xl max-sm:text-2xl border-gray-500 lg:pr-8 lg:border-r-[2px] max-lg:pb-8 max-lg:border-b-[1px] leading-normal">
            Apa sih itu Neracode?
          </div>
          <div className="text-lg leading-normal text-gray-600">
            Neracode atau Next Generation Code merupakan klub
            komunitas di SMKN 1 Kota Bekasi, dimana para siswa
            berkumpul dalam mendalami dunia pemrograman. Ini adalah
            klub yang menyediakan platform bagi siswa untuk belajar,
            berlatih, dan berkolaborasi dalam berbagai proyek dan
            aktivitas coding.
          </div>
        </div>
      </MyContainer>
      <MyContainer containerStyle="mb-8">
        <div className="grid grid-cols-1 gap-16 text-justify lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="text-5xl max-sm:text-2xl">
              Kita Belajar Apa Aja Nih?
            </div>
            <div className="text-xl font-light">
              Neracode bakalan ngajarin kamu mulai dari Fullstack Web
              Development, UI/UX Design, dan Android Development
              dengan menggunakan teknologi terbaru. Kita bakalan
              bimbing kamu sampai kamu bosen lohh!
            </div>
            <LazyLoadImage
              src={iconsImages.group}
              alt="Group"
              effect="blur"
              className="h-[14rem] bg-cover object-cover rounded-xl mt-[-.9rem]"
            />
          </div>
          <div
            ref={dropdownContainerRef}
            className="dropdownContainer flex flex-col justify-between gap-4">
            {TimelineData.map((item, id) => (
              <Card
                key={id}
                isDropdownClicked={isDropdownClicked}
                setDropdownClicked={setDropdownClicked}
                title={item.title}
                tech={item.options}
                id={id}
              />
            ))}
          </div>
        </div>
      </MyContainer>
    </>
  );
};

export default About;
