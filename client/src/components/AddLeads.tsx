
import { Button } from "./ui/button";
import { CirclePlus, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "./ui/select";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "./ui/multi-select";
import { Textarea } from "./ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import type { Lead } from "./LeadsTable";
import type { FollowUp } from "../lib/types";





export default function AddLeads() {
    const [formdata, setFormData] = useState<Lead>();

    const handleFollowUpAdd = () => {
        const newFollowUp: FollowUp = {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            note: '',
            completed: false,
            timestamp: Date.now()
        };

        setFormData((prev: any) => ({
            ...prev,
            followUps: [newFollowUp, ...(prev?.followUps || [])]
        }));

    };

    const updateFollowUp = (id: string, field: keyof FollowUp, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            followUps: prev.followUps.map((item: any) => item.id === id ? { ...item, [field]: value } : item)
        }));
    };



    return (

        <div className=" overflow-auto overflow-y-auto">
            <Dialog >
                <DialogTrigger asChild>
                    <Button className=" bg-blue-600 hover:bg-blue-700" variant={"default"}>
                        <CirclePlus />Leads
                    </Button>
                </DialogTrigger>
                <DialogContent className="p-10 lg:max-w-7xl border bg-white border-gray-400 max-h-[90vh] overflow-y-auto  hide-scrollbar">

                    <DialogHeader>
                        <DialogTitle className="text-center">Add Leads</DialogTitle>
                    </DialogHeader>
                    <hr className="text-gray-300" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 2xl:grid-cols-12 gap-5 overflow-y-auto h-xl">

                        <div className="col-span-8 grid gap-5">
                            {/* company section */}
                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center  py-2">
                                    <h3 className="text-gray-900 font-medium">Company details</h3>
                                </div>
                                <div className="p-3">
                                    <div className="my-3">
                                        <label htmlFor="cname">Company name</label>
                                        <Input placeholder="compan name.." required />
                                    </div>

                                    <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                                        {/* company type */}
                                        <div>
                                            <label htmlFor="">Company type</label>
                                            <Select required>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Company type" />
                                                </SelectTrigger>
                                                <SelectContent className="border border-gray-300">
                                                    <SelectGroup>
                                                        <SelectLabel>companies types</SelectLabel>
                                                        <SelectItem value="properitor">Properitor</SelectItem>
                                                        <SelectItem value="partnership-deed">Partnership Deed</SelectItem>
                                                        <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                                                        <SelectItem value="ltd">Private Limited (Pvt Ltd))</SelectItem>
                                                        <SelectItem value="plc">Public Limited Company (PLC)</SelectItem>
                                                        <SelectItem value="huf">Hindu Undivided Family Firm (HUF)</SelectItem>
                                                        <SelectItem value="gov">Government Organisation</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {/* company nature */}
                                        <div>
                                            <label htmlFor="">Nature of Business</label>
                                            <Select required>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="nature of business" />
                                                </SelectTrigger>
                                                <SelectContent className="border border-gray-300">
                                                    <SelectGroup>
                                                        <SelectLabel>Nature of Business</SelectLabel>
                                                        <SelectItem value="Food Manufacturing">Food Manufacturing</SelectItem>
                                                        <SelectItem value="Clothing Brand & Cloth Manufacturing ">Clothing Brand & Cloth Manufacturing </SelectItem>
                                                        <SelectItem value="Ad Agency">Ad Agency</SelectItem>
                                                        <SelectItem value="Marketing Agency">Marketing Agency</SelectItem>
                                                        <SelectItem value="Electrical, Engineering Goods Manufacturing ">Electrical, Engineering Goods Manufacturing </SelectItem>
                                                        <SelectItem value="Agriculture Business">Agriculture Business</SelectItem>
                                                        <SelectItem value="Jwellery - Retailer & Wholeseller">Jwellery - Retailer & Wholeseller</SelectItem>
                                                        <SelectItem value="Service Industry">Service Industry</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* GST number */}
                                    <div className="my-3">
                                        <label htmlFor="gstno">GST Number(optional)</label>
                                        <Input placeholder="Gst number.." />
                                    </div>
                                </div>
                            </section>

                            {/* Contacts and kyes */}

                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Key Contacts</h3>
                                </div>

                                {/*person contacts */}
                                <div className="p-3 grid gap-3">
                                    <div>
                                        <label htmlFor="gstno">Primary Contact 1</label>
                                        <Input required placeholder="Name and contact." />
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                                        <div >
                                            <label htmlFor="gstno">Secondary Contact </label>
                                            <Input required placeholder="Name and contact." />
                                        </div>
                                        <div >
                                            <label htmlFor="gstno">Tertiary Contact </label>
                                            <Input required placeholder="Name and contact." />
                                        </div>
                                    </div>
                                    {/* email */}
                                    <div>
                                        <label htmlFor="gstno">Email</label>
                                        <Input required placeholder="email.." />
                                    </div>

                                </div>

                            </section>

                            {/* Location */}

                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Location</h3>
                                </div>

                                {/*person contacts */}
                                <div className="p-3 grid gap-3">
                                    <div>
                                        <label htmlFor="gstno">Location</label>
                                        <Input required placeholder="e.g 123, Mumbai 400001,India" />
                                    </div>
                                </div>

                            </section>

                        </div>

                        {/* second column */}

                        <div className="col-span-4 grid gap-5">
                            {/* Status */}
                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Status</h3>
                                </div>

                                {/*Status */}
                                <div className="p-3 grid gap-3">
                                    <div>
                                        <label htmlFor="">Status</label>
                                        <Select required>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-300">
                                                <SelectGroup>
                                                    <SelectLabel>Select</SelectLabel>
                                                    <SelectItem value="Cold">Cold</SelectItem>
                                                    <SelectItem value="Warm">Warm </SelectItem>
                                                    <SelectItem value="Hot">Hot</SelectItem>
                                                    <SelectItem value="Marketing Agency">Quotation sent</SelectItem>

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>

                            </section>

                            {/* Requirements */}
                            <section className="border border-gray-300 rounded-sm grid ">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Requirements</h3>
                                </div>

                                <div className="p-3 grid gap-5">

                                    {/*Requirements */}
                                    <div className="">
                                        <label htmlFor="">Required Services</label>
                                        <MultiSelect>
                                            <MultiSelectTrigger
                                                className="w-full max-h-20 overflow-y-auto"
                                            >
                                                <MultiSelectValue
                                                    className="flex flex-wrap gap-2"
                                                    placeholder="Select services..."
                                                />
                                            </MultiSelectTrigger>

                                            <MultiSelectContent className="border border-gray-300">

                                                <MultiSelectGroup className="border border-gray-300">
                                                    <MultiSelectItem value="Website Development">Website Development</MultiSelectItem>
                                                    <MultiSelectItem value="Software Development">Software Development</MultiSelectItem>
                                                    <MultiSelectItem value="WhatsApp Marketing">WhatsApp Marketing</MultiSelectItem>
                                                    <MultiSelectItem value="Search Engine Optimisation">Search Engine Optimisation</MultiSelectItem>
                                                    <MultiSelectItem value="WhatsApp Automation">WhatsApp Automation</MultiSelectItem>
                                                    <MultiSelectItem value="Social Media Marketing">Social Media Marketing</MultiSelectItem>
                                                    <MultiSelectItem value="Tracking Video">Tracking Video</MultiSelectItem>
                                                    <MultiSelectItem value="Lead Generation">Lead Generation</MultiSelectItem>
                                                    <MultiSelectItem value="Mobile Application Development">Mobile Application Development</MultiSelectItem>
                                                    <MultiSelectItem value="UI & UX Design">UI & UX Design</MultiSelectItem>
                                                    <MultiSelectItem value="Content Shooting & Edits">Content Shooting & Edits</MultiSelectItem>

                                                    <MultiSelectItem value="Logo, Branding & Guidelines">Logo, Branding & Guidelines</MultiSelectItem>
                                                    <MultiSelectItem value="Start-up Development (App + Software + ERP)">
                                                        Start-up Development (App + Software + ERP)
                                                    </MultiSelectItem>
                                                    <MultiSelectItem value="Enterprise Resources Planning Software">
                                                        Enterprise Resources Planning Software
                                                    </MultiSelectItem>
                                                    <MultiSelectItem value="HRMS Software">HRMS Software</MultiSelectItem>
                                                    <MultiSelectItem value="Customer Relationship Management - CRM Software">
                                                        Customer Relationship Management - CRM Software
                                                    </MultiSelectItem>
                                                    <MultiSelectItem value="Company Profile & Business Profile">
                                                        Company Profile & Business Profile
                                                    </MultiSelectItem>
                                                </MultiSelectGroup>

                                            </MultiSelectContent>
                                        </MultiSelect>
                                    </div>

                                    {/* problem statument  */}
                                    <div className="col-span-full ">
                                        <label htmlFor="gstno">Client's porblem statment</label>
                                        <Textarea placeholder="porblem statment.." />
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="gstno">Remark</label>
                                        <Textarea placeholder="Remark.." />
                                    </div>

                                </div>
                            </section>

                            {/* Follow up's */}
                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Follow up's</h3>
                                </div>

                                {/*Status */}
                                <div className="p-3 grid gap-3">
                                    <div>
                                        <Button
                                            onClick={handleFollowUpAdd}
                                            variant={"outline"} className="w-full"
                                        >
                                            <Plus />Add Follow up's
                                        </Button>
                                    </div>
                                    <div>
                                        {
                                            formdata?.followUps.length === 0 ? (
                                                <div>
                                                    <span>No Follow ups yet....</span>
                                                </div>
                                            ) : (

                                                formdata?.followUps.map((item, index) => (
                                                    <div key={index} className="">
                                                        <div className="mt-2">
                                                            <Input
                                                                value={item.date}
                                                                type="date"
                                                                name="date"
                                                                onChange={(e) => updateFollowUp(item.id, 'date', e.target.value)}
                                                                className="border-b-0 rounded-b-none w-1/2"
                                                            />
                                                            <Textarea
                                                                cols={2}
                                                                value={item.note}
                                                                onChange={(e) => updateFollowUp(item.id, 'note', e.target.value)}
                                                                placeholder="Add your query.."
                                                                className="border-t-0 rounded-tl-none focus:border-0"
                                                                
                                                                />
                                                        </div>
                                                    </div>
                                                ))

                                            )
                                        }
                                    </div>

                                </div>

                            </section>



                        </div>

                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                        </DialogClose>
                        <Button variant={"default"}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >

        </div>
    )
}
