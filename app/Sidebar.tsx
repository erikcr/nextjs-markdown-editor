"use client";

import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

export function Sidebar() {
  const [newFileName, setNewFileName] = useState("");
  const [fileNames, setFileNames] = useState<Array<string>>([]);
  const [activeFile, setActiveFile] = useState("");

  useEffect(() => {
    setFileNames(JSON.parse(localStorage.getItem("file-names")));
    setActiveFile(JSON.parse(localStorage.getItem("active-file")));
  }, []);

  const addNewFile = () => {
    const newFiles = [...fileNames, newFileName];
    setFileNames(newFiles);
    setActiveFile(newFileName);
    setNewFileName("");
    localStorage.setItem("file-names", JSON.stringify(newFiles));
  };

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 w-64 h-screen bg-gray-100 transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="px-2 tracki uppercase dark:text-gray-400">
        <h2 className="grow text-sm font-semibold">Files</h2>
      </div>

      <div className="flex px-2 w-60">
        <input
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          // onKeyDownHandler={ e => ()};
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              addNewFile();
            }
          }}
          className="grow"
          placeholder="New file name..."
        ></input>
        <PlusIcon
          onClick={() => addNewFile()}
          className="shrink h-6 w-6 text-blue-500"
        />
      </div>

      <div className="flex flex-col space-y-1">
        {fileNames.map((item) => (
          <p
            className={"px-2 " + (activeFile === item ? "bg-gray-400" : "")}
            onClick={() => {
              setActiveFile(item);
              localStorage.setItem("active-file", JSON.stringify(item));
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </aside>
  );
}
