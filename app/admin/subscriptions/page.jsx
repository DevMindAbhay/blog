"use client";
import SubsTableItem from "@/Components/AdminComponents/SubsTableItem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmails(response.data.emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to fetch emails.");
    }
  };

  const deleteEmail = async (mongoId) => {
    const confirmation = window.confirm("Are you sure you want to delete this email subscription?");
    if (!confirmation) return;

    try {
      const response = await axios.delete("/api/email", {
        params: { id: mongoId, confirm: true },
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        fetchEmails();
      } else {
        toast.error("Error deleting email");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("Request failed");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 pb-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Subscription</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-y-auto border border-gray-400 scrollbar-hide">
        <table className="w-full text-m text-gray-900">
          <thead className="text-xs text-left text-gray-900 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Email Subscription</th>
              <th scope="col" className="hidden sm:block px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item) => (
              <SubsTableItem
                key={item._id}
                mongoId={item._id}
                deleteEmail={deleteEmail}
                email={item.email}
                date={item.date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;