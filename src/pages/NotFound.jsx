import MyContainer from '../components/template/MyCountainer';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <MyContainer containerStyle="mt-[3rem] min-h-[20rem] grid place-items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-8xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-500 dark:text-gray-400 md:text-4xl">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-medium text-gray-500 dark:text-gray-400 md:max-w-[50ch]">
            Maaf, halaman itu tak ditemukan.
            <span className="hidden md:inline">
              {' '}
              Silahkan kembali ke beranda.{' '}
            </span>
          </p>
          <Link
            to="/"
            className="inline-flex text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4">
            Back to Homepage
          </Link>
        </div>
      </div>
    </MyContainer>
  );
}

export default NotFound;
