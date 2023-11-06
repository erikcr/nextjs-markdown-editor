import { Suspense } from "react";
import { read } from "to-vfile";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import remarkFrontmatter from "remark-frontmatter";
import { ForwardRefEditor } from "./ForwardRefEditor";

export default async function Home() {
  const markdown = await remark()
    .use(remarkMdx)
    .use(remarkFrontmatter, ["yaml", "toml"])
    .process(
      await read(
        "content/commonalities-of-five-solutions-engineer-consultant-roles.md"
      )
    );

  return (
    <div className="flex flex-col">
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 w-64 h-screen bg-gray-100 transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      ></aside>

      <main className="sm:ml-64">
        <Suspense fallback={null}>
          <ForwardRefEditor markdown={String(markdown.value)} />
        </Suspense>
      </main>
    </div>
  );
}
