
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
import { ArrowUpDown, ChevronDown, CopyIcon, Delete, Eye, MoreHorizontal } from "lucide-react"

import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { formateDate } from "../../lib/formateDate"
import ViewLeads from "./ViewLeads"
import { Badge } from "../ui/badge"
import EditLead from "./EditLead"
import type { Lead } from "../../lib/types"
import { getLeadsHandler } from "../../apiHandlers/LeadHandler"
import ShowFollowup from "../showFollowup"
import { Skeleton } from "../ui/skeleton"
import { Popover, PopoverTrigger } from "../ui/popover"
import { PopoverContent } from "@radix-ui/react-popover"
import { Separator } from "../ui/separator"


export function LeadsTable() {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({});
    const [data, setData] = React.useState<Lead[]>([]);
    const [loader, setLoader] = React.useState<boolean>(false);



    const columns: ColumnDef<Lead>[] = [
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
            accessorKey: "sr_no",
            header: "SrNo",
            cell: ({ row }) => (
                <div>{row.getValue("sr_no")}</div>
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
            accessorKey: "company_name",
            header: "Company",
            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("company_name")}</div>
            )
        },
        {
            accessorKey: "company_type",
            header: "Company Type",
            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("company_type")}</div>
            )
        },
        {

            accessorKey: "nature_of_business",
            header: "Nature of Business",

            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("nature_of_business")}</div>
            )
        },
        {
            accessorKey: "gst_no",
            header: "Gst No",
            enableHiding: true,
            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("gst_no")}</div>
            )
        },
        {
            accessorKey: "contact1_name",
            header: "Person 1",
            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("contact1_name")}</div>
            )
        },
        {
            accessorKey: "contact2_name",
            header: "Person 2",
            enableHiding: true,
            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("contact2_name")}</div>
            )
        },
        {
            accessorKey: "contact3_name",
            header: "Person 3",
            enableHiding: true,
            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("contact3_name")}</div>
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
            accessorKey: "address_line1",
            header: "Location",
            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("address_line1")}</div>
            )
        },
        {
            accessorKey: "service_requirements",
            header: "Services",
            cell: ({ row }) => (
                <div className=" capitalize">
                    <Popover >
                        <PopoverTrigger asChild>
                            <Button variant="outline">
                                <Eye />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-white border p-2 border-gray-300 rounded-sm lg:w-md shadow-lg">
                            <div>
                                <p className="text-md font-medium text-gray-900"> Required Services</p>
                                <Separator />
                                <div className="py-2 grid gap-1">
                                    {
                                        row.original.service_requirements?.map((item) => (
                                            <span className="block">{item}</span>
                                        ))
                                    }

                                </div>
                            </div>
                        </PopoverContent>

                    </Popover>
                    {/* {row.getValue("service_requirements")} */}
                </div>
            )
        },
        {
            accessorKey: "problem_statement",
            header: "Problems",
            enableHiding: true,
            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("problem_statement")}</div>
            )
        },
        {

            accessorKey: "remarks",
            header: "Remarks",
            enableHiding: true,
            cell: ({ row }) => (
                <div className=" capitalize">{row.getValue("remarks")}</div>
            )
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const Status = row.getValue("status");
                if (Status === "Cold") {
                    // return <div className=" capitalize">Status</div>
                    return <Badge variant={"secondary"} className="px-5 rounded-sm  bg-blue-400 text-white">{Status}</Badge>
                }
                if (Status === "Hot") {
                    return <Badge variant={"secondary"} className="px-5 rounded-sm bg-red-400 text-white">{Status}</Badge>

                }
                if (Status === "Warm") {
                    return <Badge variant={"secondary"} className="px-5 rounded-sm bg-orange-400 text-white">{Status}</Badge>

                }
                if (Status === "Quotation sent") {
                    return <Badge variant={"secondary"} className="px-5 rounded-sm bg-green-400 text-white">{Status}</Badge>

                }
            }
        },

        {
            accessorKey: "follow_ups",
            header: "Follow ups ",
            cell: ({ row }) => {
                return (
                    <div className=" capitalize">
                        <ShowFollowup lead={row.original} />
                    </div>
                )
            }
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
                            <DropdownMenuItem
                            >
                                <CopyIcon />
                                copy SrNo
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}
                            >
                                <ViewLeads lead={lead} />

                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}
                            >
                                <EditLead leads={lead} onSuccess={handleRfresh} />
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}
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

    const handleGetData = async () => {
        const resp = await getLeadsHandler();

        if (resp.data.success) {
            setData(resp.data.data);
            setLoader(false);
        }
    }
    const handleRfresh = (isSuccess: boolean) => {
        if (isSuccess) {
            handleGetData();
        }
    }

    React.useEffect(() => {
        setLoader(true);
        handleGetData();
    }, [])

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
                                <TableRow key={headerGroup.id} className="border-b border-b-gray-300 ">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} align="center" className="">
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
                    <TableBody className="scrollbar-width-sm ">

                        {
                            loader ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i} className="h-14 border-b text-center border-b-gray-300">
                                        {columns.map((_, index) => (
                                            <TableCell key={index} className=" py-2">
                                                <Skeleton className="h-4 w-full rounded" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (

                                table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            className="border-b border-b-gray-300 border-r border-r-gray-300 h-14"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
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
                                            align="center"
                                            colSpan={columns.length}
                                            className="h-24"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )
                            )

                        }
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

