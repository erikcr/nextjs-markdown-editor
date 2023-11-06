import { Suspense } from "react";
import { ForwardRefEditor } from "./ForwardRefEditor";

const markdown = `
# Hello world!

Hello [world](https://virtuoso.dev/)
`;

export default function Home() {
  return (
    <div className="flex flex-col">
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 w-64 h-screen bg-gray-100 transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      ></aside>

      <main className="sm:ml-64">
        <Suspense fallback={null}>
          <ForwardRefEditor markdown={markdown} />
        </Suspense>
      </main>
    </div>
  );
}
