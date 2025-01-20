import { iconsImages } from 'src/assets';
import MyContainer from 'src/components/template/MyCountainer';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Footer = () => {
  return (
    <MyContainer
      containerId="footer"
      containerStyle="flex justify-between items-center flex-wrap gap-[3rem]"
      background="bg-[#121212]">
      <div id="contact">
        <div className="flex items-center gap-4">
          <LazyLoadImage
            src={iconsImages.g4712}
            alt=""
            className="w-[2rem] h-[2rem]"
          />
          <div className="text-white font-semibold text-[1.4rem]">
            Neracode
          </div>
        </div>
        <div className="bg-white mt-[3rem] py-8 px-[2rem] flex justify-between items-center gap-[5rem] rounded-xl">
          <div className="text-16">
            Ready for start your Journey? <br /> Join with us Now.
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeT8cX1sG1nKo1cYyQmgCm3bY3aL0ZoKdDg08cGMldhF4iqww/viewform"
            target="_blank"
            rel="noreferrer">
            <button className="bg-[#121212] text-white py-4 px-[2rem] rounded-xl text-[1rem]">
              Join Now!
            </button>
          </a>
        </div>
        <div className="flex gap-4 pt-[3rem]">
          <LazyLoadImage
            src={iconsImages.fb}
            alt=""
            className="w-[2rem] h-[2rem]"
          />
          <LazyLoadImage
            src={iconsImages.twitter}
            alt=""
            className="w-[2rem] h-[2rem]"
          />
          <LazyLoadImage
            src={iconsImages.li}
            alt=""
            className="w-[2rem] h-[2rem]"
          />
          <LazyLoadImage
            src={iconsImages.ig}
            alt=""
            className="w-[2rem] h-[2rem]"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-start text-white gap-[2rem]">
        <div>
          <div className="font-bold text-16 mb-[3rem]">Pages</div>
          <ul className="text-[1rem] flex flex-col gap-[1rem]">
            <li>Home it work</li>
            <li>Pricing</li>
            <li>Blog</li>
            <li>Demo</li>
          </ul>
        </div>

        <div>
          <div className="font-bold text-16 mb-[3rem]">Service</div>
          <ul className="text-[1rem] flex flex-col gap-[1rem]">
            <li>Fundamental</li>
            <li>UI/UX Design</li>
            <li>Frontend</li>
            <li>Backend</li>
            <li>Fullstack</li>
            <li>Mentoring</li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-16 mb-[3rem]">Contact</div>
          <ul className="text-[1rem] flex flex-col gap-[1rem]">
            <li className="flex gap-2">
              <LazyLoadImage
                src={iconsImages.phone}
                alt=""
                className="w-[2rem] h-[2rem]"
              />
              <div>+62 819-0847-7337</div>
            </li>
            <li className="flex gap-2">
              <LazyLoadImage
                src={iconsImages.mail}
                alt=""
                className="w-[2rem] h-[2rem]"
              />
              <div>rplsmkn1kotabekasi@gmail.com</div>
            </li>
            <li className="flex gap-2">
              <LazyLoadImage
                src={iconsImages.location}
                alt=""
                className="w-[2rem] h-[2rem]"
              />
              <div>Rekayasa Perangkat Lunak SMKN 1 Kota Bekasi</div>
            </li>
          </ul>
        </div>
      </div>
    </MyContainer>
  );
};
export default Footer;
