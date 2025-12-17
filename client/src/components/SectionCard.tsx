
import { Calendar, ContactRound, IndianRupee, TrendingUp, Users } from "lucide-react";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { IconTrendingUp } from "@tabler/icons-react";
import { ChartBarDefault } from "./charts/chart-default";
import { ChartPieDonutText } from "./charts/chart-pie-donut-text";



const cardItems = [
    {
        title: "Total Leads",
        value: 1259,
        icon: Users,
    },
    {
        title: "Today's Follow-ups",
        value: 1259,
        icon: Calendar,
    },
    {
        title: "One-time Business",
        value: 1259,
        icon: IndianRupee,
        monyIcon: IndianRupee
    },
    {
        title: "Monthly Recurring",
        value: 1259,
        icon: TrendingUp,
        monyIcon: IndianRupee
    }
]



export default function SectionCards() {
    return (
        <>
            <div className=" grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t  lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {
                    cardItems.map((items, index) => (
                        <Card className=" border border-gray-200" key={index}>
                            <CardHeader>
                                <CardTitle className="text-blue-800">{items.title}</CardTitle>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {

                                        items.monyIcon ? (
                                            <>
                                                <items.monyIcon className=" font-extrabold inline w-6 h-6" /> {items.value}
                                            </>
                                        ) : (
                                            items.value
                                        )

                                    }

                                </CardTitle>
                                <CardAction>
                                    <div className="p-2 bg-gray-200 rounded-full">
                                       <items.icon className="w-8 h-8 stroke-1 text-blue-600" />
                                    </div>

                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    Trending up this month <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">
                                    Visitors for the last 6 months
                                </div>
                            </CardFooter>
                        </Card>
                    ))

                }

            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t  lg:px-6 @xl/main:grid-cols-1 @5xl/main:grid-cols-3">

                <Card className=" border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-blue-800 ">Total Contacts</CardTitle>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            <span>37,674</span>
                        </CardTitle>
                        <CardAction>
                            <div className="p-2 bg-gray-200 text-red-600 rounded-lg">
                                <ContactRound className="w-4 h-4" />
                            </div>

                        </CardAction>
                    </CardHeader>

                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <ChartBarDefault />
                    </CardFooter>
                </Card>
                {/* Pie */}
                <Card className=" border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-blue-800 ">Active Deals</CardTitle>
                        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            <span>774</span>
                        </CardTitle>
                        <CardAction>
                            <div className="p-2 bg-gray-200 text-red-600 rounded-lg">
                                <ContactRound className="w-4 h-4" />
                            </div>

                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <ChartPieDonutText />
                    </CardContent>

                    <CardFooter className="flex justify-between  items-start gap-1.5 text-sm text-center">
                        <section className="flex gap-2">
                            <div className="w-5 h-5 bg-blue-700 rounded-sm"></div>
                            <span>Pending</span>
                        </section>
                        <section className="flex gap-2">
                            <div className="w-5 h-5 bg-slate-500 rounded-sm"></div>
                            <span>Submited</span>
                        </section>
                        <section className="flex gap-2">
                            <div className="w-5 h-5 bg-slate-600 rounded-sm"></div>
                            <span>Active</span>
                        </section>
                         <section className="flex gap-2">
                            <div className="w-5 h-5 bg-yellow-500 rounded-sm"></div>
                            <span>Inactive</span>
                        </section>
                       
                    </CardFooter>
                </Card>

            </div>

        </>
    )
}
