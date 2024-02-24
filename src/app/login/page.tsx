"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Login() {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event:any) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-24">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl text-black font-semibold mb-4">パスワードを入力してください</h2>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full p-2 text-white bg-blue-500 rounded"
        >
          ログイン
        </motion.button>
      </motion.div>
    </div>
  );
}
