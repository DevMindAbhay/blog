import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowUp } from "react-icons/fa";  

const Header = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "/api/email",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Error: " + response.data.msg);
      }
    } catch (error) {
      console.error("Error Response:", error.response);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative py-5 px-5 md:p-12 lg:px-28">
      
      <div className="flex justify-between items-center">
        <Image src={assets.logo} width={80} alt="Blogger Logo" className="w-[130px] sm:w-auto" />
        <button className="flex items-center gap-2 font-semibold py-2 px-4 sm:py-3 sm:px-8 border-2 border-black rounded-full transition-colors duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-600 hover:to-blue-500 shadow-md hover:shadow-lg">
          Get Started <Image src={assets.arrow} alt="Arrow icon" width={20} height={20} />
        </button>
      </div>

     
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-semibold">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] mx-auto text-sm sm:text-base text-gray-600">
          Subscribe to get the latest blog updates in your inbox.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black rounded-full overflow-hidden shadow-md"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-6 py-3 outline-none w-full"
          />
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 sm:px-8 font-semibold hover:bg-gray-800 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>

      
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-2 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Header;
