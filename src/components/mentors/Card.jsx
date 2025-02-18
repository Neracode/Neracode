import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Card = ({ posisi, nama, angkatan, imgSrc }) => {
  return (
    <div className="grid w-full h-full mt-8">
      <LazyLoadImage
        src={imgSrc}
        alt={`${nama} - ${posisi}`}
        className="bg-cover object-cover aspect-[3/5] rounded-xl"
        effect="opacity"
        threshold={300}
      />
      <div className="py-4">
        <div className="uppercase text-xs text-gray-600">
          {posisi}
        </div>
        <div className="capitalize">{nama}</div>
        <div className="capitalize">{angkatan}</div>
      </div>
    </div>
  );
};

export default Card;
