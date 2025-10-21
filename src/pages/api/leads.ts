import { Client } from '@notionhq/client';
import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints';
import type { APIRoute } from 'astro';

export const prerender = false;

const buildClient = () => {
  const secret = import.meta.env.NOTION_SECRET;
  if (!secret) return null;
  return new Client({ auth: secret });
};

type LeadPayload = {
  email?: unknown;
  painpoint?: unknown;
};

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return new Response(JSON.stringify({ error: 'Expected JSON request body.' }), {
      status: 415,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let rawBody = '';
  try {
    const buffer = await request.arrayBuffer();
    rawBody = new TextDecoder('utf-8').decode(buffer).trim();
  } catch {
    return new Response(JSON.stringify({ error: 'Unable to read request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!rawBody) {
    return new Response(JSON.stringify({ error: 'Request body cannot be empty.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let payload: LeadPayload;
  try {
    payload = JSON.parse(rawBody) as LeadPayload;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const painpoint = typeof payload.painpoint === 'string' ? payload.painpoint.trim() : '';

  if (!email || !painpoint) {
    return new Response(JSON.stringify({ error: 'Email and painpoint are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const databaseId = import.meta.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    return new Response(JSON.stringify({ error: 'Notion database ID is missing on the server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const client = buildClient();
  if (!client) {
    return new Response(JSON.stringify({ error: 'Notion secret is missing on the server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const properties: CreatePageParameters['properties'] = {
    email: {
      title: [
        {
          text: { content: email },
        },
      ],
    },
    painpoint: {
      rich_text: [
        {
          text: { content: painpoint },
        },
      ],
    },
  };

  try {
    const page = await client.pages.create({
      parent: { database_id: databaseId },
      properties,
    });

    return new Response(JSON.stringify({ ok: true, id: page.id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message =
      (error as { body?: { message?: string } }).body?.message ?? 'Unexpected error';

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET: APIRoute = () =>
  new Response(null, {
    status: 405,
    headers: { Allow: 'POST' },
  });

export const HEAD = GET;
