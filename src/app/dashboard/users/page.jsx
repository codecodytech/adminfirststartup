"use client";

import { useState, useEffect } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // avoid SSR issues
    fetch("https://api2.firststartup.in/admin/getAllUser")
      .then((res) => res.json())
      .then((data) => {
        if (data.responseCode === 200) setUsers(data.responseResult);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">All Users</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Mobile</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">User Type</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Verified</th>
                <th className="py-3 px-4 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.mobileNumber}</td>
                  <td className="py-3 px-4">{user.address}</td>
                  <td className="py-3 px-4">{user.userType}</td>
                  <td className="py-3 px-4">{user.status}</td>
                  <td className="py-3 px-4">
                    {user.isVerified ? "Yes" : "No"}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(user.createdAt).toLocaleDateString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
