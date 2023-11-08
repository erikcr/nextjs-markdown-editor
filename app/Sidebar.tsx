"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";

export function Sidebar() {
  const router = useRouter();

  const [fileNames, setFileNames] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState("");

  useEffect(() => {
    setFileNames(JSON.parse(localStorage.getItem("file-names") || "[]"));

    setActiveFile(localStorage.getItem("active-file"));
  }, []);

  const addNewFile = () => {
    if (newFileName != "") {
      const newFiles = [...fileNames, newFileName];
      setFileNames(newFiles);
      setActiveFile(newFileName);
      setNewFileName("");
      localStorage.setItem("file-names", JSON.stringify(newFiles));
      localStorage.setItem("active-file", newFileName);
      localStorage.setItem(newFileName, `# ${newFileName}`);
      router.push(`/?f=${newFileName}`);
    }
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
        {fileNames &&
          fileNames.map((item, index) => (
            <p
              key={index}
              className={"px-2 " + (activeFile === item ? "bg-gray-400" : "")}
              onClick={() => {
                setActiveFile(item);
                localStorage.setItem("active-file", JSON.stringify(item));
                router.push(`/?f=${item}`);
              }}
            >
              {item}
            </p>
          ))}
      </div>
    </aside>
  );
}
