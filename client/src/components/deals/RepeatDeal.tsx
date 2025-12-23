import { useState } from "react";
import type { Deal } from "../../lib/types";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import axios from "axios";
import { createRepeatDeal } from "../../apiHandlers/DealsHandler";
import { Spinner } from "../ui/spinner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

import { Field, FieldLabel } from "../ui/field";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "../ui/multi-select";


const requirement = [
    { label: 'Website Development', value: 'Website Development' },
    { label: 'Software Development', value: 'Software Development' },
    { label: 'WhatsApp Marketing', value: 'WhatsApp Marketing' },
    { label: 'Search Engine Optimisation', value: 'Search Engine Optimisation' },
    { label: 'WhatsApp Automation', value: 'WhatsApp Automation' },
    { label: 'Social Media Marketing', value: 'Social Media Marketing' },
    { label: 'Tracking Video', value: 'Tracking Video' },
    { label: 'Lead Generation', value: 'Lead Generation' },
    { label: 'Mobile Application Development', value: 'Mobile Application Development' },
    { label: 'UI & UX Design', value: 'UI & UX Design' },
    { label: 'Content Shooting & Edits', value: 'Content Shooting & Edits' },
    { label: 'Logo, Branding & Guidelines', value: 'Logo, Branding & Guidelines' },
    { label: 'Start-up Development (App + Software + ERP)', value: 'Start-up Development (App + Software + ERP)' },
    { label: 'Enterprise Resources Planning Software', value: 'Enterprise Resources Planning Software' },
    { label: 'HRMS Software', value: 'HRMS Software' },
    { label: 'Customer Relationship Management - CRM Software', value: 'Customer Relationship Management - CRM Software' },
    { label: 'Company Profile & Business Profile', value: 'Company Profile & Business Profile' },
];



interface childProps {
    deal: Deal;
    onSuccess: (isSuccess: boolean) => void;
}



export default function RepeatDeal({ deal, onSuccess }: childProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [formdata, setFormData] = useState<Partial<Deal>>(deal);
    const [loader, setLoader] = useState(false);

    console.log(deal);

    const handleSelectChange = (name: string, value: string | string[],) => {

        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }



    const handleSubmit = async () => {
        try {
            setLoader(true);
            const response = await createRepeatDeal(formdata);
            if (response?.data?.success) {
                setLoader(false);
                onSuccess(true)
                setOpen(false)
                setFormData(deal);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setLoader(false);
            } else {
                console.error("Unexpected error:", error);
            }
        }

    }

    return (
        <Dialog open={open} >
            <DialogTrigger asChild>
                <div onClick={() => setOpen(true)}>
                    Reapeat deal
                </div>
            </DialogTrigger>
            <DialogContent
                className="border border-gray-300 lg:max-w-3xl"

            >
                <DialogHeader>
                    <DialogTitle>Reapeat deal</DialogTitle>
                    <DialogDescription>if you whant to repeat deal then go with contineu</DialogDescription>
                </DialogHeader>
                <div>
                    {/* REAPEAT DEAL FORM HEAR */}
                    <div className="grid grid-cols-1 gap-5">

                        <section className="grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
                            <div>
                                <Label className="text-sm">Company name</Label>
                                <Input value={formdata.company_name ?? ""}
                                    autoComplete="off"
                                    readOnly
                                />
                            </div>
                            <div>
                                <Label className="text-sm">Compnay type</Label>
                                <Input value={formdata.company_type ?? ""}
                                    autoComplete="off"
                                    readOnly
                                />
                            </div>
                        </section>
                        <section className="grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
                            <div>
                                <Label className="text-sm">Contact name</Label>
                                <Input value={formdata.contact_name ?? ""}
                                    autoComplete="off"
                                    readOnly
                                />
                            </div>
                            <div>
                                <Label className="text-sm">Contact number</Label>
                                <Input value={formdata.contact_number ?? ""}
                                    autoComplete="off"
                                    readOnly
                                />
                            </div>
                        </section>
                        <Field className="">
                            <FieldLabel>Services requirement</FieldLabel>
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

                                                <MultiSelectItem key={index} value={item.value}>{item.label}</MultiSelectItem>
                                            ))
                                        }

                                    </MultiSelectGroup>

                                </MultiSelectContent>
                            </MultiSelect>

                        </Field>
                        <section className="grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
                            <div>
                                <Label className="text-sm">Deal amount</Label>
                                <Input name="deal_amount" placeholder={"eg. ₹,9,89,949"} type="number" />
                            </div>
                            <div>
                                <Label className="text-sm">Deal type</Label>
                                <Select
                                    name="status"
                                    onValueChange={(value) => handleSelectChange("quotation_type", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="One time /monthly" />
                                    </SelectTrigger>
                                    <SelectContent className="border border-gray-300">
                                        <SelectGroup>
                                            <SelectLabel>select one of them</SelectLabel>
                                            <SelectItem value="onetime">Onetime</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </section>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"} onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant={"default"} onClick={handleSubmit}>
                        {
                            loader ? <Spinner /> : "Reapeat deal"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

