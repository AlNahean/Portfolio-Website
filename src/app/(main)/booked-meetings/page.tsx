"use client";

import React from "react";
import { format, isBefore, startOfDay } from "date-fns";
import { 
  Calendar, 
  Mail, 
  Clock, 
  Search, 
  Video, 
  MessageSquare, 
  CalendarDays,
  CalendarCheck,
  ChevronRight,
  RefreshCw,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllBookings, verifyAdminOTP } from "@/app/actions/booking";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

export default function BookedMeetingsPage() {
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterType, setFilterType] = React.useState<"all" | "upcoming" | "past">("all");
  const [selectedMeeting, setSelectedMeeting] = React.useState<any | null>(null);

  // OTP Auth State
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState("");
  const [otpError, setOtpError] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [storedOtp, setStoredOtp] = React.useState<string>("");
  const [hasMounted, setHasMounted] = React.useState(false);

  const fetchMeetings = React.useCallback(async (otpToUse: string) => {
    setLoading(true);
    const res = await getAllBookings(otpToUse);
    if (res.success && res.bookings) {
      setBookings(res.bookings);
      setIsAuthenticated(true);
      setStoredOtp(otpToUse);
      sessionStorage.setItem("admin_otp", otpToUse);
      setOtpError("");
    } else {
      setIsAuthenticated(false);
      setOtpError(res.error || "Authentication failed.");
      sessionStorage.removeItem("admin_otp");
    }
    setLoading(false);
  }, []);

  // Check sessionStorage on mount
  React.useEffect(() => {
    setHasMounted(true);
    const savedOtp = sessionStorage.getItem("admin_otp");
    if (savedOtp) {
      fetchMeetings(savedOtp);
    } else {
      setLoading(false);
    }
  }, [fetchMeetings]);

  const handleVerifyOTP = async (value: string) => {
    setOtpValue(value);
    if (value.length !== 6) return;

    setVerifying(true);
    setOtpError("");
    
    const res = await verifyAdminOTP(value);
    if (res.success) {
      await fetchMeetings(value);
    } else {
      setOtpError(res.error || "Incorrect passcode");
    }
    setVerifying(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_otp");
    setIsAuthenticated(false);
    setBookings([]);
    setOtpValue("");
    setStoredOtp("");
  };

  const filteredBookings = React.useMemo(() => {
    const today = startOfDay(new Date());
    return bookings.filter(b => {
      const matchSearch = 
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.notes && b.notes.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (!matchSearch) return false;

      const meetingDate = new Date(b.date);
      if (filterType === "upcoming") {
        return !isBefore(meetingDate, today);
      }
      if (filterType === "past") {
        return isBefore(meetingDate, today);
      }
      return true;
    });
  }, [bookings, searchTerm, filterType]);

  const upcomingCount = React.useMemo(() => {
    const today = startOfDay(new Date());
    return bookings.filter(b => !isBefore(new Date(b.date), today)).length;
  }, [bookings]);

  // SSR / Mount Guard to prevent hydration mismatch
  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
        <div className="size-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground mt-4">Loading dashboard...</span>
      </div>
    );
  }

  // Loading Screen for Initial Check
  if (loading && !isAuthenticated && (typeof window !== "undefined" && sessionStorage.getItem("admin_otp"))) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
        <div className="size-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground mt-4">Authenticating session...</span>
      </div>
    );
  }

  // OTP Verification Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col justify-center items-center py-20 px-4">
        {/* Grid Background Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-card border border-border/80 backdrop-blur-xl rounded-3xl p-8 text-center space-y-6 shadow-2xl relative z-10"
        >
          <div className="mx-auto size-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Lock className="size-5 text-purple-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Admin Access</h2>
            <p className="text-sm text-muted-foreground">
              Please enter the 6-digit OTP passcode to view booked meetings.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <InputOTP 
              maxLength={6} 
              value={otpValue} 
              onChange={handleVerifyOTP}
              disabled={verifying}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {otpError && (
              <p className="text-xs text-red-500 font-semibold">{otpError}</p>
            )}

            {verifying && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <RefreshCw className="size-3 animate-spin text-purple-400" />
                <span>Verifying passcode...</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard Page Content
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden flex flex-col py-24 px-4">
      {/* Grid Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl flex-1 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center text-[10px] font-black tracking-widest uppercase text-purple-500 border border-purple-500/30 bg-purple-500/5 rounded-full px-3 py-1">
              Admin Dashboard
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              Booked Meetings
            </h1>
            <p className="text-muted-foreground text-sm max-w-md">
              Overview of all introductory calls, consulting sessions, and scheduled collaborations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchMeetings(storedOtp)}
              disabled={loading}
              className="border-border hover:bg-muted/50 text-foreground cursor-pointer rounded-xl h-10 px-4"
            >
              <RefreshCw className={cn("size-4 mr-2", loading && "animate-spin")} />
              Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-white cursor-pointer rounded-xl h-10 px-4"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card/40 border border-border/80 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Booked</span>
            <span className="text-3xl font-extrabold text-white mt-2">{bookings.length}</span>
          </div>
          <div className="bg-card/40 border border-border/80 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Upcoming Calls</span>
            <span className="text-3xl font-extrabold text-purple-400 mt-2">{upcomingCount}</span>
          </div>
          <div className="bg-card/40 border border-border/80 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Past Connections</span>
            <span className="text-3xl font-extrabold text-indigo-400 mt-2">{bookings.length - upcomingCount}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, email or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 bg-card/50 border-border focus-visible:ring-purple-500 rounded-xl"
            />
          </div>
          <div className="flex gap-2 shrink-0">
            {(["all", "upcoming", "past"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all duration-200 cursor-pointer",
                  filterType === type
                    ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/10"
                    : "bg-card/30 border-border text-muted-foreground hover:bg-card hover:text-white"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1 min-h-[400px]">
          {/* List of Meetings */}
          <div className={cn(
            "lg:col-span-7 space-y-3 h-full overflow-y-auto no-scrollbar",
            filteredBookings.length === 0 && "flex items-center justify-center border border-dashed border-border/60 rounded-3xl p-12 bg-card/10"
          )}>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <div className="size-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">Loading booked meetings...</span>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center space-y-3">
                <CalendarDays className="size-12 text-muted-foreground/30 mx-auto" />
                <div>
                  <h3 className="text-base font-semibold text-foreground">No meetings found</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-1">
                    Try adjusting your filters or search keywords.
                  </p>
                </div>
              </div>
            ) : (
              <AnimatePresence>
                {filteredBookings.map((meeting) => (
                  <motion.div
                    key={meeting.id}
                    layoutId={meeting.id}
                    onClick={() => setSelectedMeeting(meeting)}
                    className={cn(
                      "p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden group",
                      selectedMeeting?.id === meeting.id
                        ? "bg-purple-600/10 border-purple-500/50 shadow-lg shadow-purple-500/5"
                        : "bg-card/30 border-border/60 hover:bg-card/60 hover:border-border"
                    )}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-foreground group-hover:text-purple-400 transition-colors">
                            {meeting.name}
                          </h3>
                          <span className={cn(
                            "px-2 py-0.5 text-[10px] font-bold rounded-full border shrink-0 uppercase tracking-wider",
                            isBefore(new Date(meeting.date), startOfDay(new Date()))
                              ? "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
                              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          )}>
                            {isBefore(new Date(meeting.date), startOfDay(new Date())) ? "Past" : "Upcoming"}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="size-3.5 text-purple-400" />
                            {format(new Date(meeting.date), "EEEE, MMM d, yyyy")}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-purple-400" />
                            {meeting.timeSlot}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className={cn(
                        "size-5 text-muted-foreground/50 transition-transform duration-300",
                        selectedMeeting?.id === meeting.id ? "rotate-90 text-purple-400" : "group-hover:translate-x-1"
                      )} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Details Side Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {selectedMeeting ? (
                <motion.div
                  key="details-active"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-card/40 border border-border backdrop-blur-md rounded-3xl p-6 md:p-8 space-y-6 text-left relative overflow-hidden"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground tracking-tight">{selectedMeeting.name}</h2>
                      <span className="text-xs text-muted-foreground mt-0.5 block">{selectedMeeting.email}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedMeeting(null)}
                      className="text-xs font-bold text-muted-foreground hover:text-foreground border border-border/80 rounded-lg px-2.5 py-1 bg-card/20 hover:bg-card/60 transition-all cursor-pointer"
                    >
                      Deselect
                    </button>
                  </div>

                  <div className="divide-y divide-border/60 space-y-4">
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Meeting Schedule</h4>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3 text-sm">
                          <Calendar className="size-4 text-purple-400 shrink-0" />
                          <span className="font-semibold text-foreground">
                            {format(new Date(selectedMeeting.date), "EEEE, MMMM d, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="size-4 text-purple-400 shrink-0" />
                          <span className="font-semibold text-foreground">{selectedMeeting.timeSlot}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Video className="size-4 text-purple-400 shrink-0" />
                          <span className="font-semibold text-foreground">Google Meet (Link in calendar invite)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Client Contact</h4>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="size-4 text-purple-400 shrink-0" />
                        <a href={`mailto:${selectedMeeting.email}`} className="font-medium text-purple-400 hover:underline break-all">
                          {selectedMeeting.email}
                        </a>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Notes & Description</h4>
                      {selectedMeeting.notes ? (
                        <div className="bg-card/50 border border-border/50 rounded-2xl p-4 text-sm text-muted-foreground leading-relaxed flex gap-3">
                          <MessageSquare className="size-4 text-purple-400 shrink-0 mt-0.5" />
                          <p className="whitespace-pre-line">{selectedMeeting.notes}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground/60 italic">No notes provided for this meeting.</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="details-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hidden lg:flex flex-col items-center justify-center text-center border border-dashed border-border/60 rounded-3xl p-12 bg-card/5 min-h-[300px]"
                >
                  <CalendarCheck className="size-10 text-muted-foreground/20 mb-3" />
                  <h3 className="text-sm font-semibold text-muted-foreground">Select a meeting</h3>
                  <p className="text-xs text-muted-foreground/60 max-w-xs mt-1">
                    Click on a meeting from the list to view attendee details, calendar scheduling, and notes.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
