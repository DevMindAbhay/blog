import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-slate-100 border-r border-black min-h-screen w-28 sm:w-80">
      <div className="px-4 sm:px-8 py-5 border-b border-black flex justify-center">
        <Image src={assets.logo} width={120} alt="Logo" />
      </div>

      <div className="py-8 space-y-4 px-4 sm:px-6">
        <SidebarLink href="/admin/addProduct" icon={assets.add_icon} label="Add Blogs" />
        <SidebarLink href="/admin/blogList" icon={assets.blog_icon} label="Blog Lists" />
        <SidebarLink href="/admin/subscriptions" icon={assets.email_icon} label="Subscriptions" />
      </div>
    </div>
  );
};

const SidebarLink = ({ href, icon, label }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 bg-white border border-black 
                 shadow-[5px_5px_0px_#000] rounded-lg transition-transform transform 
                 hover:shadow-[7px_7px_0px_#000] hover:-translate-y-1"
    >
      <Image src={icon} alt="" width={28} />
      <p className="hidden sm:block font-medium">{label}</p>
    </Link>
  );
};

export default Sidebar;
