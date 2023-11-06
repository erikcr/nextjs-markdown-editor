"use client";
import { useEffect, useState } from "react";

export function Sidebar() {
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    const files = JSON.parse(localStorage.getItem("file-names"));
    if (files) {
      setFileNames(files);
    }
  }, []);

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 w-64 h-screen bg-gray-100 transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <h2 className="px-2 text-sm font-semibold tracki uppercase dark:text-gray-400">
        Files
      </h2>
      <div className="px-2 flex flex-col space-y-1">
        {fileNames.map((item) => (
          <p>{item}</p>
        ))}
      </div>
    </aside>
  );
}
