
import type { Lead } from "../lib/types";
import { Button } from "./ui/button";
import { Check, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { formateDate } from "../lib/formateDate";



interface childProps {
    lead: Lead
}


export default function ShowFollowup({ lead }: childProps) {

    const STATUS_COLOR = {
        Warm: "bg-amber-500",
        Hot: "bg-red-500",
        "Quotation Sent": "bg-green-500",
        Cold: "bg-blue-500"
    };


    return (
        <>
            <div>
                <Dialog>
                    <DialogTrigger asChild >
                        <Button variant={"outline"}>
                            <Eye />Show
                        </Button>
                    </DialogTrigger>
                    <DialogContent className=" border border-gray-300 lg:max-w-4xl">
                        <div className=" flex justify-between">
                            <DialogHeader>
                                <DialogTitle>{lead.company_name}
                                    <DialogDescription>{lead.company_type}</DialogDescription>
                                </DialogTitle>

                            </DialogHeader>
                            <DialogHeader className=" mr-5">
                                <DialogTitle>
                                    <Badge className={`${STATUS_COLOR[lead.status] || "bg-blue-500"} rounded-sm`}>
                                        {lead.status}
                                    </Badge>
                                    <DialogDescription>Applied on: {lead.date}</DialogDescription>
                                </DialogTitle>

                            </DialogHeader>
                        </div>
                        <Separator />
                        <div className="">
                            <DialogHeader>
                                <DialogTitle className="text-md text-gray-600">Follow up's</DialogTitle>
                            </DialogHeader>
                            <div className=" overflow-x-auto">
                                <Table className="w-full border border-gray-50">
                                    <TableHeader>
                                        <TableRow className=" border-b border-b-gray-200 rounded-md">
                                            <TableHead>Date</TableHead>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Note</TableHead>

                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className=" relative">
                                        {
                                            lead.follow_ups?.length != 0 ? (
                                                lead.follow_ups?.map((item, index) => (
                                                    <TableRow key={index} className=" border-0">
                                                        <TableCell>{formateDate(item.date)}</TableCell>
                                                        <TableCell>{new Date(item.timestamp).toLocaleTimeString()}</TableCell>
                                                        <TableCell>{item.note}</TableCell>

                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow className="h-20 text-center w-full">
                                                    <TableCell
                                                        colSpan={3}
                                                        className="h-20 text-center font-medium text-gray-500"
                                                    >
                                                        No Follow ups...
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }

                                    </TableBody>

                                </Table>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={"default"}>
                                    <Check />Done
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}
