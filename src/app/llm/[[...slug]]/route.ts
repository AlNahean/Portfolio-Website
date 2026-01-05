import { notFound } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

import { source, studySource } from "@/lib/source";

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  // Await the params promise to resolve
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];

  // Use the resolved slug array
  let page = source.getPage(slug);
  if (!page) {
    page = studySource.getPage(slug);
  }

  if (!page) {
    notFound();
  }

  // Use page.data.content to get the raw markdown
  const rawContent = page.data.content;

  if (typeof rawContent !== "string") {
    // Handle cases where content might not be a string, although it should be.
    return new NextResponse("Content not available in raw format.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return new NextResponse(rawContent, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}

export function generateStaticParams() {
  // This function remains the same
  const docsParams = source.generateParams();
  const studyParams = studySource.generateParams();

  return [...docsParams, ...studyParams];
}
