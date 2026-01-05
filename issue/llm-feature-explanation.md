### `llm-feature-explanation.md`

# Feature: Serving Raw Markdown Content via an API Route

This document explains the recent implementation that allows you to access the raw markdown content of your documentation pages through a special URL.

## What Was Implemented?

We introduced two key changes to the project:

1.  **A New API Endpoint (`/llm`)**:
    We created a dynamic Next.js API route at `src/app/llm/[[...slug]]/route.ts`. This route's job is to:

    - Receive a request with a "slug" (the parts of the URL that identify a page).
    - Use the `fumadocs-core` loader (`source`) to find the corresponding documentation page.
    - Extract the raw, unprocessed markdown content from the page's data (`page.data.content`).
    - Return this raw markdown as a plain text response.

2.  **A URL Rewrite Rule (`next.config.ts`)**:
    We added a `rewrites` function to the `next.config.ts` file. This tells the Next.js server:
    > "When you receive a request for a URL that looks like `/docs/some-page.md`, don't try to render it as a normal page. Instead, secretly pass that request over to our `/llm/some-page` API endpoint."

This process is completely transparent to the user (or the machine) making the request.

## Why Is This Useful?

Serving raw markdown content directly is incredibly useful for several reasons, especially for machine consumption:

- **AI and Large Language Models (LLMs)**: This was the primary goal. LLMs can process and "understand" structured, plain text like markdown far more effectively than they can parse rendered HTML with all its CSS and JavaScript. This makes your documentation "LLM-friendly."

- **Content Syndication**: Other applications, blogs, or services can easily fetch the raw content of your articles to display them elsewhere, without needing to scrape your website's HTML.

- **"View Source" Functionality**: You could easily add a "View Raw Markdown" button to your documentation pages that links to the `.md` version of the current page, allowing users to see the source.

- **Debugging**: It provides a quick and easy way to inspect the exact markdown content that is being fed into the rendering pipeline, which can be helpful for debugging formatting or content issues.

## Example in Action

Let's walk through what happens when you request the markdown for the "Introduction" page.

1.  **You Make a Request**: You (or a program) navigate to the URL:

    ```
    http://localhost:3000/docs/introduction.md
    ```

2.  **Next.js Rewrites the URL**: The Next.js server sees that the URL matches the `source: "/docs/:path*.md"` pattern in `next.config.ts`. It internally changes the destination of the request to:

    ```
    http://localhost:3000/llm/introduction
    ```

    _This happens on the server; the URL in your browser's address bar does not change._

3.  **The API Route Handles the Request**: The API route at `src/app/llm/[[...slug]]/route.ts` now runs.

    - It receives the slug `['introduction']`.
    - It calls `source.getPage(['introduction'])` to load the data for the `introduction.mdx` file.

4.  **The Route Sends the Response**:

    - The route accesses the raw markdown content from the `page.data.content` property.
    - It creates a new `NextResponse` containing this raw text and sets the `Content-Type` header to `text/markdown`.

5.  **You See the Result**: Your browser receives and displays the plain text content of the `content/docs/introduction.mdx` file, which looks like this:

    ```markdown
    ---
    title: Introduction
    description: Welcome to your new documentation!
    ---

    ## Hello, World!

    This is your first documentation page, built with Fumadocs and styled with Shadcn UI.

    Here is a button from your Shadcn UI library:

    <Button>Click Me</Button>
    ```

This setup provides a robust and clean way to separate your rendered documentation from its raw source, making your content more flexible and accessible for a variety of use cases.
