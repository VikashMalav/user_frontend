import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
export default function UserTable({ users, setUsers, displayUser, formData, setFormData }) {

    let baseUrl = import.meta.env.VITE_BASE_URL;

    const handleDelete = async (id) => {
        try {
            let deletedUser = await axios.delete(`${baseUrl}/api/delete/${id}`);
            displayUser();
            if (deletedUser) {
                toast("User Deleted")
            }
        }
        catch (err) {
            console.log(err)
        }
    };

    const handleEdit = (user) => {
        setFormData({ ...user })

    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 w-full overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-6">User List</h2>
            <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th className="px-6 py-3">id</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Phone</th>
                        <th className="px-6 py-3">Message</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{user._id}</td>
                            <td className="px-6 py-4">{user.name.trim() || "N/A"}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.phone}</td>
                            <td className="px-6 py-4">{user.message}</td>
                            <td className="px-6 py-4 flex gap-2 justify-center">
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                                No users available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ToastContainer closeOnClick />
        </div>
    );
}
