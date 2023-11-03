import { NextRequest, NextResponse } from "next/server";
import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';
import { paginateRest } from '@octokit/plugin-paginate-rest';
import { retry } from '@octokit/plugin-retry';
import { throttling } from '@octokit/plugin-throttling';

const OWNER = "erikcr";
const REPO = "erikcr-editor";
const PATH = "";

const MyOctokit = Octokit.plugin(paginateRest).plugin(retry).plugin(throttling);

/**
 * Handler function for the API endpoint.
 *
 * @param req - The Next.js API request object.
 */
export function GET(req: NextRequest) {
    // Handle different HTTP methods
    if (req.method === 'GET') {
        return handleGetRequest(req);
    } else {
        // res.status(405).json({ error: 'Method Not Allowed' });
    }
}

/**
 * Handles the GET request for the API endpoint.
 *
 * @param req - The Next.js API request object.
 */
function handleGetRequest(req: NextRequest) {
    // Add your logic here to handle the GET request
    // Example: Return a JSON response
    return NextResponse.json({
        status: 200,
        message: 'API endpoint is working!'
    })
}