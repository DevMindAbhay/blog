import { assets } from '@/Assets/assets';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
        <div className='flex items-center space-x-4'>
          <Image src={assets.logo_light} alt='Blogger Logo' width={120} height={40} />
          <p className='text-sm text-gray-400'>All rights reserved. Copyright Blogger</p>
        </div>

        <div className='flex items-center space-x-4'>
          <a href='#' className='hover:text-gray-300 transition-colors duration-200'>
            <Image src={assets.facebook_icon} alt='Facebook' width={30} height={30} />
          </a>
          <a href='#' className='hover:text-gray-300 transition-colors duration-200'>
            <Image src={assets.instagram_icon} alt=' Instagram' width={30} height={30} />
          </a>
          <a href='#' className='hover:text-gray-300 transition-colors duration-200'>
            <Image src={assets.x_icon} alt='X (Twitter)' width={30} height={30} />
          </a>
          <a href='#' className='hover:text-gray-300 transition-colors duration-200'>
            <Image src={assets.googleplus_icon} alt='Google+' width={30} height={30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;