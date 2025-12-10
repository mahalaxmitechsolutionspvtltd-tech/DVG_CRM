import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

import { EyeIcon } from "lucide-react";

import { Badge } from "./ui/badge";
import type { FollowUp } from "../lib/types";



interface childProps {
    leads: {
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
}

export default function ViewLeads({ leads }: childProps) {


    return (
        <>
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="flex gap-2">
                            <EyeIcon className="my-auto " />View lead
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md border border-gray-300 lg:max-w-4xl">
                        <DialogHeader className="border-b border-b-gray-300 py-5">
                            <DialogTitle>Lead Details</DialogTitle>
                            <DialogDescription>
                                All the leads related details here, it is not editable here.
                            </DialogDescription>
                        </DialogHeader>

                        <div className=" items-center grid grid-cols-3 gap-10">


                            <div className="col-span-2">
                                <h1 className="text-blue-600 text-sm ">Company Name</h1>
                                <span className=" text-lg font-medium leading-5 tracking-wide block">{leads.companyName}</span>
                                <span className="text-sm text-gray-600">Date : {leads.date}</span>
                               
                            </div>
                            <div className="col-span-1">
                                <h1 className="text-red-600 text-sm">Status</h1>
                                <span className="">
                                    <Badge variant={"default"} className="bg-blue-700 px-5 text-left">{leads.status}</Badge>
                                </span>
                            </div>
                            <div>
                                <h1 className="text-blue-600 text-sm">GST No</h1>
                                <span className="">{leads.gstNo}</span>
                            </div>
                            <div>
                                <h1 className="text-blue-600 text-sm">Company Type</h1>
                                <span className="">{leads.companyType}</span>
                            </div>
                            <div>
                                <h1 className="text-blue-600 text-sm">Email</h1>
                                <span className="">{leads.email}</span>
                            </div>
                            <div>
                                <h1 className="text-blue-600 text-sm">Nature of Business</h1>
                                <span className="">{leads.natureOfBusiness}</span>
                            </div>
                            <div>
                                <h1 className="text-blue-600 text-sm">Service Required</h1>
                                <span className="">{leads.requiredServices}</span>
                            </div>
                            <div>
                                <h1 className="text-blue-600 text-sm">Address</h1>
                                <span className="">{leads.location}</span>
                            </div>
                            <div>
                                <h1 className="text-blue-600 text-sm">problemStatment</h1>
                                <span className="">{leads.problemStatment}</span>
                            </div>
                            <div>
                                <h1 className="text-blue-600 text-sm">Follow up 1</h1>
                                <span className="">{leads.followUps[0].date}</span>
                            </div>
                           

                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}
