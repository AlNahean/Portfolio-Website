"use client";

import * as React from "react";
import { format, addMonths, subMonths, isBefore, isSameDay, startOfDay } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  ArrowLeft,
  CalendarDays
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getBookedSlots, createBooking } from "@/app/actions/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Standard available daily slots
const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", 
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
  "04:00 PM", "04:30 PM"
];

interface BookingCalendarProps {
  embedded?: boolean;
  onSuccess?: () => void;
}

export function BookingCalendar({ embedded = false, onSuccess }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = React.useState<string | undefined>(undefined);
  const [bookedSlots, setBookedSlots] = React.useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = React.useState(false);
  const [step, setStep] = React.useState<"select" | "details" | "success">("select");

  // Form state
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  // Fetch booked slots whenever date changes
  React.useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }

    const fetchSlots = async () => {
      setLoadingSlots(true);
      const dateString = format(selectedDate, "yyyy-MM-dd");
      const res = await getBookedSlots(dateString);
      if (res.success && res.bookedSlots) {
        setBookedSlots(res.bookedSlots);
      } else {
        setBookedSlots([]);
      }
      setLoadingSlots(false);
    };

    fetchSlots();
  }, [selectedDate]);

  // Disable weekends & past days
  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    // Disable past days
    if (isBefore(date, today)) return true;
    // Disable weekends (Saturday = 6, Sunday = 0)
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(undefined);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) return;

    setSubmitting(true);
    const dateString = format(selectedDate, "yyyy-MM-dd");

    const res = await createBooking({
      name,
      email,
      date: dateString,
      timeSlot: selectedSlot,
      notes,
    });

    setSubmitting(false);

    if (res.success) {
      setStep("success");
      toast.success("Call booked successfully!");
      if (onSuccess) {
        onSuccess();
      }
    } else {
      toast.error(res.error || "Failed to book call.");
    }
  };

  // Format timezone offset (e.g. GMT+6)
  const timeZoneName = React.useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return "UTC";
    }
  }, []);

  return (
    <div className={cn(
      "w-full bg-card border border-border text-card-foreground shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl",
      embedded ? "max-w-4xl" : "max-w-4xl mx-auto my-8"
    )}>
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-border min-h-[580px]">
        
        {/* Left Side: Event Details */}
        <div className="col-span-1 md:col-span-4 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative size-12 rounded-full overflow-hidden border border-border bg-muted flex items-center justify-center">
                <CalendarDays className="size-6 text-purple-500 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Nahean Fardous</h4>
                <p className="text-xs text-muted-foreground">Portfolio Owner</p>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                30 Min Intro Call
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Let's connect, talk about potential projects, collaboration, or just say hello!
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-2.5 text-sm text-muted-foreground">
                <Clock className="size-4 text-purple-500 shrink-0" />
                <span className="font-medium text-foreground">30 minutes</span>
              </div>
              <div className="flex items-center space-x-2.5 text-sm text-muted-foreground">
                <Video className="size-4 text-purple-500 shrink-0" />
                <span className="font-medium text-foreground">Google Meet (Auto-generated)</span>
              </div>
              <div className="flex items-center space-x-2.5 text-sm text-muted-foreground text-ellipsis overflow-hidden">
                <Globe className="size-4 text-purple-500 shrink-0" />
                <span className="font-medium text-foreground truncate">{timeZoneName}</span>
              </div>
            </div>
          </div>

          {selectedDate && selectedSlot && step !== "success" && (
            <div className="pt-6 border-t border-border mt-6">
              <p className="text-xs text-muted-foreground">SELECTED DATE & TIME</p>
              <div className="mt-2 flex items-center space-x-2 text-sm font-semibold text-purple-500">
                <CalendarIcon className="size-4" />
                <span>
                  {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedSlot}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Step Contents */}
        <div className="col-span-1 md:col-span-8 flex flex-col bg-background/50">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Select Date and Time */}
            {step === "select" && (
              <motion.div
                key="select-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col md:flex-row flex-1"
              >
                {/* Calendar Panel */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center items-center">
                  <div className="w-full max-w-sm">
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      Select Date
                    </h2>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={disabledDays}
                      className="rounded-2xl border border-border bg-card p-3 shadow-md w-full"
                    />
                  </div>
                </div>

                {/* Slots Panel */}
                <div className={cn(
                  "w-full md:w-[260px] border-t md:border-t-0 md:border-l border-border p-6 md:p-8 flex flex-col justify-between max-h-[580px]",
                  !selectedDate && "bg-muted/10 opacity-50 pointer-events-none"
                )}>
                  <div className="flex-1 flex flex-col min-h-0">
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 shrink-0">
                      {selectedDate ? format(selectedDate, "EEEE, d MMM") : "Select Date first"}
                    </h2>

                    {selectedDate ? (
                      loadingSlots ? (
                        <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-12">
                          <div className="size-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs text-muted-foreground">Checking slots...</span>
                        </div>
                      ) : (
                        <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-1 max-h-[380px]">
                          {TIME_SLOTS.map((slot) => {
                            const isBooked = bookedSlots.includes(slot);
                            const isSelected = selectedSlot === slot;
                            return (
                              <button
                                key={slot}
                                disabled={isBooked}
                                onClick={() => setSelectedSlot(slot)}
                                className={cn(
                                  "w-full py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-between",
                                  isBooked 
                                    ? "bg-muted/40 border-muted text-muted-foreground/30 cursor-not-allowed"
                                    : isSelected
                                      ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/20"
                                      : "bg-card border-border hover:border-purple-500 hover:bg-purple-500/5 text-foreground cursor-pointer"
                                )}
                              >
                                <span>{slot}</span>
                                {isSelected && <span className="text-[10px] uppercase font-bold tracking-wider">Selected</span>}
                              </button>
                            );
                          })}
                        </div>
                      )
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                        <CalendarIcon className="size-8 text-muted-foreground/30 mb-2" />
                        <p className="text-xs text-muted-foreground">Choose a date to see available slots</p>
                      </div>
                    )}
                  </div>

                  {selectedDate && selectedSlot && (
                    <Button 
                      className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/20 py-5 transition-colors duration-200"
                      onClick={() => setStep("details")}
                    >
                      Next Step
                    </Button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Fill Details Form */}
            {step === "details" && (
              <motion.div
                key="details-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-6 md:p-8 flex flex-col h-full justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setStep("select")}
                      className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center space-x-1 cursor-pointer"
                    >
                      <ArrowLeft className="size-3.5" />
                      <span>Back to calendar</span>
                    </button>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-purple-500/10 text-purple-500 rounded-full">
                      Step 2 of 2
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-foreground">Confirm Meeting Details</h2>
                    <p className="text-xs text-muted-foreground">
                      Please enter your name and email to finish scheduling the introductory call.
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          placeholder="Jane Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-11 rounded-xl bg-card border-border focus-visible:ring-purple-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Your Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="jane@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-11 rounded-xl bg-card border-border focus-visible:ring-purple-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm font-medium">Additional Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Share anything that will help prepare for our meeting."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={4}
                          className="rounded-xl bg-card border-border focus-visible:ring-purple-500 resize-none"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center space-x-3">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setStep("select")}
                        className="flex-1 h-11 rounded-xl"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="flex-[2] h-11 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/20"
                      >
                        {submitting ? (
                          <div className="flex items-center space-x-2 justify-center">
                            <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Scheduling...</span>
                          </div>
                        ) : (
                          <span>Schedule Meeting</span>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Step 3: Success Screen */}
            {step === "success" && (
              <motion.div
                key="success-step"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                className="p-6 md:p-8 flex flex-col items-center justify-center text-center flex-1 space-y-6"
              >
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <CheckCircle className="size-16 text-emerald-500 fill-emerald-500/10" />
                  </motion.div>
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>

                <div className="space-y-2 max-w-md">
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">
                    Meeting Scheduled!
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    A calendar invitation has been sent to your email address. Looking forward to our chat!
                  </p>
                </div>

                <div className="w-full max-w-sm bg-muted/40 border border-border/60 rounded-2xl p-4 text-left space-y-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Meeting Summary
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-semibold text-foreground">30 Min Intro Call</span>
                    </div>
                    <div className="flex justify-between items-start text-sm">
                      <span className="text-muted-foreground">Date/Time:</span>
                      <span className="font-semibold text-foreground text-right">
                        {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                        <br />
                        <span className="text-xs font-medium text-purple-500">{selectedSlot}</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Host:</span>
                      <span className="font-semibold text-foreground">Nahean Fardous</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    // Reset component state
                    setSelectedDate(undefined);
                    setSelectedSlot(undefined);
                    setName("");
                    setEmail("");
                    setNotes("");
                    setStep("select");
                  }}
                  className="px-8 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/20"
                >
                  Book Another Call
                </Button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
