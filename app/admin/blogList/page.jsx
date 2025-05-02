"use client";
import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs.");
    }
  };

  const deleteBlog = async (mongoId) => {
    const confirmation = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmation) return;

    try {
      const response = await axios.delete('/api/blog', {
        params: { id: mongoId, confirm: true },
      });
      toast.success(response.data.msg);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 pb-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Blogs</h1>
      <div className="relative  h-[80vh] max-w-[850px] overflow-x-auto overflow-y-auto border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-900 bg-white">
          <thead className="text-sm text-gray-900 text-left uppercase bg-gray-100 border-b">
            <tr>
              <th scope="col" className="hidden sm:table-cell px-6 py-3">Author Name</th>
              <th scope="col" className="px-2 py-3">Blog Title</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((item) => (
              <BlogTableItem 
                key={item._id} 
                mongoId={item._id} 
                title={item.title} 
                author={item.author} 
                authorImg={item.authorImg} 
                date={item.date} 
                deleteBlog={deleteBlog} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;

