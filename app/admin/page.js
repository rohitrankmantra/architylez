// app/admin/page.js
"use client";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-yellow-400">Admin Dashboard</h1>
      <p className="mt-2 text-gray-300">
        You are now logged in. Use the sidebar to manage products and catalogues.
      </p>
    </div>
  );
}
