import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  imageUrl,
  buttonText,
  buttonLink
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
      <div className="absolute inset-0">
        {imageUrl ? (
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        ) : (
          <div className="h-full w-full bg-gray-800"></div>
        )}
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">{subtitle}</p>
        )}
        {buttonText && buttonLink && (
          <Link href={buttonLink} className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-lg transition-colors">
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
