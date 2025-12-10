
import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, CopyIcon, Delete, MoreHorizontal } from "lucide-react"

import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { formateDate } from "../lib/formateDate"
import ViewLeads from "./ViewLeads"
import { Badge } from "./ui/badge"
import EditLead from "./EditLead"
import type { FollowUp } from "../lib/types"



const data: Lead[] = [
    {
        srNo: "1",
        date: "2025-01-03",
        companyName: "Evergreen Foods",
        companyType: "Proprietor",
        natureOfBusiness: "Food Manufacturing",
        gstNo: "29ABCDE1234F1Z5",
        contactPerson1: "Ravi Kumar - 9876543210",
        contactPerson2: null,
        contactPerson3: null,
        email: "ravi@evergreenfoods.in",
        location: "Bengaluru",
        requiredServices: ["Digital Marketing"],
        problemStatment: "Low online visibility",
        remark: "Interested in detailed proposal",
        status: "Cold",
        followUps: [{
            id: "djkfd",
            date: "10 dec 2025",
            note: "this is good",
            completed: true,
            timestamp: 12
        }],

    },
   
]


export type Lead = {
    srNo: string
    date: string | null
    companyName: string | null
    companyType: string | null
    natureOfBusiness: string | null
    gstNo: string | null
    contactPerson1: string | null
    contactPerson2: string | null
    contactPerson3: string | null
    email: string | null
    location: string | null
    requiredServices: string[] | null
    problemStatment: string | null
    remark: string | null
    status: string | null
    followUps: FollowUp[]

}

export const columns: ColumnDef<Lead>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className="rounded-sm border border-gray-400"
                checked={
                    table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="rounded-sm border border-gray-400"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "srNo",
        header: "SrNo",
        cell: ({ row }) => (
            <div>{row.getValue("status")}</div>
        )
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {

            const formatedDate = formateDate(row.getValue("date"));
            return <div className=" capitalize">{formatedDate}</div>
        }
    },
    {
        accessorKey: "companyName",
        header: "Company",
        cell: ({ row }) => (
            <div className=" capitalize">{row.getValue("companyName")}</div>
        )
    },
    {
        accessorKey: "companyType",
        header: "Company Type",
        cell: ({ row }) => (
            <div className=" capitalize">{row.getValue("companyType")}</div>
        )
    },
    {
        accessorKey: "natureOfBusiness",
        header: "Nature of Business",
        cell: ({ row }) => (
            <div className=" capitalize">{row.getValue("natureOfBusiness")}</div>
        )
    },
    {
        accessorKey: "gstNo",
        header: "Gst No",
        cell: ({ row }) => (
            <div className=" capitalize">{row.getValue("gstNo")}</div>
        )
    },
    {
        accessorKey: "contactPerson1",
        header: "Person 1",
        cell: ({ row }) => (
            <div className=" capitalize">{row.getValue("contactPerson1")}</div>
        )
    },
    {
        accessorKey: "contactPerson2",
        header: "Person 2",
        cell: ({ row }) => (
            <div className=" capitalize">{row.getValue("contactPerson2")}</div>
        )
    },
    {
        accessorKey: "contactPerson3",
        header: "Person 3",
        cell: ({ row }) => (
            <div className=" capitalize">{row.getValue("contactPerson3")}</div>
        )
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className=" capitalize">{row.getValue("email")}</div>
        )
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
            <div className=" capitalize">{row.getValue("location")}</div>
        )
    },
    {
        accessorKey: "requiredServices",
        header: "Services",
        cell: ({ row }) => (
            <div className=" capitalize">{row.getValue("requiredServices")}</div>
        )
    },
    {
        accessorKey: "problemStatment",
        header: "Problems",
        cell: ({ row }) => (
            <div className=" capitalize">{row.getValue("problemStatment")}</div>
        )
    },
    {
        accessorKey: "remark",
        header: "Remark",
        cell: ({ row }) => (
            <div className=" capitalize">{row.getValue("remark")}</div>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const Status = row.getValue("status");
            if (Status === "Cold") {
                // return <div className=" capitalize">Status</div>
                return <Badge variant={"secondary"} className="px-5 bg-blue-500 text-white">{Status}</Badge>
            }
            if (Status === "Hot") {
                return <Badge variant={"secondary"} className="px-5 bg-red-500 text-white">{Status}</Badge>

            }
            if (Status === "Warm") {
                return <Badge variant={"secondary"} className="px-5 bg-orange-500 text-white">{Status}</Badge>

            }
            if (Status === "Quatation sent") {
                return <Badge variant={"secondary"} className="px-5 bg-green-500 text-white">{Status}</Badge>

            }
        }
    },

    {
        accessorKey: "followUps",
        header: "Follow ups ",
        // cell: ({ row }) => (
        //     <div className=" capitalize">{row.getValue('followUps')}</div>
        // )
    },

    {
        id: "actions",
        header: "Actions",
        enableHiding: true,
        cell: ({ row }) => {
            const lead = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"}>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border transition-all border-gray-300">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => console.log(lead.srNo)}
                        >
                            <CopyIcon />
                            copy SrNo
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => console.log(lead.srNo)}
                        >
                            <ViewLeads leads={lead} />

                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => console.log(lead.srNo)}
                        >
                            <EditLead leads={lead} />
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => console.log(lead.srNo)}
                        >
                            <Delete className="text-red-600" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }



]

// ///////////////////
// export const columns1: ColumnDef<Payment>[] = [
//     {
//         id: "select",
//         header: ({ table }) => (
//             <Checkbox
//                 className="rounded-sm border border-gray-400"
//                 checked={
//                     table.getIsAllPageRowsSelected() ||
//                     (table.getIsSomePageRowsSelected() && "indeterminate")
//                 }
//                 onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//                 aria-label="Select all"
//             />
//         ),
//         cell: ({ row }) => (
//             <Checkbox
//                 className="rounded-sm border border-gray-400"
//                 checked={row.getIsSelected()}
//                 onCheckedChange={(value) => row.toggleSelected(!!value)}
//                 aria-label="Select row"
//             />
//         ),
//         enableSorting: false,
//         enableHiding: false,
//     },
//     {
//         accessorKey: "status",
//         header: "Status",
//         cell: ({ row }) => (
//             <div className="capitalize">{row.getValue("status")}</div>
//         ),
//     },
//     {
//         accessorKey: "email",
//         header: ({ column }) => {
//             return (
//                 <Button
//                     variant="ghost"
//                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                 >
//                     Email
//                     <ArrowUpDown />
//                 </Button>
//             )
//         },
//         cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
//     },
//     {
//         accessorKey: "amount",
//         header: () => <div className="text-right">Amount</div>,
//         cell: ({ row }) => {
//             const amount = parseFloat(row.getValue("amount"))

//             // Format the amount as a dollar amount
//             const formatted = new Intl.NumberFormat("en-US", {
//                 style: "currency",
//                 currency: "USD",
//             }).format(amount)

//             return <div className="text-right font-medium">{formatted}</div>
//         },
//     },
//     {
//         id: "actions",
//         enableHiding: false,
//         cell: ({ row }) => {
//             const payment = row.original

//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="border border-gray-300">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuItem
//                             onClick={() => navigator.clipboard.writeText(payment.id)}
//                         >
//                             Copy payment ID
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem>View customer</DropdownMenuItem>
//                         <DropdownMenuItem>View payment details</DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             )
//         },
//     },
// ]

export function LeadsTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border border-gray-300">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* table */}
            <div className="overflow-hidden rounded-md border border-gray-300 ">
                <Table className="scrollbar-width-sm">
                    <TableHeader className=" h-14">
                        {
                            table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="border-b border-b-gray-300">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                    </TableHeader>
                    <TableBody className="scrollbar-width-sm">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-b border-b-gray-300 border-r-gray-300 h-14"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} align="left">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
