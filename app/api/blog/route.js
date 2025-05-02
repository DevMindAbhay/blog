import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
const fs = require("fs");



const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
      try {
        const objectId = new ObjectId(blogId); 
        const blog = await BlogModel.findById(objectId);

        if (!blog) {
          return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, blog });
      } catch (objectIdError) {
        return NextResponse.json({ success: false, msg: "Invalid ID format" }, { status: 400 });
      }
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ success: true, blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ success: false, msg: "Failed to fetch blogs" }, { status: 500 });
  }
}

// API Endpoint For Uploading Blogs
export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    const authorImg = formData.get("authorImg"); 

    // Check if main blog image exists
    if (!image || !(image instanceof File)) {
      return NextResponse.json({ success: false, msg: "Blog image is required and must be a file" }, { status: 400 });
    }

    // Process blog image
    const imageByData = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageByData);
    const imagePath = path.join(process.cwd(), `public/${timestamp}_${image.name}`);
    await writeFile(imagePath, imageBuffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    // Process author image only if provided
    let authorImgUrl = null;
    if (authorImg && authorImg instanceof File) {
      const authorImgData = await authorImg.arrayBuffer();
      const authorImgBuffer = Buffer.from(authorImgData);
      const authorImgPath = path.join(process.cwd(), `public/${timestamp}_author_${authorImg.name}`);
      await writeFile(authorImgPath, authorImgBuffer);
      authorImgUrl = `/${timestamp}_author_${authorImg.name}`;
    }

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl, 
      authorImg: authorImgUrl || "/author_img.png", 
    };

    await BlogModel.create(blogData);
    console.log("Blog Saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ success: false, msg: "Failed to add blog" }, { status: 500 });
  }
}

// Creating API Endpoint to delete Blog
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
    }

    // Delete associated images if they exist
    if (blog.image) fs.unlink(`./public${blog.image}`, () => {});
    if (blog.authorImg) fs.unlink(`./public${blog.authorImg}`, () => {});

    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Blog Deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, msg: "Failed to delete blog" }, { status: 500 });
  }
}

