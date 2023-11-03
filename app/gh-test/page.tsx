import { Octokit } from "@octokit/rest";
const { createAppAuth } = require("@octokit/auth-app");

import {
  Endpoints,
  GetResponseDataTypeFromEndpointMethod,
} from "@octokit/types";

type RepoContentsResponse =
  Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"];
const OWNER = "erikcr";
const REPO = "erikcr-editor";
const PATH = "";

const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env.OCTOKIT_APP_ID,
    // Next.js .env error; must format private key and modify with replace()
    privateKey: process.env.OCTOKIT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    installationId: process.env.OCTOKIT_INSTALLATION_ID,
  },
});

export default async function GhTest() {
  const repoContents = await octokit.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: PATH,
  });

  const projectTree = {};
  const fileTree = {};

  for (const item of repoContents.data) {
    if (item.type === "dir") {
      const subContents = await octokit.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path: item.path,
      });

      projectTree[item.path] = subContents.data;

      // Add to file tree
      fileTree[item.path] = {};
      for (const subItem of subContents.data) {
        if (subItem.type === "file") {
          fileTree[item.path][subItem.name] = undefined;
        } else {
          fileTree[item.path][subItem.name] = {};
        }
      }
    } else {
      const fileName = item.path.split("/").pop();

      projectTree[item.path] = item;

      // Add to file tree
      const dirname = item.path.split("/").slice(0, -1).join("/");
      if (!fileTree[dirname]) {
        fileTree[dirname] = {};
      }
      fileTree[dirname][item.name] = undefined;
    }
  }

  return (
    <>
      REST <br />
      {/* {JSON.stringify(repoContents.data)} */}
      {JSON.stringify(fileTree)}
      {/* {Object.entries(projectTree).map(([key, value]) => ({}))} */}
    </>
  );
}
