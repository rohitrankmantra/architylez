"use client";

import { motion } from "framer-motion";
import { Package, Folder, FileText, Users, BarChart } from "lucide-react";

export default function AdminPage() {
  const stats = [
    { icon: <Package size={28} />, label: "Products", value: 120 },
    { icon: <Folder size={28} />, label: "Catalogues", value: 15 },
    { icon: <FileText size={28} />, label: "Blogs", value: 8 },
    { icon: <Users size={28} />, label: "Users", value: 340 },
    { icon: <BarChart size={28} />, label: "Reports", value: 12 },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, Admin 👋</h2>
        <p className="text-gray-500">Here’s an overview of your system</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 border border-gray-100"
          >
            <div className="p-4 bg-indigo-100 text-indigo-600 rounded-xl">
              {stat.icon}
            </div>
            <div>
              <p className="text-lg font-semibold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity / Placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
      >
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-3 text-gray-700">
          <li>✔ Added 3 new products</li>
          <li>✔ Updated Catalogue “Wall Collection”</li>
          <li>✔ Approved 2 new blog posts</li>
          <li>✔ Generated sales report</li>
        </ul>
      </motion.div>
    </div>
  );
}
