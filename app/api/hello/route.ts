import { NextRequest, NextResponse } from "next/server";
import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';
import { paginateRest } from '@octokit/plugin-paginate-rest';
import { retry } from '@octokit/plugin-retry';
import { throttling } from '@octokit/plugin-throttling';

/**
* Represents a file or directory in the GitHub repository.
*/
interface GitHubFile {
    name: string;
    type: 'file' | 'dir';
    path: string;
}

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

/**
 * Handler function for the API endpoint.
 *
 * @param req - The Next.js API request object.
 */
export async function GET(req: NextRequest) {
    const response = await octokit.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path: PATH,
    });

    const files: object = response.data.map((file: any) => ({
        name: file.name,
        type: file.type === 'file' ? 'file' : 'dir',
        path: file.path
    }));

    const projectTree = {};
    const fileTree = {};

    for (const file of files) {
        const pathSegments = file.path.split('/');
        let currentLevel = fileTree;

        for (const segment of pathSegments) {
            if (!(segment in currentLevel)) {
                currentLevel[segment] = {};
            }
            currentLevel = currentLevel[segment];
        }

        currentLevel['type'] = file.type;
    }

    return NextResponse.json(fileTree);

    // Handle different HTTP methods
    if (req.method === 'GET') {
        return NextResponse.json({
            status: 200,
            message: fileTree
        })
    } else {
        // res.status(405).json({ error: 'Method Not Allowed' });
    }
}