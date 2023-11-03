import { App as OctokitApp } from "octokit";
import {
  Endpoints,
  GetResponseDataTypeFromEndpointMethod,
} from "@octokit/types";

type RepoContentsResponse =
  Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"];
const OWNER = "erikcr";
const REPO = "erikcr-editor";
const PATH = "";

const octokitApp = new OctokitApp({
  appId: process.env.OCTOKIT_APP_ID,
  // Next.js .env error; must format private key and modify with replace()
  privateKey: process.env.OCTOKIT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  
});

async function getDirContents(owner: string, repo: string, path: string) {
  let currentPath = "/";
  let filePaths = {};

  let res: RepoContentsResponse;

  const octokit = await octokitApp.getInstallationOctokit(
    process.env.OCTOKIT_INSTALLATION_ID
  );

  try {
    res = await octokit.rest.repos.getContent({
      owner: OWNER,
      repo: REPO,
      path: PATH,
    });
  } catch (error) {
    throw error;
  }

  if (res.status != 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  let data: RepoContentsResponse["data"] = Object(res.data);
  data.map((item) => {
    filePaths = {
      ...filePaths,
      [currentPath]: item.name,
    };
  });

  return filePaths;
}

export default async function GhTest() {
  // let filePaths = {};

  // let res: RepoContentsResponse;
  // let data: RepoContentsResponse["data"] = [];

  const data = await getDirContents("erikcr", "erikcr-editor", "/");

  return (
    <>
      REST <br />
      {/* {JSON.stringify(data)} */}
      {data.length ? (
        data.map((item) => (
          <div>
            {item.name}: {item.type}
          </div>
        ))
      ) : (
        <div>No files to display</div>
      )}
    </>
  );
}
