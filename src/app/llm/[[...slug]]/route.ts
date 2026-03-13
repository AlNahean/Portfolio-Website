import { notFound } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

import { source, studySource, blogSource, publicationSource, projectSource, caseStudySource, reflectionSource, authorSource } from "@/lib/source";

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  // Await the params promise to resolve
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];

  // Use the resolved slug array
  let page: any = source.getPage(slug);
  if (!page) {
    page = studySource.getPage(slug);
  }
  if (!page) {
    page = blogSource.getPage(slug);
  }
  if (!page) {
    page = publicationSource.getPage(slug);
  }
  if (!page) {
    page = projectSource.getPage(slug);
  }
  if (!page) {
    page = caseStudySource.getPage(slug);
  }
  if (!page) {
    page = reflectionSource.getPage(slug);
  }
  if (!page) {
    page = authorSource.getPage(slug);
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
  const blogParams = blogSource.generateParams();
  const publicationParams = publicationSource.generateParams();
  const projectParams = projectSource.generateParams();
  const caseStudyParams = caseStudySource.generateParams();
  const reflectionParams = reflectionSource.generateParams();
  const authorParams = authorSource.generateParams();

  return [...docsParams, ...studyParams, ...blogParams, ...publicationParams, ...projectParams, ...caseStudyParams, ...reflectionParams, ...authorParams];
}

