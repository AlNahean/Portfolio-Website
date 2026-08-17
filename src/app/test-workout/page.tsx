"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    RefreshCcw,
    Minus,
    Info,
    Sparkles,
    Dumbbell,
    Sun,
    Moon,
    Flame,
    History,
    Activity,
    Plus,
    CheckCircle,
    Play,
    Pause,
    RotateCcw
} from "lucide-react";

type Exercise = {
    id: string;
    name: string;
    count: number;
    target: number;
    countsTowardsTotal: boolean;
    icon: string;
    // Equipment settings
    activeGrip?: string;      // Wide, Close, Standard, Underhand
    activeWeight?: number;    // Dumbbell weight (kg)
    activeSprings?: number;   // Chest expander springs (1-5)
    activeHand?: "Left" | "Right"; // Hand Gripper side
    activeCoreStyle?: string; // Crunches, Leg Raises, Russian Twists, Plank
    breakdown?: Record<string, number>;
};

type WorkoutLog = {
    id: string;
    timestamp: string;
    exerciseId: string;
    exerciseName: string;
    count: number;
    detail: string;
};

// Initial state matching user's exact equipment
const INITIAL_EXERCISES: Exercise[] = [
    {
        id: "pullups",
        name: "Pull-ups",
        count: 0,
        target: 50,
        countsTowardsTotal: true,
        icon: "Pullup",
        activeGrip: "Parallel",
        breakdown: { "Parallel": 0, "Wide": 0, "Standard": 0, "Underhand": 0 }
    },
    {
        id: "pushups",
        name: "Push-ups",
        count: 0,
        target: 200,
        countsTowardsTotal: true,
        icon: "Pushup",
        activeGrip: "Standard",
        breakdown: { "Standard": 0, "Wide": 0, "Diamond": 0 }
    },
    {
        id: "squats",
        name: "Dumbbell Squats",
        count: 0,
        target: 250,
        countsTowardsTotal: true,
        icon: "Squat",
        activeWeight: 15,
        breakdown: {}
    },
    {
        id: "expander",
        name: "Spring Chest Expander",
        count: 0,
        target: 200,
        countsTowardsTotal: true,
        icon: "Expander",
        activeSprings: 5,
        breakdown: { "1 Spring": 0, "2 Springs": 0, "3 Springs": 0, "4 Springs": 0, "5 Springs": 0 }
    },
    {
        id: "curls",
        name: "Dumbbell Bicep Curls",
        count: 0,
        target: 150,
        countsTowardsTotal: true,
        icon: "Curl",
        activeWeight: 10,
        breakdown: {}
    },
    {
        id: "core",
        name: "Abs & Core",
        count: 0,
        target: 150,
        countsTowardsTotal: true,
        icon: "Core",
        activeCoreStyle: "Crunches",
        breakdown: { "Crunches": 0, "Leg Raises": 0, "Russian Twists": 0, "Plank": 0 }
    },
    {
        id: "grip",
        name: "Hand Gripper",
        count: 0,
        target: 200,
        countsTowardsTotal: false, // Excluded from the 1000 total reps
        icon: "Grip",
        activeHand: "Right",
        breakdown: { "Left": 0, "Right": 0 }
    },
];

type TabType = "planA" | "planB" | "skincare" | "history";

export default function TrackerPage() {
    const [exercises, setExercises] = useState<Exercise[]>(INITIAL_EXERCISES);
    const [logs, setLogs] = useState<WorkoutLog[]>([]);
    const [activeTab, setActiveTab] = useState<TabType>("planA");
    const [mounted, setMounted] = useState(false);
    const [confettiActive, setConfettiActive] = useState(false);
    const [plankTimeLeft, setPlankTimeLeft] = useState(30);
    const [plankRunning, setPlankRunning] = useState(false);

    // Audio synthesizer for click and completion sounds
    const playSound = (type: "click" | "success" | "reset" | "log") => {
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === "success") {
                // Celebration double chime
                osc.type = "sine";
                osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12); // E5
                osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24); // G5
                osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.36); // C6
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
                osc.start();
                osc.stop(ctx.currentTime + 0.6);
            } else if (type === "log") {
                // Short bubbly sound
                osc.type = "triangle";
                osc.frequency.setValueAtTime(400, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.06, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
                osc.start();
                osc.stop(ctx.currentTime + 0.12);
            } else if (type === "reset") {
                // De-escalating sweep
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(300, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.35);
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
                osc.start();
                osc.stop(ctx.currentTime + 0.35);
            } else {
                // Tight mechanical tick
                osc.type = "sine";
                osc.frequency.setValueAtTime(1200, ctx.currentTime);
                gain.gain.setValueAtTime(0.03, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
                osc.start();
                osc.stop(ctx.currentTime + 0.05);
            }
        } catch (e) {
            console.warn("AudioContext blocked or unavailable", e);
        }
    };

    // Load from local storage
    useEffect(() => {
        const savedExercises = localStorage.getItem("optimizedWorkout_exercises");
        const savedLogs = localStorage.getItem("optimizedWorkout_logs");
        if (savedExercises) {
            try { setExercises(JSON.parse(savedExercises)); } catch (e) { console.error(e); }
        }
        if (savedLogs) {
            try { setLogs(JSON.parse(savedLogs)); } catch (e) { console.error(e); }
        }
        setMounted(true);
    }, []);

    // Save to local storage
    useEffect(() => {
        if (mounted) {
            localStorage.setItem("optimizedWorkout_exercises", JSON.stringify(exercises));
            localStorage.setItem("optimizedWorkout_logs", JSON.stringify(logs));
        }
    }, [exercises, logs, mounted]);

    // Plank timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (plankRunning && plankTimeLeft > 0) {
            interval = setInterval(() => {
                setPlankTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (plankTimeLeft === 0 && plankRunning) {
            setPlankRunning(false);
            // Auto add plank reps (1 rep per second, standard is 30 reps for 30s)
            handleAddReps("core", 30, "30s Plank Hold");
            playSound("success");
            setPlankTimeLeft(30);
        }
        return () => clearInterval(interval);
    }, [plankRunning, plankTimeLeft]);

    // Calculate totals
    const totalReps = exercises
        .filter((ex) => ex.countsTowardsTotal)
        .reduce((acc, curr) => acc + curr.count, 0);

    const targetReps = 1000;
    const progressPercentage = Math.min((totalReps / targetReps) * 100, 100);

    // Handle Confetti Trigger
    useEffect(() => {
        if (totalReps >= targetReps && mounted) {
            setConfettiActive(true);
            const timer = setTimeout(() => setConfettiActive(false), 6000);
            return () => clearTimeout(timer);
        }
    }, [totalReps, mounted]);

    const handleAddReps = (id: string, amount: number, customDetail?: string) => {
        playSound("log");
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setExercises((prev) =>
            prev.map((ex) => {
                if (ex.id === id) {
                    const newCount = Math.max(0, ex.count + amount);
                    
                    // Determine details for log & breakdown
                    let detailStr = "";
                    let breakdownKey = "";

                    if (id === "pullups") {
                        detailStr = `${ex.activeGrip} Grip`;
                        breakdownKey = ex.activeGrip || "Standard";
                    } else if (id === "pushups") {
                        detailStr = `${ex.activeGrip} Placement`;
                        breakdownKey = ex.activeGrip || "Standard";
                    } else if (id === "squats" || id === "curls") {
                        detailStr = `${ex.activeWeight}kg`;
                        breakdownKey = `${ex.activeWeight}kg`;
                    } else if (id === "expander") {
                        detailStr = `${ex.activeSprings} Springs`;
                        breakdownKey = `${ex.activeSprings} Springs`;
                    } else if (id === "grip") {
                        detailStr = `${ex.activeHand} Hand`;
                        breakdownKey = ex.activeHand || "Right";
                    } else if (id === "core") {
                        detailStr = ex.activeCoreStyle || "Crunches";
                        breakdownKey = ex.activeCoreStyle || "Crunches";
                    }

                    if (customDetail) {
                        detailStr = customDetail;
                        breakdownKey = customDetail;
                    }

                    // Update breakdown record
                    const currentBreakdown = { ...(ex.breakdown || {}) };
                    currentBreakdown[breakdownKey] = (currentBreakdown[breakdownKey] || 0) + amount;

                    // Log the set
                    const newLog: WorkoutLog = {
                        id: Math.random().toString(36).substr(2, 9),
                        timestamp,
                        exerciseId: id,
                        exerciseName: ex.name,
                        count: amount,
                        detail: detailStr
                    };
                    setLogs((prevLogs) => [newLog, ...prevLogs].slice(0, 50)); // limit to last 50 logs

                    return {
                        ...ex,
                        count: newCount,
                        breakdown: currentBreakdown
                    };
                }
                return ex;
            })
        );
    };

    const handleResetAll = () => {
        playSound("reset");
        setExercises(INITIAL_EXERCISES);
        setLogs([]);
    };

    const handleUpdateSetting = (id: string, setting: Partial<Exercise>) => {
        playSound("click");
        setExercises((prev) =>
            prev.map((ex) => (ex.id === id ? { ...ex, ...setting } : ex))
        );
    };

    const handleDeleteLog = (logId: string) => {
        playSound("click");
        const logToUndo = logs.find((l) => l.id === logId);
        if (logToUndo) {
            setExercises((prev) =>
                prev.map((ex) => {
                    if (ex.id === logToUndo.exerciseId) {
                        const newCount = Math.max(0, ex.count - logToUndo.count);
                        const currentBreakdown = { ...(ex.breakdown || {}) };
                        const key = logToUndo.detail;
                        if (currentBreakdown[key]) {
                            currentBreakdown[key] = Math.max(0, currentBreakdown[key] - logToUndo.count);
                        }
                        return { ...ex, count: newCount, breakdown: currentBreakdown };
                    }
                    return ex;
                })
            );
        }
        setLogs((prev) => prev.filter((l) => l.id !== logId));
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8 font-sans selection:bg-orange-500/30">
            {confettiActive && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
                    <div className="text-center bg-neutral-900/90 border border-amber-500/30 p-8 rounded-2xl shadow-2xl animate-bounce">
                        <Flame className="h-16 w-16 text-orange-500 mx-auto animate-pulse" />
                        <h2 className="text-3xl font-black mt-4 text-amber-400">1000 REPS HIT!</h2>
                        <p className="text-neutral-400 text-sm mt-2">You completed the daily challenge!</p>
                    </div>
                </div>
            )}

            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Modern Banner/Progress dashboard */}
                <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-xl p-6 shadow-xl">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Flame className="h-40 w-40 text-orange-500" />
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="bg-orange-500/10 text-orange-500 text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-orange-500/20">
                                    Home Gym Challenge
                                </span>
                            </div>
                            <h1 className="text-3xl font-black tracking-tight mt-2 text-white">Daily Workout Tracker</h1>
                            <p className="text-neutral-400 text-xs mt-1">
                                Goal: Hit exactly <span className="text-orange-500 font-semibold">1000 reps</span> using your home equipment.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-2 self-start md:self-auto">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-neutral-400 hover:text-white hover:bg-neutral-800/60 rounded-xl">
                                        <RefreshCcw className="h-4.5 w-4.5" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-neutral-900 border border-neutral-800 text-white">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-xl font-bold">Reset today's logs?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-neutral-400">
                                            This action will clear all current logs, custom rep breakdowns, and reset workout progress to 0.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleResetAll} className="bg-orange-600 hover:bg-orange-700 text-white">
                                            Clear Everything
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>

                    <div className="mt-6 space-y-2">
                        <div className="flex justify-between items-end">
                            <div>
                                <span className="text-4xl font-extrabold text-white">{totalReps}</span>
                                <span className="text-neutral-500 text-sm ml-2 font-medium">/ {targetReps} reps</span>
                            </div>
                            <span className="text-lg font-bold text-orange-500">{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="h-3 w-full bg-neutral-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Tabs Navigation */}
                <div className="flex justify-center bg-neutral-900/50 p-1 rounded-xl border border-neutral-800/80">
                    <button
                        onClick={() => setActiveTab("planA")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                            activeTab === "planA" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                        }`}
                    >
                        <Dumbbell className="h-3.5 w-3.5" />
                        Plan A (Circuit)
                    </button>
                    <button
                        onClick={() => setActiveTab("planB")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                            activeTab === "planB" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                        }`}
                    >
                        <Activity className="h-3.5 w-3.5" />
                        Plan B (Split)
                    </button>
                    <button
                        onClick={() => setActiveTab("skincare")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                            activeTab === "skincare" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                        }`}
                    >
                        <Sparkles className="h-3.5 w-3.5" />
                        Skincare
                    </button>
                    <button
                        onClick={() => setActiveTab("history")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                            activeTab === "history" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-400 hover:text-white"
                        }`}
                    >
                        <History className="h-3.5 w-3.5" />
                        Log Feed ({logs.length})
                    </button>
                </div>

                {/* --- TAB CONTENT: PLAN A & PLAN B Circuit Info --- */}
                {activeTab === "planA" && (
                    <div className="bg-neutral-900/40 border border-neutral-800 p-4 rounded-xl text-xs space-y-1.5 text-neutral-300">
                        <p className="font-bold text-white">🔥 Plan A: Circuit Mode (Power Hour)</p>
                        <p>Complete 10 total circuits containing: 5 pull-ups, 20 push-ups, 25 squats, 20 chest pulls, 15 curls, and 15 core reps.</p>
                        <p className="text-neutral-500 italic">Target reps total: 1000 reps. Rest 60-90s between rounds.</p>
                    </div>
                )}
                {activeTab === "planB" && (
                    <div className="bg-neutral-900/40 border border-neutral-800 p-4 rounded-xl text-xs space-y-1.5 text-neutral-300">
                        <p className="font-bold text-white">⏱️ Plan B: Greasing the Groove (Daily Splits)</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li><strong>Morning (300 reps):</strong> 50 push-ups, 75 squats, 50 chest pulls, 50 curls, 50 core, 25 pull-ups</li>
                            <li><strong>Afternoon (400 reps):</strong> 100 push-ups, 100 squats, 75 chest pulls, 50 curls, 50 core, 25 pull-ups</li>
                            <li><strong>Evening (300 reps):</strong> 50 push-ups, 75 squats, 75 chest pulls, 50 curls, 50 core</li>
                        </ul>
                    </div>
                )}

                {/* --- WORKOUT LIST PANEL --- */}
                {(activeTab === "planA" || activeTab === "planB") && (
                    <div className="space-y-4">
                        {exercises.map((ex) => {
                            const isComplete = ex.count >= ex.target;
                            
                            // Visual accents depending on equipment
                            let accentBorderColor = "border-neutral-800";
                            if (isComplete) {
                                accentBorderColor = "border-emerald-900/40 bg-emerald-950/5";
                            }

                            return (
                                <Card key={ex.id} className={`border bg-neutral-900/20 backdrop-blur-sm transition-all duration-300 ${accentBorderColor}`}>
                                    <CardContent className="p-4 md:p-5 space-y-4">
                                        
                                        {/* Row 1: Icon, Title, Progress Indicator */}
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className={`font-bold text-base tracking-tight ${isComplete ? "text-neutral-500 line-through" : "text-white"}`}>
                                                        {ex.name}
                                                    </h3>
                                                    {!ex.countsTowardsTotal && (
                                                        <span className="px-2 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-500 text-[9px] font-black uppercase tracking-wider">
                                                            Bonus
                                                        </span>
                                                    )}
                                                    {isComplete && (
                                                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 text-neutral-400 text-xs">
                                                    <span className="font-semibold">{ex.count} / {ex.target} reps</span>
                                                    <span>•</span>
                                                    <span className="text-[10px] text-neutral-500">
                                                        {isComplete ? "Target Complete" : `${ex.target - ex.count} reps left`}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {/* Circular Progress Accent */}
                                            <div className="text-right">
                                                <span className={`text-xs font-bold ${isComplete ? "text-emerald-500" : "text-neutral-400"}`}>
                                                    {Math.round((ex.count / ex.target) * 100)}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* Row 2: Equipment Customization Toggles */}
                                        <div className="bg-neutral-950/60 p-3 rounded-lg border border-neutral-900 flex flex-wrap gap-3 items-center justify-between text-xs">
                                            
                                            {/* PULL-UP GRIPS SELECTOR */}
                                            {ex.id === "pullups" && (
                                                <div className="space-y-1.5 w-full">
                                                    <span className="text-neutral-400 font-semibold">Select Grip:</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {["Parallel", "Wide", "Standard", "Underhand"].map((grip) => (
                                                            <button
                                                                key={grip}
                                                                onClick={() => handleUpdateSetting("pullups", { activeGrip: grip })}
                                                                className={`px-2.5 py-1 rounded-md font-medium text-[10px] transition-all border ${
                                                                    ex.activeGrip === grip
                                                                        ? "bg-sky-500/10 border-sky-400 text-sky-400"
                                                                        : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                                                                }`}
                                                            >
                                                                {grip}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* PUSH-UP VARIATION SELECTOR */}
                                            {ex.id === "pushups" && (
                                                <div className="space-y-1.5 w-full">
                                                    <span className="text-neutral-400 font-semibold">Select Variation:</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {["Standard", "Wide", "Diamond"].map((variation) => (
                                                            <button
                                                                key={variation}
                                                                onClick={() => handleUpdateSetting("pushups", { activeGrip: variation })}
                                                                className={`px-2.5 py-1 rounded-md font-medium text-[10px] transition-all border ${
                                                                    ex.activeGrip === variation
                                                                        ? "bg-blue-500/10 border-blue-400 text-blue-400"
                                                                        : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                                                                }`}
                                                            >
                                                                {variation}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* SQUAT WEIGHT SELECTOR */}
                                            {ex.id === "squats" && (
                                                <div className="space-y-1.5 w-full flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                    <span className="text-neutral-400 font-semibold">Dumbbell Weight (Single):</span>
                                                    <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0">
                                                        {[10, 15, 20, 25, 30].map((w) => (
                                                            <button
                                                                key={w}
                                                                onClick={() => handleUpdateSetting("squats", { activeWeight: w })}
                                                                className={`px-2.5 py-1 rounded-md font-medium text-[10px] transition-all border shrink-0 ${
                                                                    ex.activeWeight === w
                                                                        ? "bg-amber-500/10 border-amber-400 text-amber-400"
                                                                        : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                                                                }`}
                                                            >
                                                                {w} kg
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* CHEST EXPANDER SPRINGS SELECTOR */}
                                            {ex.id === "expander" && (
                                                <div className="space-y-1.5 w-full flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                    <div>
                                                        <span className="text-neutral-400 font-semibold">Active Springs: </span>
                                                        <span className="text-amber-500 font-bold">{ex.activeSprings} springs</span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {[1, 2, 3, 4, 5].map((s) => (
                                                            <button
                                                                key={s}
                                                                onClick={() => handleUpdateSetting("expander", { activeSprings: s })}
                                                                className={`w-7 h-7 rounded-md font-bold text-xs transition-all border ${
                                                                    ex.activeSprings === s
                                                                        ? "bg-red-500/10 border-red-400 text-red-400"
                                                                        : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                                                                }`}
                                                            >
                                                                {s}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* BICEP CURL WEIGHT SELECTOR */}
                                            {ex.id === "curls" && (
                                                <div className="space-y-1.5 w-full flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                    <span className="text-neutral-400 font-semibold">Dumbbells (Each):</span>
                                                    <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0">
                                                        {[5, 7.5, 10, 12.5, 15].map((w) => (
                                                            <button
                                                                key={w}
                                                                onClick={() => handleUpdateSetting("curls", { activeWeight: w })}
                                                                className={`px-2.5 py-1 rounded-md font-medium text-[10px] transition-all border shrink-0 ${
                                                                    ex.activeWeight === w
                                                                        ? "bg-emerald-500/10 border-emerald-400 text-emerald-400"
                                                                        : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                                                                }`}
                                                            >
                                                                {w} kg
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* HAND GRIPPER HAND SELECTOR */}
                                            {ex.id === "grip" && (
                                                <div className="space-y-1.5 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                    <span className="text-neutral-400 font-semibold">Hand Gripper Target Side:</span>
                                                    <div className="flex gap-1">
                                                        {(["Left", "Right"] as const).map((hand) => (
                                                            <button
                                                                key={hand}
                                                                onClick={() => handleUpdateSetting("grip", { activeHand: hand })}
                                                                className={`px-3 py-1 rounded-md font-semibold text-[10px] transition-all border ${
                                                                    ex.activeHand === hand
                                                                        ? "bg-orange-500/20 border-orange-500 text-orange-500"
                                                                        : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                                                                }`}
                                                            >
                                                                {hand} Hand
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* FLOOR CORE VARIATION SELECTOR */}
                                            {ex.id === "core" && (
                                                <div className="space-y-2 w-full">
                                                    <div className="flex flex-wrap gap-1">
                                                        {["Crunches", "Leg Raises", "Russian Twists", "Plank"].map((style) => (
                                                            <button
                                                                key={style}
                                                                onClick={() => handleUpdateSetting("core", { activeCoreStyle: style })}
                                                                className={`px-2.5 py-1 rounded-md font-medium text-[10px] transition-all border ${
                                                                    ex.activeCoreStyle === style
                                                                        ? "bg-purple-500/10 border-purple-400 text-purple-400"
                                                                        : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                                                                }`}
                                                            >
                                                                {style}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    
                                                    {/* Custom Plank Timer Widget */}
                                                    {ex.activeCoreStyle === "Plank" && (
                                                        <div className="mt-2 bg-neutral-900/80 p-2.5 rounded-md border border-neutral-800 flex items-center justify-between gap-3 flex-wrap">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-purple-400 text-sm">{plankTimeLeft}s</span>
                                                                <span className="text-[10px] text-neutral-500">Hold Plank (1s = 1 rep)</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Button
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    className="h-7 w-7 text-neutral-400 hover:text-white"
                                                                    onClick={() => setPlankRunning(!plankRunning)}
                                                                >
                                                                    {plankRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 text-emerald-400" />}
                                                                </Button>
                                                                <Button
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    className="h-7 w-7 text-neutral-400 hover:text-white"
                                                                    onClick={() => { setPlankRunning(false); setPlankTimeLeft(30); }}
                                                                >
                                                                    <RotateCcw className="h-3.5 w-3.5" />
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    className="h-7 px-2.5 text-[10px] bg-purple-600 hover:bg-purple-700 text-white font-bold ml-1"
                                                                    onClick={() => handleAddReps("core", 30, "30s Plank Hold")}
                                                                >
                                                                    + 30s
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                        </div>

                                        {/* Row 3: Action Rep Counters & Breakdowns */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                                            
                                            {/* Sub-breakdown details indicator */}
                                            <div className="flex flex-wrap gap-1.5 max-w-sm">
                                                {ex.breakdown && Object.entries(ex.breakdown).map(([key, val]) => {
                                                    if (!val) return null;
                                                    return (
                                                        <span key={key} className="text-[9px] font-semibold bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded">
                                                            {key}: {val}
                                                        </span>
                                                    );
                                                })}
                                                {/* Weight Volume indicator */}
                                                {(ex.id === "squats" || ex.id === "curls") && ex.count > 0 && (
                                                    <span className="text-[9px] font-semibold bg-orange-950/20 border border-orange-500/20 text-orange-400 px-2 py-0.5 rounded">
                                                        Est. Weight Volume: {ex.count * (ex.activeWeight || 0)} kg
                                                    </span>
                                                )}
                                            </div>

                                            {/* Add Counter Buttons */}
                                            <div className="flex items-center gap-1.5 self-end sm:self-auto">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleAddReps(ex.id, -1, "Correction")}
                                                    className="h-9 w-9 text-neutral-400 hover:bg-neutral-800/50 rounded-lg"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>

                                                {/* Dynamic Quick increments depending on rep target */}
                                                {ex.id === "pullups" ? (
                                                    <>
                                                        <Button onClick={() => handleAddReps(ex.id, 1)} variant="secondary" className="h-9 px-3 rounded-lg text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-none">
                                                            +1
                                                        </Button>
                                                        <Button onClick={() => handleAddReps(ex.id, 3)} variant="secondary" className="h-9 px-3 rounded-lg text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-none">
                                                            +3
                                                        </Button>
                                                        <Button onClick={() => handleAddReps(ex.id, 5)} className="h-9 px-3 rounded-lg text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold border-none">
                                                            +5
                                                        </Button>
                                                    </>
                                                ) : ex.id === "grip" ? (
                                                    <>
                                                        <Button onClick={() => handleAddReps(ex.id, 10)} variant="secondary" className="h-9 px-3 rounded-lg text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-none">
                                                            +10
                                                        </Button>
                                                        <Button onClick={() => handleAddReps(ex.id, 25)} variant="secondary" className="h-9 px-3 rounded-lg text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-none">
                                                            +25
                                                        </Button>
                                                        <Button onClick={() => handleAddReps(ex.id, 50)} className="h-9 px-3 rounded-lg text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold border-none">
                                                            +50
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button onClick={() => handleAddReps(ex.id, 5)} variant="secondary" className="h-9 px-3 rounded-lg text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-none">
                                                            +5
                                                        </Button>
                                                        <Button onClick={() => handleAddReps(ex.id, 10)} variant="secondary" className="h-9 px-3 rounded-lg text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-none">
                                                            +10
                                                        </Button>
                                                        <Button onClick={() => handleAddReps(ex.id, 20)} className="h-9 px-3 rounded-lg text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold border-none">
                                                            +20
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* --- TAB CONTENT: SKINCARE --- */}
                {activeTab === "skincare" && (
                    <div className="space-y-4">
                        <Card className="border-neutral-800 bg-neutral-900/30">
                            <CardHeader className="pb-3 border-b border-neutral-800 bg-neutral-900/60">
                                <CardTitle className="text-base flex items-center text-amber-500 font-bold">
                                    <Sun className="h-4.5 w-4.5 mr-2" /> Morning Skincare Routine
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3.5 text-xs text-neutral-300">
                                <div className="flex gap-3">
                                    <span className="font-bold text-amber-500/60 w-5">1.</span>
                                    <div><strong>Cleanse:</strong> Pond's Daily Face Wash (cools and refreshes the skin).</div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="font-bold text-amber-500/60 w-5">2.</span>
                                    <div><strong>Moisturize:</strong> Nivea Soft (apply a light, non-greasy layer).</div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="font-bold text-amber-500/60 w-5">3.</span>
                                    <div><strong>Protect:</strong> Sinoz SPF 50 (prevents UV damage post-workout).</div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="font-bold text-amber-500/60 w-5">4.</span>
                                    <div><strong>Lips:</strong> Pink tub lip balm hydration.</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-neutral-800 bg-neutral-900/30">
                            <CardHeader className="pb-3 border-b border-neutral-800 bg-neutral-900/60">
                                <CardTitle className="text-base flex items-center text-indigo-400 font-bold">
                                    <Moon className="h-4.5 w-4.5 mr-2" /> Evening Skincare Routine
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3.5 text-xs text-neutral-300">
                                <div className="flex gap-3">
                                    <span className="font-bold text-indigo-400/60 w-5">1.</span>
                                    <div><strong>Cleanse:</strong> Bioaqua Papaya Purifying Cleanser (removes sweat and sunscreen buildup).</div>
                                </div>
                                <div className="flex gap-3">
                                    <span className="font-bold text-indigo-400/60 w-5">2.</span>
                                    <div><strong>Moisturize:</strong> Nivea Soft (apply a slightly thicker layer for deep overnight recovery).</div>
                                </div>
                                <div className="pt-3.5 border-t border-neutral-800/80 flex gap-3 text-amber-500">
                                    <span className="font-bold w-5">★</span>
                                    <div><strong>Twice a Week (Night Replacement):</strong> Swap Nivea Soft for the <em>Laikou Matcha Sleeping Face Mask</em> to calm redness. Wash off in the morning.</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* --- TAB CONTENT: LOG HISTORY FEED --- */}
                {activeTab === "history" && (
                    <Card className="border-neutral-800 bg-neutral-900/20 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                                <History className="h-5 w-5 text-orange-500" />
                                Workout Log Feed
                            </CardTitle>
                            <CardDescription className="text-xs text-neutral-400">
                                Displays your recent sets. Delete an entry to deduct its reps from the total counter.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-2">
                            {logs.length === 0 ? (
                                <div className="text-center py-10 text-neutral-500 text-xs">
                                    No reps completed yet today. Let's get to work!
                                </div>
                            ) : (
                                <div className="divide-y divide-neutral-900 max-h-96 overflow-y-auto pr-1">
                                    {logs.map((log) => (
                                        <div key={log.id} className="py-3 flex items-center justify-between text-xs gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-bold text-white">{log.exerciseName}</span>
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                                                        {log.detail}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] text-neutral-500">{log.timestamp}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-black text-orange-500 text-sm">+{log.count} reps</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteLog(log.id)}
                                                    className="h-8 w-8 text-neutral-500 hover:text-red-400 hover:bg-neutral-800/40 rounded-lg"
                                                    title="Undo entry"
                                                >
                                                    <Minus className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

            </div>
        </div>
    );
}