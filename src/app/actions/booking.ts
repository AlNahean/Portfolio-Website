"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { startOfDay, endOfDay, parseISO } from "date-fns";

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  date: z.string().min(1, "Date is required"), // YYYY-MM-DD
  timeSlot: z.string().min(1, "Time slot is required"),
  notes: z.string().max(500).optional().nullable(),
});

export async function getBookedSlots(dateString: string) {
  try {
    const targetDate = parseISO(dateString);
    const bookings = await db.booking.findMany({
      where: {
        date: {
          gte: startOfDay(targetDate),
          lte: endOfDay(targetDate),
        },
      },
      select: {
        timeSlot: true,
      },
    });
    return { success: true, bookedSlots: bookings.map(b => b.timeSlot) };
  } catch (error) {
    console.error("Failed to fetch booked slots:", error);
    return { success: false, error: "Failed to fetch booked slots" };
  }
}

export async function createBooking(data: {
  name: string;
  email: string;
  date: string;
  timeSlot: string;
  notes?: string | null;
}) {
  const validated = bookingSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  const { name, email, date, timeSlot, notes } = validated.data;
  const parsedDate = parseISO(date);

  try {
    // Check if slot is already booked to prevent double-booking
    const existing = await db.booking.findFirst({
      where: {
        date: {
          gte: startOfDay(parsedDate),
          lte: endOfDay(parsedDate),
        },
        timeSlot,
      },
    });

    if (existing) {
      return { success: false, error: "This time slot has already been booked." };
    }

    const booking = await db.booking.create({
      data: {
        name,
        email,
        date: parsedDate,
        timeSlot,
        notes: notes || null,
      },
    });

    return { success: true, booking };
  } catch (error) {
    console.error("Booking creation error:", error);
    return { success: false, error: "Failed to create booking. Please try again." };
  }
}

export async function getAllBookings(otp?: string) {
  const adminOtp = process.env.ADMIN_OTP || "123456";
  if (!otp || otp !== adminOtp) {
    return { success: false, error: "Unauthorized access" };
  }
  try {
    const bookings = await db.booking.findMany({
      orderBy: [
        { date: "asc" },
        { timeSlot: "asc" },
      ],
    });
    return { success: true, bookings };
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return { success: false, error: "Failed to fetch bookings" };
  }
}

export async function verifyAdminOTP(otp: string) {
  const adminOtp = process.env.ADMIN_OTP || "123456";
  if (otp === adminOtp) {
    return { success: true };
  }
  return { success: false, error: "Incorrect passcode" };
}
