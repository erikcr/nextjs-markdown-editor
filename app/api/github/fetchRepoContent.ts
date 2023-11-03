import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';
import { paginateRest } from '@octokit/plugin-paginate-rest';
import { retry } from '@octokit/plugin-retry';
import { throttling } from '@octokit/plugin-throttling';

const OWNER = "erikcr";
const REPO = "erikcr-editor";
const PATH = "";

const MyOctokit = Octokit.plugin(paginateRest).plugin(retry).plugin(throttling);

async function fetchRepoContent(owner: string, repo: string, token: string) {
  const octokit = new MyOctokit({
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.OCTOKIT_APP_ID,
      // Next.js .env error; must format private key and modify with replace()
      privateKey: process.env.OCTOKIT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      installationId: process.env.OCTOKIT_INSTALLATION_ID,
    },
  });

  const content = await octokit.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: PATH,
  });

  return content;
}

export default fetchRepoContent;