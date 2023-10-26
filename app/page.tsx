"use client";

import { useEffect } from "react";
import { getServerSession } from "next-auth/next";
import { GET } from "@/app/api/auth/[...nextauth]/route";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const getUserRepos = async () => {
      const repos = await fetch(`https://api.github.com/users/erikcr/repos`);
      console.log(repos);
    };

    getUserRepos();
  }, []);

  return (
    <div className="min-h-screen bg-red-100 flex flex-col">
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {user ? (
            <>
              <div className="flex items-center px-4">
                <div className="flex-shrink-0"></div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => signOut()}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <div className="mt-3 space-y-1">
              <button
                onClick={() => signIn("github")}
                className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                Sign in
              </button>
            </div>
          )}
          Editor
        </div>
      </aside>

      <main className="sm:ml-64">
        Editor pane
        {JSON.stringify(session)}
        {/* <EditorComp markdown={String(markdown.value)} /> */}
      </main>
    </div>
  );
}