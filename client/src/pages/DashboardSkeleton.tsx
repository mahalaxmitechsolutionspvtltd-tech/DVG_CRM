import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";

export default function DashboardSkeleton() {
    const sk = "bg-muted/70";

    return (
        <div className="h-screen w-screen bg-background border-none">
            <div className="flex h-full w-full">
                {/* Sidebar - Removed any potential border-r */}
                <aside className="hidden md:flex w-[260px] flex-col bg-muted/15 border-none">
                    <div className="flex items-center gap-3 px-4 py-4">
                        <Skeleton className={`h-9 w-9 rounded-lg ${sk}`} />
                        <div className="space-y-2">
                            <Skeleton className={`h-4 w-28 ${sk}`} />
                            <Skeleton className={`h-3 w-20 ${sk}`} />
                        </div>
                    </div>

                    {/* Separator - Hidden or zero height to ensure no line shows */}
                    <Separator className="bg-transparent h-0" />

                    <div className="px-3 py-4 space-y-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 bg-background/40"
                            >
                                <Skeleton className={`h-5 w-5 rounded ${sk}`} />
                                <Skeleton className={`h-4 w-24 ${sk}`} />
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto p-3">
                        <div className="flex items-center gap-3 rounded-xl bg-background/60 p-3 shadow-sm border-none">
                            <Skeleton className={`h-9 w-9 rounded-full ${sk}`} />
                            <div className="min-w-0 flex-1 space-y-2">
                                <Skeleton className={`h-4 w-32 ${sk}`} />
                                <Skeleton className={`h-3 w-40 ${sk}`} />
                            </div>
                            <Skeleton className={`h-8 w-8 rounded-lg ${sk}`} />
                        </div>
                    </div>
                </aside>

                {/* Main */}
                <main className="flex-1 min-w-0 border-none">
                    {/* Top Bar - Removed border-b if header had it */}
                    <header className="flex items-center justify-between gap-3 px-4 py-3 md:px-6 bg-background/80 border-none">
                        <div className="flex items-center gap-3 min-w-0">
                            <Skeleton className={`h-9 w-9 rounded-lg md:hidden ${sk}`} />
                            <div className="min-w-0 space-y-2">
                                <Skeleton className={`h-4 w-32 ${sk}`} />
                                <Skeleton className={`h-3 w-20 ${sk}`} />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Changed variant from 'outline' to 'ghost' or 'secondary' to remove borders */}
                            <Button variant="secondary" className="gap-2 border-0" disabled>
                                <Skeleton className={`h-4 w-4 rounded ${sk}`} />
                                <Skeleton className={`h-3 w-16 ${sk}`} />
                            </Button>

                            <Button variant="secondary" className="gap-2 hidden sm:inline-flex border-0" disabled>
                                <Skeleton className={`h-4 w-4 rounded ${sk}`} />
                                <Skeleton className={`h-3 w-14 ${sk}`} />
                            </Button>

                            <Button variant="secondary" className="gap-2 hidden sm:inline-flex border-0" disabled>
                                <Skeleton className={`h-4 w-4 rounded ${sk}`} />
                                <Skeleton className={`h-3 w-20 ${sk}`} />
                            </Button>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="p-4 md:p-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                // Added border-none and removed default shadcn border
                                <Card key={i} className="overflow-hidden shadow-sm border-none bg-muted/5">
                                    <CardHeader className="pb-2 border-none">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="space-y-2">
                                                <Skeleton className={`h-4 w-28 ${sk}`} />
                                                <Skeleton className={`h-7 w-20 ${sk}`} />
                                            </div>
                                            <Skeleton className={`h-10 w-10 rounded-full ${sk}`} />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 border-none">
                                        <div className="space-y-2">
                                            <Skeleton className={`h-3 w-32 ${sk}`} />
                                            <Skeleton className={`h-3 w-44 ${sk}`} />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
                            <Card className="overflow-hidden shadow-sm border-none bg-muted/5">
                                <CardHeader className="pb-2 border-none">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="space-y-2">
                                            <Skeleton className={`h-4 w-32 ${sk}`} />
                                            <Skeleton className={`h-7 w-24 ${sk}`} />
                                        </div>
                                        <Skeleton className={`h-8 w-8 rounded-lg ${sk}`} />
                                    </div>
                                </CardHeader>

                                <CardContent className="border-none">
                                    <div className="space-y-4">
                                        <Skeleton className={`h-3 w-48 ${sk}`} />
                                        <div className="flex items-end justify-between gap-3 rounded-lg bg-muted/10 p-4 h-[260px] border-none">
                                            {["h-[45%]", "h-[80%]", "h-[65%]", "h-[25%]", "h-[55%]", "h-[58%]"].map((h, idx) => (
                                                <div key={idx} className="flex-1 flex flex-col items-center gap-3">
                                                    <Skeleton className={`w-full ${h} rounded-md ${sk}`} />
                                                    <Skeleton className={`h-3 w-8 ${sk}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="overflow-hidden shadow-sm border-none bg-muted/5">
                                <CardHeader className="pb-2 border-none">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="space-y-2">
                                            <Skeleton className={`h-4 w-28 ${sk}`} />
                                            <Skeleton className={`h-7 w-16 ${sk}`} />
                                        </div>
                                        <Skeleton className={`h-8 w-8 rounded-lg ${sk}`} />
                                    </div>
                                </CardHeader>

                                <CardContent className="border-none">
                                    <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                                        <div className="flex items-center justify-center">
                                            <div className="relative h-60 w-60">
                                                <Skeleton className={`absolute inset-0 rounded-full ${sk}`} />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="space-y-2 text-center">
                                                        <Skeleton className={`mx-auto h-10 w-20 ${sk}`} />
                                                        <Skeleton className={`mx-auto h-3 w-14 ${sk}`} />
                                                    </div>
                                                </div>
                                                <div className="absolute inset-[30%] rounded-full bg-background" />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {Array.from({ length: 4 }).map((_, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <Skeleton className={`h-3 w-3 rounded-full ${sk}`} />
                                                    <Skeleton className={`h-3 w-20 ${sk}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mt-6">
                            <Skeleton className={`h-[220px] w-full rounded-xl ${sk}`} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}