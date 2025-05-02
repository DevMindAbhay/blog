import { assets, blog_data} from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
      <Link href={`/blogs/${id}`}>
        <div className='relative h-60 overflow-hidden rounded-t-lg'>
          <Image
            src={image}
            alt=''
            layout='fill'
            objectFit='cover'
            className='transition-transform duration-300 transform hover:scale-105'
          />
        </div>
      </Link>
      <div className='p-6'>
        <p className='inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full mb-2'>
          {category}
        </p>
        <h5 className='mb-2 text-xl font-semibold text-gray-900 leading-tight'>
          <Link href={`/blogs/${id}`}>{title}</Link>
        </h5>
        <p className='mb-4 text-gray-700 text-base leading-relaxed' dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}></p>
        <Link
          href={`/blogs/${id}`}
          className='inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold'
        >
          Read more
          <Image src={assets.arrow} className='ml-2' alt='' width={20} height={20} />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;

