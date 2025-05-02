import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await ConnectDB(); 

        // Use request.json() instead of request.formData()
        const { email } = await request.json();

        // Validate email input
        if (!email || !email.includes("@")) {
            return NextResponse.json({ success: false, msg: "Invalid email address" }, { status: 400 });
        }

        // Save email to the database
        await EmailModel.create({ email });

        return NextResponse.json({ success: true, msg: "Email Subscribed" });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request){
    const emails = await EmailModel.find({});
    return NextResponse.json({emails});
}
    
export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({success:true,msg:"Email Deleted"})
}