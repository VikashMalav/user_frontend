import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
export default function UserForm({ formData, setFormData, displayUser }) {
  let baseUrl =import.meta.env.VITE_BASE_URL
  let handleChange = (e) => {
   
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(formData)
       
  }



  let insertUser = async (formData) => {
    console.log("chlb rhaa h kya")
    if (!formData._id) {
     
      let result = await axios.post(`${baseUrl}/api/create`, formData);
      return result;
    }
    let updateResult = await axios.put(`${baseUrl}/api/update/${formData._id}`, formData);
    console.log("updateResult ->>", updateResult)
    return updateResult;
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }
    console.log("Form submitted:", formData);
    try {
      let user = await insertUser(formData)
      console.log(user.data.user)
      if (formData._id) {
        toast.success("User Updated Successfully!")
      } else {
        toast.success("User Created Successfully!")
      }



      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      displayUser();

    }

    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      <h2 className="text-2xl font-semibold mb-6">Add User</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            value={formData.name}
            name="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            onChange={(e) => handleChange(e)}
            value={formData.email}
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            value={formData.phone}
            name="phone"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Message</label>
          <textarea
            name="message"
            onChange={(e) => handleChange(e)}
            value={formData.message}
            rows="4"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your message"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {formData._id ? "Update User" : "Add User"}
        </button>
      </form>
      <ToastContainer closeOnClick />
    </div>
  );
}
