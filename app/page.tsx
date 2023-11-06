import { Suspense } from "react";
import { read } from "to-vfile";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import remarkFrontmatter from "remark-frontmatter";
import { ForwardRefEditor } from "./ForwardRefEditor";
import { Sidebar } from "./Sidebar";

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
      <Sidebar />

      <main className="sm:ml-64">
        <Suspense fallback={null}>
          <ForwardRefEditor markdown={String(markdown.value)} />
        </Suspense>
      </main>
    </div>
  );
}
