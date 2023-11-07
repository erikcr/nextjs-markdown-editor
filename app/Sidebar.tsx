"use client";

import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

export function Sidebar() {
  const [newFileName, setNewFileName] = useState("");
  const [fileNames, setFileNames] = useState<Array<string>>([]);
  const [activeFile, setActiveFile] = useState("");

  useEffect(() => {
    const files = JSON.parse(localStorage.getItem("file-names"));
    if (files) {
      setActiveFile(files[0]);
      setFileNames(files);
    }
  }, []);

  useEffect(() => {
    if (fileNames.length != 0) {
      localStorage.setItem("file-names", JSON.stringify(fileNames));
    }
  }, [fileNames]);

  const addNewFile = () => {
    setFileNames((prevState) => [...prevState, newFileName]);
    setActiveFile(newFileName);
    setNewFileName("");
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

      <div className="px-2 flex flex-col space-y-1">
        {fileNames.map((item) => (
          <p className={"bg-gray-400"}>{item}</p>
        ))}
      </div>
    </aside>
  );
}
