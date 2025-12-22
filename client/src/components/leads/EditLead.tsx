
import { Button } from "../ui/button";
import { Asterisk, ChevronDown, Edit, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "../ui/select";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "../ui/multi-select";
import { Textarea } from "../ui/textarea";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";

import type { Lead } from "../../lib/types";
import type { FollowUp } from "../../lib/types";
import { updateLeadHandler } from "../../apiHandlers/LeadHandler";
import { Separator } from "../ui/separator";
import { Field, FieldLabel } from "../ui/field";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";
import { useState } from "react";




const businessNatureOptions = [
    { lable: "Food Manufacturing", value: "Food Manufacturing" },
    { lable: "Clothing Brand & Cloth Manufacturing", value: "Clothing Brand & Cloth Manufacturing" },
    { lable: "Ad Agency", value: "Ad Agency" },
    { lable: "Marketing Agency", value: "Marketing Agency" },
    { lable: "Electrical, Engineering Goods Manufacturing", value: "Electrical, Engineering Goods Manufacturing" },
    { lable: "Agriculture Business", value: "Agriculture Business" },
    { lable: "Jwellery - Retailer & Wholeseller", value: "Jwellery - Retailer & Wholeseller" },
    { lable: "Service Industry", value: "Service Industry" },
];

const companyType = [
    { lable: 'Properitor', value: 'Properitor' },
    { lable: 'Partnership-deed', value: 'Partnership-deed' },
    { lable: 'Limited Liability Partnership (LLP)', value: 'Limited Liability Partnership (LLP)' },
    { lable: 'Private Limited (Pvt Ltd)', value: 'Private Limited (Pvt Ltd)' },
    { lable: 'Public Limited Company (PLC)', value: 'Public Limited Company (PLC)' },
    { lable: 'Hindu Undivided Family Firm (HUF)', value: 'Hindu Undivided Family Firm (HUF)' },
    { lable: 'Hindu Undivided Family Firm (HUF)', value: 'Government Organisation' },
];

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
    { lable: 'Logo,Branding & Guidelines', value: 'Logo, Branding & Guidelines' },
    { lable: 'Startup Development (App+Software+ERP)', value: 'Start-up Development (App + Software + ERP)' },
    { lable: 'Enterprise Resources Planning Software', value: 'Enterprise Resources Planning Software' },
    { lable: 'HRMS Software', value: 'HRMS Software' },
    { lable: 'Customer Relationship Management-CRM Software', value: 'Customer Relationship Management - CRM Software' },
    { lable: 'Company Profile & Business Profile', value: 'Company Profile & Business Profile' },
];




interface childProps {
    onSuccess: (isSuccess: boolean) => void;
    leads: Lead
}



export default function EditLead({ onSuccess, leads }: childProps) {
    const [formdata, setFormData] = useState<Lead>(leads);
    const [isNewValue, setNewValue] = useState(false);
    const [isDeal, setDeal] = useState(false);
    const [errors, setFormErrors] = useState<Lead>();
    const [open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [openDropLead, setOpenDropLead] = useState<boolean>(false);



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

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

    const handleFollowUpAdd = () => {

        const newFollowUp: FollowUp = {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            note: '',
            expenses: '',
            completed: false,
            timestamp: Date.now()
        };

        setFormData((prev: any) => ({
            ...prev,
            follow_ups: [newFollowUp, ...(prev?.follow_ups || [])]
        }));

    };

    const updateFollowUp = (id: string, field: keyof FollowUp, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            follow_ups: prev.follow_ups.map((item: any) => item.id === id ? { ...item, [field]: value } : item)
        }));
    };


    const handleSubmit = async () => {
        setLoader(true)
        const resp = await updateLeadHandler(formdata);

        if (resp?.data.success) {
            onSuccess(true);
            setOpen(false)
            setLoader(false)
        }
        else {
            setFormErrors(resp.data.errors)
        }
    }
    return (

        <div className=" overflow-auto overflow-y-auto">
            <Dialog open={open}>
                <DialogTrigger asChild>
                    <div className="flex gap-2" onClick={() => setOpen(true)}>
                        <Edit className="my-auto " />Edit Lead
                    </div>
                </DialogTrigger>
                <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className=" lg:max-w-7xl border bg-white border-gray-400    hide-scrollbar">

                    <DialogHeader>
                        <DialogTitle className="text-center">Edite Leads</DialogTitle>
                    </DialogHeader>


                    <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 2xl:grid-cols-12 gap-5 overflow-y-auto h-xl ">

                        <div className="col-span-8 grid gap-1">
                            {/* company section */}
                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center  py-2">
                                    <h3 className="text-gray-900 font-medium">Company details</h3>
                                </div>
                                <div className="p-3">
                                    <div className="my-3">

                                        <FieldLabel className="text-sm">Company name <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                        <Input
                                            value={formdata.company_name ?? ""}
                                            onKeyDown={(e) => e.stopPropagation()}
                                            name="company_name"
                                            onChange={(e) => handleInputChange(e)}
                                            placeholder={errors?.company_name ? errors.company_name![0] : "company name.."}
                                            className={`${errors?.company_name ? "border-2 border-red-600 text-red-600" : ""} select-none`}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                                        {/* company type */}
                                        <div>

                                            <FieldLabel className="text-sm">Company type</FieldLabel>
                                            <Select
                                                value={formdata.company_type ?? ""}
                                                onValueChange={(value) => handleSelectChange("company_type", value)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Company type" />
                                                </SelectTrigger>
                                                <SelectContent className="border border-gray-300">
                                                    <SelectGroup>
                                                        <SelectLabel>companies types</SelectLabel>
                                                        {
                                                            companyType.map((item, index) => (
                                                                <SelectItem key={index} value={item.value}>{item.lable}</SelectItem>
                                                            ))

                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {/* company nature */}
                                        <div>
                                            <FieldLabel className="text-sm">Nature of bussines</FieldLabel>

                                            {!isNewValue ? (
                                                <Select
                                                    value={formdata.nature_of_business ?? ""}
                                                    name="nature_of_business"
                                                    onValueChange={(value) => {
                                                        value === "other" ? setNewValue(true) : handleSelectChange("nature_of_business", value)
                                                    }}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="nature of business" />
                                                    </SelectTrigger>
                                                    <SelectContent className="border border-gray-300">

                                                        <SelectGroup>

                                                            <SelectLabel>Nature of Business</SelectLabel>
                                                            {
                                                                businessNatureOptions.map((opt, index) => (
                                                                    <SelectItem key={index} value={opt.value}>{opt.lable}</SelectItem>
                                                                ))
                                                            }
                                                            <SelectItem value="other">
                                                                <Button variant={"ghost"} >
                                                                    <Plus /> Add new business of nature....
                                                                </Button>
                                                            </SelectItem>

                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            )
                                                :
                                                (
                                                    <div className="relative">
                                                        <Input
                                                            value={formdata.nature_of_business ?? ""}
                                                            placeholder="Add new nature of business"
                                                            name="nature_of_business"
                                                            onKeyDown={(e) => e.stopPropagation()}
                                                            onChange={(e) => handleInputChange(e)}
                                                        />
                                                        <Button onClick={() => setNewValue(false)} className=" z-1 absolute right-1 top-0.5" type="button" variant={"ghost"}>  <ChevronDown className="text-gray-500" /></Button>
                                                    </div>
                                                )


                                            }

                                        </div>
                                    </div>

                                    {/* GST number & Pan car */}
                                    <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                                        <div className="my-3">
                                            <label htmlFor="gstno"></label>
                                            <FieldLabel className="text-sm">GST Number</FieldLabel>
                                            <Input
                                                value={formdata.gst_no ?? ""}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                className=" uppercase text-blue-700 font-semibold"
                                                max={15}
                                                name="gst_no"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder="eg.27AAAAP0267H2ZN" />
                                        </div>
                                        <div className="my-3">

                                            <FieldLabel>PAN number<Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input
                                                value={formdata.pan_number ?? ""}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                required
                                                name={"pan_number"}
                                                max={10}
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={errors?.pan_number ? errors.pan_number![0] : "eg.ABCDE0123F"}
                                                className={`${errors?.pan_number ? "border-2 border-red-600 text-red-600" : ""}  uppercase text-blue-700 font-semibold`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Contacts and kyes */}

                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Key Contacts</h3>
                                </div>

                                {/*person contacts */}
                                <div className="p-3 grid gap-4 ">

                                    {/* primary person */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>
                                            <FieldLabel className="text-sm">Primary Contact Name <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input
                                                value={formdata.primary_person_name ?? ""}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                type="text"
                                                name="primary_person_name"
                                                onChange={(e) => handleInputChange(e)}
                                                required
                                                placeholder={errors?.primary_person_name ? errors.primary_person_name![0] : "Full name"}
                                                className={` ${errors?.primary_person_name![0] ? "border-2 border-red-600 text-red-600" : ""}`}
                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm">Primary Contact number <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input
                                                value={formdata.primary_person_contact ?? ""}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                type="tel"
                                                name="primary_person_contact"
                                                onChange={(e) => handleInputChange(e)}
                                                required
                                                placeholder={errors?.primary_person_contact ? errors.primary_person_contact![0] : "eg.98473xxxx"}
                                                className={` ${errors?.primary_person_contact![0] ? "border border-red-600 text-red-600" : ""}`}
                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm">Primary contact email <Asterisk className="-mx-1.5 w-3 h-3 text-red-500" /></FieldLabel>
                                            <Input
                                                value={formdata.primary_person_email ?? ""}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                type="email"
                                                name="primary_person_email"
                                                onChange={(e) => handleInputChange(e)}
                                                required
                                                placeholder={errors?.primary_person_email ? errors.primary_person_email![0] : "Full name"}
                                                className={` ${errors?.primary_person_email![0] ? "border border-red-600 text-red-600" : ""}`}
                                            />
                                        </div>
                                    </div>

                                    {/* secondary person */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>

                                            <FieldLabel className="text-sm">Secondary Contact Name </FieldLabel>
                                            <Input
                                                value={formdata.secondary_person_name ?? ""}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                type="text"
                                                name="secondary_person_name"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={"Full name"}

                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm">Secondary Contact number </FieldLabel>
                                            <Input
                                                value={formdata.secondary_person_contact ?? ""}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                type="tel"
                                                name="secondary_person_contact"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={"number"}

                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm">Secondary contact email </FieldLabel>
                                            <Input
                                                value={formdata.secondary_person_email ?? ""}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                type="email"
                                                name="secondary_person_email"
                                                onChange={(e) => handleInputChange(e)}

                                                placeholder={"email"}
                                            />
                                        </div>
                                    </div>

                                    {/* Teritiary person */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <div>

                                            <FieldLabel className="text-sm">Tertiary Contact Name </FieldLabel>
                                            <Input
                                                value={formdata.tertiary_person_name ?? ""}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                type="text"
                                                name="tertiary_person_name"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={"Full name"}
                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm">Tertiary Contact number</FieldLabel>
                                            <Input
                                                value={formdata.tertiary_person_contact ?? ""}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                type="tel"
                                                name="tertiary_person_contact"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={"number"}
                                            />
                                        </div>
                                        <div>

                                            <FieldLabel className="text-sm">Tertiary contact email </FieldLabel>
                                            <Input
                                                value={formdata.tertiary_person_email ?? ""}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                type="email"
                                                name="tertiary_person_email"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder={"email"}

                                            />
                                        </div>
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

                                        <FieldLabel className="text-sm">Location</FieldLabel>
                                        <Input
                                            value={formdata.address_line1 ?? ""}
                                            onKeyDown={(e) => e.stopPropagation()}
                                            name="address_line1"
                                            onChange={(e) => handleInputChange(e)}
                                            placeholder="e.g 123, Mumbai 400001,India" />
                                    </div>
                                </div>

                            </section>
                        </div>

                        {/* second column */}

                        <div className="col-span-4 grid gap-1">
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
                                            value={formdata.status ?? ""}
                                            onValueChange={(value) => {
                                                value == "Quotation sent" ? setDeal(true) : setDeal(false),
                                                    value == "Lead dropped" ? setOpenDropLead(true) : setOpenDropLead(false);

                                                handleSelectChange("status", value)
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-300">
                                                <SelectGroup>
                                                    <SelectLabel>Select</SelectLabel>
                                                    <SelectItem value="Cold">Cold</SelectItem>
                                                    <SelectItem value="Warm">Warm </SelectItem>
                                                    <SelectItem value="Hot">Hot</SelectItem>
                                                    <SelectItem value="Quotation sent">Quotation sent</SelectItem>
                                                    <SelectItem value="Lead dropped">Lead drop</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {
                                    isDeal ? (
                                        <div className="p-3 grid  gap-2">
                                            <Separator />
                                            <div>

                                                <FieldLabel className="text-sm">Deal</FieldLabel>
                                                <section className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <FieldLabel className="text-sm" htmlFor="bussiess value">Bussiness value</FieldLabel>
                                                        <Input
                                                            value={formdata.quotation_amount ?? ""}
                                                            onKeyDown={(e) => e.stopPropagation()}
                                                            onChange={handleInputChange}
                                                            name="quotation_amount"
                                                            id="bussiess value"
                                                            placeholder="₹" type="number" />
                                                    </div>
                                                    <div>

                                                        <FieldLabel className="text-sm">Steps</FieldLabel>
                                                        <Select
                                                            name="status"
                                                            value={formdata.quotation_type ?? ""}
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
                                    ) : ""
                                }

                                {/* Drop lead reason and dialog */}

                                <Dialog open={openDropLead} onOpenChange={setOpenDropLead}>
                                    <DialogContent className=" border border-gray-300">
                                        <DialogHeader>
                                            <DialogTitle className="">Drop lead</DialogTitle>
                                            <DialogDescription className="text-gray-700">Give the proper reason ,why are you droping the lead.</DialogDescription>
                                        </DialogHeader>
                                        <div>
                                            <Field>
                                                <FieldLabel>Reason for Drop lead</FieldLabel>
                                                <Textarea
                                                    name='drop_lead_reason'
                                                    onChange={(e) => handleTextArea('drop_lead_reason', e.target.value)}
                                                />
                                            </Field>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={() => setOpenDropLead(false)} variant={"outline"}>Close</Button>
                                            <Button onClick={handleSubmit}>
                                                {
                                                    loader ? <Spinner /> : " Drop lead"

                                                }
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                            </section>

                            {/* Requirements */}
                            <section className="border border-gray-300 rounded-sm ">

                                <div className="bg-gray-100 text-center py-2">
                                    <h3 className="text-gray-900 font-medium">Requirements</h3>
                                </div>

                                <div className="p-3 grid gap-1">

                                    {/*Requirements */}
                                    <div className="">

                                        <FieldLabel className="text-sm">Required Services</FieldLabel>
                                        <MultiSelect
                                            defaultValues={formdata.service_requirements ?? []}
                                            onValuesChange={(e) => setFormData((prev) => ({
                                                ...prev,
                                                service_requirements: e
                                            }))}>
                                            <MultiSelectTrigger value={formdata.service_requirements ?? []}
                                                className="w-full min-h-10 flex items-center tracking-tight"
                                            >
                                                <MultiSelectValue
                                                    className=" max-h-20 grid grid-cols-1 overflow-y-scroll py-1"
                                                    placeholder="Select services..."
                                                />
                                            </MultiSelectTrigger>

                                            <MultiSelectContent className="border border-gray-300">

                                                <MultiSelectGroup className="border border-gray-300">
                                                    {
                                                        requirement.map((item, index) => (

                                                            <MultiSelectItem className="" key={index} value={item.value}>{item.lable}</MultiSelectItem>
                                                        ))
                                                    }

                                                </MultiSelectGroup>

                                            </MultiSelectContent>
                                        </MultiSelect>
                                        <div className="flex p-1 flex-wrap gap-1 max-h-24 overflow-y-auto custom-scrollbar  border rounded-sm border-gray-300 mt-1">
                                            {
                                                formdata.service_requirements?.map((items, index) => (
                                                    <Badge className=" font-light text-[10px]" key={index}>{items}</Badge>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {/* problem statument  */}
                                    <div className="col-span-full ">

                                        <FieldLabel className="text-sm">Client's porblem statment</FieldLabel>
                                        <Textarea
                                            value={formdata.problem_statement ?? ""}
                                            onKeyDown={(e) => e.stopPropagation()}
                                            onChange={(e) => handleTextArea("problem_statement", e.target.value)}
                                            placeholder="porblem statment.." />
                                    </div>

                                    <div className="col-span-full">

                                        <FieldLabel className="text-sm">Remark</FieldLabel>
                                        <Textarea
                                            value={formdata.remarks ?? ""}
                                            onKeyDown={(e) => e.stopPropagation()}
                                            name="remarks"
                                            onChange={(e) => handleTextArea("remark", e.target.value)}
                                            placeholder="Remark.." />
                                    </div>

                                </div>
                            </section>

                            {/* Follow up's */}
                            <section className="border p-3 border-gray-300 rounded-sm">
                                <div className="bg-amber-200">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-full">
                                                <Plus />Add Follow up's
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="border border-gray-300 rounded-sm overflow-clip lg:max-w-lg min-h-1/4 max-h-22/4 py-10">
                                            <DialogHeader>
                                                <DialogTitle>Follow up</DialogTitle>
                                            </DialogHeader>
                                            <div>
                                                <div className="max-h-[95%] overflow-y-auto pr-1 custom-scrollbar">
                                                    {
                                                        formdata.follow_ups?.length === 0 ? (
                                                            <div>
                                                                <h4 className="text-gray-400 text-center">No follow up......</h4>
                                                            </div>
                                                        ) : (

                                                            formdata.follow_ups?.map((item, index) => (
                                                                <div key={index} className="">
                                                                    <div className="mt-2 border border-gray-200 rounded-sm relative">
                                                                        <Badge className="w-4 h-4 text-sm bg-gray-400 absolute left-40 top-2" variant={"default"}>{index + 1}</Badge>
                                                                        <div className="grid grid-cols-2">
                                                                            <Input
                                                                                value={item.date}
                                                                                type="date"
                                                                                name="date"
                                                                                tabIndex={-1}
                                                                                onFocus={(e) => {
                                                                                    const input = e.target as HTMLInputElement
                                                                                    input.setSelectionRange(input.value.length, input.value.length)
                                                                                }}
                                                                                onChange={(e) => updateFollowUp(item.id, 'date', e.target.value)}
                                                                                className="rounded-none   focus-visible:ring-0 "

                                                                            />
                                                                            <Input
                                                                                value={item.expenses ?? "Add expenses"}
                                                                                type="text"
                                                                                tabIndex={-1}
                                                                                placeholder="Add expenses...."
                                                                                onFocus={(e) => {
                                                                                    const input = e.target as HTMLInputElement
                                                                                    input.setSelectionRange(input.value.length, input.value.length)
                                                                                }}
                                                                                name="expenses"
                                                                                onKeyDown={(e) => e.stopPropagation()}
                                                                                onChange={(e) => { updateFollowUp(item.id, 'expenses', e.target.value) }}
                                                                                className="rounded-none   focus-visible:ring-0 "

                                                                            />
                                                                        </div>
                                                                        <Textarea
                                                                            cols={2}
                                                                            tabIndex={-1}
                                                                            value={item.note}
                                                                            onChange={(e) => updateFollowUp(item.id, 'note', e.target.value)}
                                                                            onKeyDown={(e) => e.stopPropagation()}
                                                                            placeholder="Add your query.."
                                                                            className="border-none  focus-visible:ring-0 "
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        )
                                                    }
                                                </div>
                                            </div>

                                            <div className="w-full absolute bottom-0 p-3 bg-white">
                                                <Button onClick={handleFollowUpAdd} variant={"outline"} className=" hover:bg-blue-400 w-full rounded-sm">
                                                    <Plus />Add Follow
                                                </Button>
                                            </div>

                                        </DialogContent>
                                    </Dialog>
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
                                loader ? <Spinner /> : "Update Lead"
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent >
            </Dialog >

        </div >
    )
}

