import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

import { Building, HandPlatter, IdCard, Mail, MapPin, MessageCircleDashed, Phone, ReceiptText, UserRound } from "lucide-react";

import { Badge } from "../ui/badge";
import type { Deal } from "../../lib/types";
import { Separator } from "../ui/separator";
import { useState } from "react";



type DealStage =
    | "Discovery"
    | "Qualification"
    | "Proposal"
    | "Negotiation"
    | "Closed Won"
    | "Closed Lost";



interface childProps {
    deal: Deal
}

export default function ViewDeal({ deal }: childProps) {
    const [open, setOpen] = useState<boolean>(false);
    const stage = deal.deal_stage as DealStage | null;



    const DEAL_STAGE_STYLES: Record<DealStage, string> = {
        Discovery:
            "bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",

        Qualification:
            "bg-purple-600/10 text-purple-600 dark:bg-purple-400/10 dark:text-purple-400",

        Proposal:
            "bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400",

        Negotiation:
            "bg-orange-600/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400",

        "Closed Won":
            "bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400",

        "Closed Lost":
            "bg-red-600/10 text-red-600 dark:bg-red-400/10 dark:text-red-400",
    };


    const stageStyle =
        stage && DEAL_STAGE_STYLES[stage]
            ? DEAL_STAGE_STYLES[stage]
            : "bg-gray-500/10 text-gray-500";

    return (
        <>
            <div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <div onClick={() => setOpen(true)}>
                            View deal
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md border border-gray-300 lg:max-w-6xl">
                        <DialogHeader >
                            <DialogTitle>deal Details</DialogTitle>
                            <DialogDescription>
                                All the important information about this deal is listed below.
                            </DialogDescription>
                        </DialogHeader>
                        <Separator />
                        <div className=" items-center ">
                            <DialogHeader className=" rounded-md border border-gray-300 p-5 ">
                                <DialogTitle className="text-xl flex justify-between">
                                    <div>
                                        {deal.company_name}
                                        <DialogDescription>{deal.company_type}</DialogDescription>
                                        <DialogDescription className="text-sm font-medium">Created at: {deal.created_at}</DialogDescription>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        <Badge variant={"default"} className={`${stageStyle} col-span-1 w-full `}>
                                            {deal.deal_stage}
                                        </Badge>
                                        <div className="">
                                            <DialogDescription className="text-sm font-medium flex"><MapPin size={18} /> {deal.city}</DialogDescription>
                                        </div>
                                    </div>
                                </DialogTitle>

                            </DialogHeader>
                            <div className="p-5 grid grid-cols-1 gap-5">
                                <section className=" grid grid-cols-3  gap-3">
                                    <div>
                                        <label className="text-sm text-gray-600 flex gap-1"><UserRound size={18} /> Primary person name</label>
                                        <span className=" block" >{deal.contact_name ?? ""}</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><Mail size={18} />Primary person Email </label>
                                        <span className=" block">{deal.email ?? ""}</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><Phone size={18} />Primary person  number </label>
                                        <span className=" block">{deal.contact_number ?? ""}</span>
                                    </div>

                                </section>


                                <section className=" grid grid-cols-3  gap-3">
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><Building size={18} /> Nature of Business</label>
                                        <span className=" block">{deal.nature_of_business ? deal.nature_of_business : "No data available.."}</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><IdCard size={18} /> Pan number</label>
                                        <span className=" block">{deal.pan_number ? deal.pan_number : "No data available.."}</span>
                                    </div>
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><ReceiptText size={18} /> Gst number</label>
                                        <span className=" block">{deal.gst_no ? deal.gst_no : "No data available.."}</span>
                                    </div>

                                </section>
                                <section className=" grid grid-cols-3  gap-3">
                                    <div>
                                        <label className="text-gray-600 text-sm flex gap-1"><MessageCircleDashed size={18} /> Problem statement</label>
                                        <span className=" block">"{deal.problem_statement ? deal.problem_statement : "No data available.."}"</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1">
                                        <label className="text-gray-600 text-sm flex gap-1"><HandPlatter size={18} />Service requirements </label>
                                        {
                                            deal.service_requirements?.map((item, index) => (
                                                <Badge key={index} variant={"outline"} className="boder  border-gray-400 ">{item}</Badge>
                                            ))

                                        }
                                    </div>
                                </section>

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
