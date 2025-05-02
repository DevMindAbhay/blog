'use client';
import { assets, blog_data } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; 
import Image from 'next/image'; 

const page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get('/api/blog', blog_data, {
        params: { id: params.id },
      });
      
      setData(response.data);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  },[]);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src={assets.logo} width={180} alt="Logo" className="w-[130px] sm:w-auto" />
          </Link>
           <button className="flex items-center gap-2 font-semibold py-2 px-4 sm:py-3 sm:px-8 border-2 border-black rounded-full transition-colors duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-600 hover:to-blue-500 shadow-md hover:shadow-lg">
                    Get Started <Image src={assets.arrow} alt="Arrow icon" width={20} height={20} />
           </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
          <Image className="mx-auto mt-6 border border-white rounded-full" src={data.author_img} width={60} height={60} alt="Author" />
        <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[100px] mb-10">
        <Image className="border-4 border-white" src={data.image} width={1280} height={720} alt="Blog Image" />
       
        <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}></div>
       
        <div className="my-24">
          <p className="text-black font-semibold space-x-8 my-4">Share this article on social media</p>
          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="Facebook" />
            <Image src={assets.instagram_icon} width={50} alt="Instagram" />
            <Image src={assets.x_icon} width={50} alt="X" />
            <Image src={assets.googleplus_icon} width={50} alt="Google Plus" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;

