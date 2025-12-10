
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "./ui/select";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "./ui/multi-select";
import { Textarea } from "./ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState, type ChangeEventHandler } from "react";
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


export default function EditLead({ leads }: childProps) {
    const [formData, SetFormData] = useState(leads);

    const handleChange: ChangeEventHandler<HTMLInputElement> | undefined = (e: any) => {
        const { name, value } = e.target;


        SetFormData((preData) => ({
            ...preData, [name]: value
        }))

    }

    const handleSelectChange = (name: string, value: string | string[],) => {

        SetFormData((preData) => ({
            ...preData,
            [name]: value
        }))
    }

    const handleTextArea = (name: string, value: string,) => {
        SetFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit=()=>{
        console.log(formData);
        
    }


    return (

        <div className=" overflow-auto overflow-y-auto">
            <Dialog >
                <DialogTrigger asChild>
                    <div className="flex gap-2">
                        <Edit className="my-auto " />Edit lead
                    </div>
                </DialogTrigger>
                <DialogContent className="p-10 lg:max-w-4xl border bg-white border-gray-400 max-h-[90vh] overflow-y-auto  hide-scrollbar">

                    <DialogHeader>
                        <DialogTitle className="">Edit and update Lead</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-5 overflow-y-auto h-xl">
                        <div>
                            <label htmlFor="cname">Company name</label>
                            <Input name="companyName" value={formData.companyName?.toString()} onChange={handleChange} placeholder="compan name.." required />
                        </div>
                        <div>
                            <label htmlFor="gstno">GST Number</label>
                            <Input name="gstNo" value={formData.gstNo?.toString()} onChange={handleChange} placeholder="Gst number.." />
                        </div>
                        {/* company Type */}
                        <div>
                            <label htmlFor="">Company type</label>
                            <Select required onValueChange={(value) => handleSelectChange("companyType", value)} value={formData.companyType?.toString()} >
                                <SelectTrigger name="companyType" className="w-full">
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

                        {/* Nature of business */}
                        <div>
                            <label htmlFor="">Nature of Business</label>
                            <Select required name="natureOfBusiness" value={formData.natureOfBusiness?.toString()} onValueChange={(value) => handleSelectChange("natureOfBusiness", value)}>
                                <SelectTrigger name="natureOfBusiness" className="w-full">
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

                        {/* Required services */}

                        <div className="">
                            <label htmlFor="">Required Services</label>
                            <MultiSelect values={formData.requiredServices ?? []} onValuesChange={(e) => {
                                SetFormData((preData) => ({
                                    ...preData,
                                    requiredServices: e
                                }))
                            }}>
                                <MultiSelectTrigger className="w-full "  >
                                    <MultiSelectValue placeholder="Select services..." />
                                </MultiSelectTrigger>
                                <MultiSelectContent className="border border-gray-300">

                                    <MultiSelectGroup className="border border-gray-300" >
                                        <MultiSelectItem value="Website Development">Website Development</MultiSelectItem>
                                        <MultiSelectItem value="Digital Marketing">Digital Marketing</MultiSelectItem>
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

                        {/* Status */}
                        <div>
                            <label htmlFor="">Status</label>
                            <Select required name="status" value={formData.status?.toString()} onValueChange={(value) => handleSelectChange("status", value)}>
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

                        <div >
                            <label htmlFor="gstno">Person Contact 1</label>
                            <Input name="presonContact1" value={formData.contactPerson1?.toString()} onChange={handleChange} required placeholder="person contact.." />
                        </div>
                        <div>
                            <label htmlFor="gstno">Person Contact 2</label>
                            <Input name="presonContact2" value={formData.contactPerson2?.toString()} onChange={handleChange} placeholder="person contact..." />
                        </div>
                        <div>
                            <label htmlFor="gstno">Person Contact 3</label>
                            <Input name="presonContact3" value={formData.contactPerson3?.toString()} onChange={handleChange} placeholder="person contact..." />
                        </div>

                        <div>
                            <label htmlFor="gstno">Email</label>
                            <Input name="email" value={formData.email?.toString()} onChange={handleChange} required placeholder="email.." />
                        </div>

                        <div>
                            <label htmlFor="gstno">Location</label>
                            <Input name="location" value={formData.location?.toString()} onChange={handleChange} required placeholder="location.." />
                        </div>
                        <div>
                            <label htmlFor="gstno">Follow up 1</label>
                            <Input name="followUp1" value={formData.followUps?.toString()} onChange={handleChange} placeholder="follow up.." />
                        </div>
                        
                        <div className="col-span-full">
                            <label htmlFor="gstno">Client's porblem statment</label>
                            <Textarea name="clientProblem" value={formData.problemStatment?.toString()} onChange={(e) => handleTextArea("clientProblem", e.target.value)} placeholder="porblem statment.." />
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="gstno">Remark</label>
                            <Textarea name="remark" value={formData.remark?.toString()} onChange={(e) => handleTextArea("remark", e.target.value)} placeholder="Remark.." />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSubmit} variant={"default"}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >

        </div>
    )
}
