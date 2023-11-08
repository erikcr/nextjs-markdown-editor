"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ForwardRefEditor } from "./ForwardRefEditor";
import { Sidebar } from "./Sidebar";

export default function Home() {
  let markdown = undefined;
  const searchParams = useSearchParams();

  const fileParam = searchParams.get("f");
  if (fileParam) {
    markdown = localStorage.getItem(fileParam);
    console.log(`markdown: ${markdown}`);
  }

  return (
    <div className="flex flex-col">
      <Sidebar />

      <main className="sm:ml-64">
        {markdown ? (
          <Suspense fallback={null}>
            <ForwardRefEditor markdown={String(markdown)} />
          </Suspense>
        ) : (
          <div className="flex justify-center align-center">
            <h1 className="">Create a new file to start editing.</h1>
          </div>
        )}
      </main>
    </div>
  );
}
