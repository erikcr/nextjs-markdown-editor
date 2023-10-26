"use client";

import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { headingsPlugin } from "@mdxeditor/editor/plugins/headings";
import { listsPlugin } from "@mdxeditor/editor/plugins/lists";
import { quotePlugin } from "@mdxeditor/editor/plugins/quote";
import { thematicBreakPlugin } from "@mdxeditor/editor/plugins/thematic-break";
import { UndoRedo } from "@mdxeditor/editor/plugins/toolbar/components/UndoRedo";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles";
import { InsertFrontmatter } from "@mdxeditor/editor/plugins/toolbar/components/InsertFrontmatter";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import { frontmatterPlugin } from "@mdxeditor/editor/plugins/frontmatter";

interface EditorProps {
  markdown: string;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const Editor = ({ markdown, editorRef }: EditorProps) => {
  return (
    <div className="m-4">
      <div className="border-1 border-solid border-black rounded-md">
        <MDXEditor
          className="bg-white rounded-md"
          ref={editorRef}
          markdown={markdown}
          plugins={[
            frontmatterPlugin(),
            headingsPlugin(),
            listsPlugin(),
            thematicBreakPlugin(),
            quotePlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <BoldItalicUnderlineToggles />
                  <InsertFrontmatter />
                </>
              ),
            }),
          ]}
        />
      </div>
    </div>
  );
};

export default Editor;
