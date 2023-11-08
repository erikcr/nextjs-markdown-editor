"use client";

import type { ForwardedRef } from "react";
import {
  frontmatterPlugin,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  toolbarPlugin,
  thematicBreakPlugin,
  imagePlugin,
  tablePlugin,
  diffSourcePlugin,
  BoldItalicUnderlineToggles,
  InsertFrontmatter,
  InsertImage,
  InsertTable,
  CodeToggle,
  Separator,
  UndoRedo,
  DiffSourceToggleWrapper,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  const originalMarkdown = props.markdown;

  async function imageUploadHandler(image: File) {
    const formData = new FormData();
    formData.append("image", image);
    // send the file to your server and return
    // the URL of the uploaded image in the response
    const response = await fetch("/uploads/new", {
      method: "POST",
      body: formData,
    });
    const json = (await response.json()) as { url: string };
    return json.url;
  }

  return (
    <div className="h-screen">
      <MDXEditor
        className="h-full"
        plugins={[
          frontmatterPlugin(),
          headingsPlugin(),
          linkPlugin(),
          listsPlugin(),
          markdownShortcutPlugin(),
          thematicBreakPlugin(),
          quotePlugin(),
          imagePlugin({ imageUploadHandler }),
          tablePlugin(),
          diffSourcePlugin({
            diffMarkdown: originalMarkdown,
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <CodeToggle />
                  <Separator />
                  <InsertImage />
                  <InsertTable />
                  <Separator />
                  <InsertFrontmatter />
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
        ]}
        {...props}
        ref={editorRef}
      />
    </div>
  );
}
