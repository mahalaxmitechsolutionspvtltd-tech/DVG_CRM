
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"


import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart"

export const description = "A bar chart"

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "contact",
        color: "var(--chart-1)",
    },
}

export function ChartBarDefault() {
    return (

        <ChartContainer config={chartConfig} className="h-xl w-full">
            <BarChart
                className="w-xl"
                accessibilityLayer
                data={chartData}  >
                <CartesianGrid vertical={false} accentHeight={200} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={5}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
            </BarChart>
        </ChartContainer>

    )
}
