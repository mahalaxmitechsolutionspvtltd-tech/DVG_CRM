import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

import { Building, EyeIcon, HandPlatter, IdCard, Mail, MapPin, MessageCircleDashed, MessageSquareQuote, Phone, ReceiptText, UserRound } from "lucide-react";

import { Badge } from "../ui/badge";
import type { Lead } from "../../lib/types";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { formateDate } from "../../lib/formateDate";







interface childProps {
    lead: Lead
}

export default function ViewLeads({ lead }: childProps) {
    return (
        <>
            <div>
                <Dialog >
                    <DialogTrigger asChild  >
                        <div className="flex gap-2" >
                            <EyeIcon className="my-auto " />View lead
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md border border-gray-300 lg:max-w-6xl">
                        <DialogHeader >
                            <DialogTitle>Lead Details</DialogTitle>
                            <DialogDescription>
                                All the important information about this lead is listed below.
                            </DialogDescription>
                        </DialogHeader>
                        <Separator />
                        <div className=" items-center ">
                            <DialogHeader className=" rounded-md border border-gray-300 p-5 ">
                                <DialogTitle className="text-xl flex justify-between">
                                    <div>
                                        {lead.company_name}
                                        <DialogDescription>{lead.company_type}</DialogDescription>
                                        <DialogDescription className="text-sm font-medium">Applied on: {lead.date}</DialogDescription>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        <Badge variant={"default"} className={` col-span-1 w-full `}>
                                            {lead.status}
                                        </Badge>
                                        <div className="">
                                            <DialogDescription className="text-sm font-medium flex"><MapPin size={18} /> {lead.address_line1}</DialogDescription>

                                        </div>
                                    </div>
                                </DialogTitle>

                            </DialogHeader>
                            <div className="p-5 grid grid-cols-1 gap-5">
                                <section className=" grid grid-cols-3  gap-3">
                                    <div>
                                        <label className="text-sm text-gray-600 flex gap-1"><UserRound size={18} /> Primary person name</label>
                                        <span className=" block" >{lead.primary_person_name ?? ""}</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><Mail size={18} />Primary person Email </label>
                                        <span className=" block">{lead.primary_person_email ?? ""}</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><Phone size={18} />Primary person  number </label>
                                        <span className=" block">{lead.primary_person_contact ?? ""}</span>
                                    </div>

                                </section>
                                {
                                    lead.secondary_person_name && lead.secondary_person_email && lead.secondary_person_contact ?
                                        <section className=" grid grid-cols-3  gap-3">

                                            <div>
                                                <label className="text-sm text-gray-600 flex gap-1"><UserRound size={18} />Secondary person name</label>
                                                <span className=" block" >{lead.secondary_person_name ?? ""}</span>
                                            </div>
                                            <div>
                                                <label className="text-gray-600 text-sm flex gap-1"><Mail size={18} />Secondary person Email </label>
                                                <span className=" block">{lead.secondary_person_email ?? ""}</span>
                                            </div>
                                            <div>
                                                <label className="text-gray-600 text-sm flex gap-1"><Phone size={18} />Secondary person  number </label>
                                                <span className=" block">{lead.secondary_person_contact ?? ""}</span>
                                            </div>

                                        </section> : ""
                                }
                                {

                                    lead.tertiary_person_name && lead.tertiary_person_email && lead.tertiary_person_contact ?
                                        <section className="grid grid-cols-3  gap-3">
                                            <div>
                                                <label className="text-sm text-gray-600  flex gap-1"><UserRound size={18} />Secondary person name</label>
                                                <span className=" block" >{lead.tertiary_person_name ?? ""}</span>
                                            </div>
                                            <div>
                                                <label className="text-gray-600 text-sm flex gap-1"><Mail size={18} />Secondary person Email </label>
                                                <span className=" block">{lead.tertiary_person_email ?? ""}</span>
                                            </div>
                                            <div>
                                                <label className="text-gray-600 text-sm flex gap-1"><Phone size={18} />Secondary person  number </label>
                                                <span className=" block">{lead.tertiary_person_contact ?? ""}</span>
                                            </div>
                                        </section> : ""
                                }

                                <section className=" grid grid-cols-3  gap-3">
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><Building size={18} /> Nature of Business</label>
                                        <span className=" block">{lead.nature_of_business ? lead.nature_of_business : "No data available.."}</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><IdCard size={18} /> Pan number</label>
                                        <span className=" block">{lead.pan_number ? lead.pan_number : "No data available.."}</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><ReceiptText size={18} /> Gst number</label>
                                        <span className=" block">{lead.gst_no ? lead.gst_no : "No data available.."}</span>
                                    </div>

                                </section>
                                <section className=" grid grid-cols-3  gap-3">
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><MessageCircleDashed size={18} /> Problem statement</label>
                                        <span className=" block">"{lead.problem_statement ? lead.remarks : "No data available.."}"</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><MessageSquareQuote size={18} /> Remark</label>
                                        <span className=" block">"{lead.remarks ? lead.remarks : "No data available.."}"</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1">
                                        <label className="text-gray-600 text-sm flex gap-1"><HandPlatter size={18} />Service requirements </label>
                                        {
                                            lead.service_requirements?.map((item) => (
                                                <Badge variant={"outline"} className="boder  border-gray-400 ">{item}</Badge>
                                            ))

                                        }
                                    </div>
                                </section>

                            </div>
                            <div>
                                <DialogDescription>Follow ups</DialogDescription>
                                <div className=" overflow-x-auto">
                                    <Table className="w-full border border-gray-300">
                                        <TableHeader>
                                            <TableRow className=" border-b border-b-gray-200 ">
                                                <TableHead>Date</TableHead>
                                                <TableHead>Note</TableHead>
                                                <TableHead>Expenses</TableHead>

                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className=" relative">
                                            {
                                                lead.follow_ups?.length != 0 ? (
                                                    lead.follow_ups?.map((item, index) => (
                                                        <TableRow key={index} className=" border-0">
                                                            <TableCell>{formateDate(item.date)}</TableCell>
                                                            <TableCell>{item.note}</TableCell>
                                                            <TableCell>{item.expenses}</TableCell>

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

                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent >
                </Dialog >
            </div >
        </>
    )
}
