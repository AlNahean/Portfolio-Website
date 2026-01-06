"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema definition
const entrySchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  message: z.string().min(1, "Message is required").max(200),
  // Allow null, undefined, or a string (we check if it's a valid URL string later if needed, or just trust it's a string)
  imageUrl: z.string().optional().nullable(),
});

export async function createGuestbookEntry(formData: FormData) {
  // 1. Extract Data
  const rawImageUrl = formData.get("imageUrl");
  
  const rawData = {
    name: formData.get("name"),
    message: formData.get("message"),
    // Treat empty strings as null
    imageUrl: typeof rawImageUrl === 'string' && rawImageUrl.length > 0 ? rawImageUrl : null,
  };

  // 2. Validate
  const validated = entrySchema.safeParse(rawData);

  if (!validated.success) {
    // Log the actual error to the server console for debugging
    console.error("Guestbook Validation Error:", validated.error.flatten());
    return { error: "Invalid input data. Name and Message are required." };
  }

  // 3. Save to Database
  try {
    await db.guestbookEntry.create({
      data: {
        name: validated.data.name,
        message: validated.data.message,
        imageUrl: validated.data.imageUrl,
      },
    });

    revalidatePath("/guestbook");
    return { success: true };
  } catch (error) {
    console.error("Guestbook Database Error:", error);
    return { error: "Failed to post note. Please try again." };
  }
}