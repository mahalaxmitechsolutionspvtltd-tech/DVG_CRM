import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "../ui/select";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "../ui/multi-select";
import { Textarea } from "../ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState, type ChangeEventHandler } from "react";
import type { Deal } from "../../lib/types";


import { FieldLabel } from "../ui/field";
import { Spinner } from "../ui/spinner";
import {updateDealHandler } from "../../apiHandlers/DealsHandler";
import axios from "axios";


const requirement = [
    { lable: 'Website Development', value: 'Website Development' },
    { lable: 'Software Development', value: 'Software Development' },
    { lable: 'WhatsApp Marketing', value: 'WhatsApp Marketing' },
    { lable: 'Search Engine Optimisation', value: 'Search Engine Optimisation' },
    { lable: 'WhatsApp Automation', value: 'WhatsApp Automation' },
    { lable: 'Social Media Marketing', value: 'Social Media Marketing' },
    { lable: 'Tracking Video', value: 'Tracking Video' },
    { lable: 'Lead Generation', value: 'Lead Generation' },
    { lable: 'Mobile Application Development', value: 'Mobile Application Development' },
    { lable: 'UI & UX Design', value: 'UI & UX Design' },
    { lable: 'Content Shooting & Edits', value: 'Content Shooting & Edits' },
    { lable: 'Logo, Branding & Guidelines', value: 'Logo, Branding & Guidelines' },
    { lable: 'Start-up Development (App + Software + ERP)', value: 'Start-up Development (App + Software + ERP)' },
    { lable: 'Enterprise Resources Planning Software', value: 'Enterprise Resources Planning Software' },
    { lable: 'HRMS Software', value: 'HRMS Software' },
    { lable: 'Customer Relationship Management - CRM Software', value: 'Customer Relationship Management - CRM Software' },
    { lable: 'Company Profile & Business Profile', value: 'Company Profile & Business Profile' },
];


interface childProps {
    onSuccess: (isSuccess: boolean) => void;
    deal: Deal
}


export default function EditDeals({ deal,onSuccess }: childProps) {
    const [formdata, setFormData] = useState<Partial<Deal>>(deal);
    const [errors, setFormErrors] = useState<Deal>();
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);


    const handleInputChange: ChangeEventHandler<HTMLInputElement> | undefined = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: ['pan_number', 'gst_no'].includes(name) ? value.toUpperCase() : value
        }))

    }

    const handleSelectChange = (name: string, value: string | string[],) => {
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleTextArea = (name: string, value: string,) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        try {
            setLoader(true);
            const response = await updateDealHandler(formdata);
            if (response?.data?.success) {
                setLoader(false);
                setOpen(false)
                onSuccess(true);
                setFormData(deal);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setLoader(false);
                setFormErrors(error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
        }

    }


    return (

        <div className=" overflow-auto overflow-y-auto">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div onClick={() => setOpen(true)}>  Edit Deal</div>
                </DialogTrigger>
                <DialogContent className=" border bg-white border-gray-400 max-h-[95vh] overflow-y-auto  hide-scrollbar">

                    <DialogHeader>
                        <DialogTitle className="text-center">Edit deal</DialogTitle>
                    </DialogHeader>
                    <div className=" overflow-y-auto h-2xl ">
                        <div className="grid grid-col-1 gap-2">
                            {/* Status */}
                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Status</h3>
                                </div>

                                {/*Status */}
                                <div className="p-3 grid gap-3">
                                    <div>

                                        <FieldLabel className="text-sm">Status</FieldLabel>
                                        <Select
                                            name="status"
                                            defaultValue={formdata.status ?? ""}
                                            onValueChange={(value) => { handleSelectChange("status", value) }}
                                            disabled
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-300">
                                                <SelectGroup>
                                                    <SelectLabel>Select</SelectLabel>
                                                    <SelectItem value="New">New</SelectItem>
                                                    <SelectItem value="Repeat">Repeat </SelectItem>

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <FieldLabel className="text-sm">Deal stage</FieldLabel>
                                        <Select
                                            name="deal_stage"
                                            onValueChange={(value) => { handleSelectChange("deal_stage", value) }}

                                        >
                                            <SelectTrigger className={`w-full`}>
                                                <SelectValue placeholder="Deal stage" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-300">
                                                <SelectGroup>
                                                    <SelectLabel>stage</SelectLabel>
                                                    <SelectItem value="Discovery">Discovery</SelectItem>
                                                    <SelectItem value="Qualification">Qualification </SelectItem>
                                                    <SelectItem value="Proposal">Proposal</SelectItem>
                                                    <SelectItem value="Negotiation">Negotiation</SelectItem>
                                                    <SelectItem value="Closed Won">Closed Won</SelectItem>
                                                    <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>

                                            <FieldLabel className="text-sm"> Deal amount</FieldLabel>
                                            <Input
                                                type="number"
                                                name="deal_amount"
                                                onChange={(e) => handleInputChange(e)}
                                                required
                                                placeholder={errors ? errors.deal_amount![0] : "amount"}
                                                className={` ${errors?.deal_amount![0] ? "border border-red-600 text-red-600" : ""}`}
                                            />
                                        </div>
                                        <div>
                                            <FieldLabel className="text-sm"> quotation_type</FieldLabel>
                                            <Select
                                                name="quotation_type"
                                                onValueChange={(value) => { handleSelectChange("quotation_type", value) }}
                                            >
                                                <SelectTrigger className={`${errors ? " border border-red-500" : ""} w-full`}>
                                                    <SelectValue placeholder="Quotation type" />
                                                </SelectTrigger>
                                                <SelectContent className="border border-gray-300">
                                                    <SelectGroup>
                                                        <SelectLabel>type</SelectLabel>
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                        <SelectItem value="onetime">onetime </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Requirements */}
                            <section className="border border-gray-300 rounded-sm  ">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Requirements</h3>
                                </div>

                                <div className="p-3 grid gap-5">

                                    {/*Requirements */}
                                    <div className="">

                                        <FieldLabel className="text-sm">Required Services</FieldLabel>
                                        <MultiSelect

                                            onValuesChange={(e) => setFormData((prev) => ({
                                                ...prev,
                                                service_requirements: e
                                            }))}>
                                            <MultiSelectTrigger
                                                className="w-full max-h-20 "
                                            >
                                                <MultiSelectValue
                                                    className="max-h-20 grid grid-cols-1 overflow-y-scroll custom-scrollbar py-1"
                                                    placeholder="Select services..."
                                                />
                                            </MultiSelectTrigger>

                                            <MultiSelectContent className="border border-gray-300">

                                                <MultiSelectGroup className="border border-gray-300">
                                                    {
                                                        requirement.map((item, index) => (

                                                            <MultiSelectItem key={index} value={item.value}>{item.lable}</MultiSelectItem>
                                                        ))
                                                    }

                                                </MultiSelectGroup>

                                            </MultiSelectContent>
                                        </MultiSelect>

                                    </div>

                                    {/* problem statument  */}
                                    <div className="col-span-full ">
                                        <FieldLabel className="text-sm">Client's porblem statment</FieldLabel>
                                        <Textarea
                                            onChange={(e) => handleTextArea("problem_statement", e.target.value)}
                                            placeholder="porblem statment.." 
                                            onKeyDown={(e)=>e.stopPropagation()}
                                            />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <DialogFooter className="">
                        <DialogClose asChild>
                            <Button onClick={() => setOpen(false)} variant={"outline"}>Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSubmit} variant={"default"}>
                            {
                                loader ? <Spinner /> : "Generate Lead"
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent >
            </Dialog >

        </div >
    )
}
