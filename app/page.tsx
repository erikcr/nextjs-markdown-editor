import dynamic from "next/dynamic";
import { Suspense } from "react";

// import markdown from "./a-journey-of-adventure-and-unconventional-job-hunting.mdx";
const markdown = "# Hello, Neptune!";

const EditorComp = dynamic(() => import("./EditorComponent"), { ssr: false });

export default async function Home() {
  return (
    <div className="min-h-screen bg-red-100 flex flex-col">
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          Editor
        </div>
      </aside>

      <main className="sm:ml-64 h-screen">
        <EditorComp markdown={markdown} />
      </main>
    </div>
  );
}
