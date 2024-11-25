import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import ad from '/Ad_portas.jpg';
import imgMaps from '/mapImg.webp';
import Link from '@/components/ui/Link';
import Login from '@/components/modals/Login';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carousel = [ad, imgMaps];

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carousel.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carousel.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="w-full flex gap-0 ">
      {showModal && <Login onClose={handleClose} />}
      <div className="bg-white w-full">
        <div className="lg:flex">
          <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold text-gray-800  lg:text-4xl">
                Conecta con tus compañeros y vive viajes{' '}
                <span className="green-text">inolvidables</span>
              </h2>

              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
                Tu comunidad universitaria viaja contigo...
              </p>

              <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                <div>
                  <a
                    href="#"
                    className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-white transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700 green"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Iniciar Sesión
                  </a>
                  <p className="min-w-60 text-base sm:text-lg text-center">
                    ¿No tienes cuenta?{' '}
                    <Link href="/register" className="green-text">
                      Crea una
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full h-96 lg:w-1/2 lg:h-auto p-4">
            <div
              className="w-full h-full bg-cover rounded-lg"
              style={{
                backgroundImage: `url(${carousel[currentImageIndex]})`,
              }}
            >
              <div className="w-full h-full bg-black opacity-25"></div>
            </div>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700"
              aria-label="Previous"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700"
              aria-label="Next"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
