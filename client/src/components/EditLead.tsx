
import { Button } from "./ui/button";
import { ChevronDown, Edit, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "./ui/select";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "./ui/multi-select";
import { Textarea } from "./ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState, type ChangeEventHandler } from "react";
import type { Lead } from "../lib/types";
import type { FollowUp } from "../lib/types";
import { updateLeadHandler } from "../apiHandlers/LeadHandler";
// import { updateLeadHandler } from "../apiHandlers/LeadHandler";



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
    { lable: 'Logo, Branding & Guidelines', value: 'Logo, Branding & Guidelines' },
    { lable: 'Start-up Development (App + Software + ERP)', value: 'Start-up Development (App + Software + ERP)' },
    { lable: 'Enterprise Resources Planning Software', value: 'Enterprise Resources Planning Software' },
    { lable: 'HRMS Software', value: 'HRMS Software' },
    { lable: 'Customer Relationship Management - CRM Software', value: 'Customer Relationship Management - CRM Software' },
    { lable: 'Company Profile & Business Profile', value: 'Company Profile & Business Profile' },
];




interface childProps {
    onSuccess: (isSuccess: boolean) => void;
    leads: Lead
}



export default function EditLead({ onSuccess,leads }: childProps) {
    const [formdata, setFormData] = useState<Lead>(leads);
    const [isNewValue, setNewValue] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
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
        // autoSaveForm();
        const newFollowUp: FollowUp = {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            note: '',
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



    const autoSaveForm = async (e: any) => {
        if (!e) {
            const resp = await updateLeadHandler(formdata);

            if (resp?.data.success) {
                onSuccess(true);
            } 
        }

    }

    return (

        <div className=" overflow-auto overflow-y-auto">
            <Dialog onOpenChange={autoSaveForm}>
                <DialogTrigger asChild>
                    <div className="flex gap-2">
                        <Edit className="my-auto " />Edit lead
                    </div>
                </DialogTrigger>
                <DialogContent className="p-10 lg:max-w-7xl border bg-white border-gray-400 max-h-[90vh] overflow-y-auto  hide-scrollbar" >


                    <DialogHeader>
                        <DialogTitle className="text-center">Add Leads</DialogTitle>
                    </DialogHeader>
                    <hr className="text-gray-300 my-2" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 2xl:grid-cols-12 gap-5 overflow-y-auto h-xl mt-2">

                        <div className="col-span-8 grid gap-5">
                            {/* company section */}
                            <section className="border border-gray-300 rounded-sm">
                                <div className="bg-gray-100 text-center  py-2">
                                    <h3 className="text-gray-900 font-medium">Company details</h3>
                                </div>
                                <div className="p-3">
                                    <div className="my-3">
                                        <label htmlFor="cname">Company name</label>
                                        <Input
                                            value={formdata.company_name ?? ""}
                                            onKeyDown={(e) => e.stopPropagation()}
                                            name="company_name"
                                            onChange={(e) => handleInputChange(e)}
                                            placeholder="company name.."
                                            required />
                                    </div>

                                    <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                                        {/* company type */}
                                        <div>
                                            <label htmlFor="">Company type</label>
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
                                            <label htmlFor="">Nature of Business</label>

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

                                    {/* GST number */}
                                    <div className="my-3">
                                        <label htmlFor="gstno">GST Number(optional)</label>
                                        <Input
                                            value={formdata.gst_no ?? ""}
                                            name="gst_no"
                                            onKeyDown={(e) => e.stopPropagation()}
                                            onChange={(e) => handleInputChange(e)}
                                            placeholder="Gst number.." />
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
                                        <Input
                                            value={formdata.contact1_name ?? ""}
                                            name="contact1_name"
                                            onChange={(e) => handleInputChange(e)}
                                            required
                                            placeholder="Name and contact.."
                                            onKeyDown={(e) => e.stopPropagation()}

                                        />
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-2">
                                        <div >
                                            <label htmlFor="gstno">Secondary Contact </label>
                                            <Input
                                                value={formdata.contact2_name ?? ""}
                                                name="contact2_name"
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder="Name and contact."
                                                onKeyDown={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                        <div >
                                            <label htmlFor="gstno">Tertiary Contact </label>
                                            <Input
                                                value={formdata.contact3_name ?? ""}
                                                name="contact3_name"
                                                onChange={(e) => handleInputChange(e)}
                                                onKeyDown={(e) => e.stopPropagation()}
                                                placeholder="Name and contact." />
                                        </div>
                                    </div>
                                    {/* email */}
                                    <div>
                                        <label htmlFor="gstno">Email</label>
                                        <Input
                                            value={formdata.email ?? ""}
                                            name="email"
                                            onChange={(e) => handleInputChange(e)}
                                            required
                                            onKeyDown={(e) => e.stopPropagation()}
                                            placeholder="sample@gmail.com.."
                                        />
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
                                        <label htmlFor="location">Location</label>
                                        <Input
                                            value={formdata.address_line1 ?? ""}
                                            name="address_line1"
                                            onChange={(e) => handleInputChange(e)}
                                            onKeyDown={(e) => e.stopPropagation()}
                                            placeholder="e.g 123, Mumbai 400001,India"
                                        />
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
                                        <label htmlFor="status">Status</label>
                                        <Select
                                            value={formdata.status ?? ""}
                                            name="status"
                                            onValueChange={(value) => handleSelectChange("status", value)}
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
                                        <MultiSelect

                                            onValuesChange={(e) => setFormData((prev) => ({
                                                ...prev,
                                                service_requirements: e
                                            }))}>
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
                                        <label htmlFor="gstno">Client's porblem statment</label>
                                        <Textarea
                                            value={formdata.problem_statement ?? ""}
                                            onChange={(e) => handleTextArea("problem_statement", e.target.value)}
                                            placeholder="porblem statment.."
                                            onKeyDown={(e) => e.stopPropagation()}
                                        />
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="gstno">Remark</label>
                                        <Textarea
                                            value={formdata.remarks ?? ""}
                                            name="remarks"
                                            onChange={(e) => handleTextArea("remarks", e.target.value)}
                                            placeholder="Remark.."
                                            onKeyDown={(e) => e.stopPropagation()}
                                        />
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
                                            formdata.follow_ups?.length === 0 ? (
                                                <div>
                                                    <h4 className="text-gray-400 text-center">No follow up......</h4>
                                                </div>
                                            ) : (

                                                formdata.follow_ups?.map((item, index) => (
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
                                                                onKeyDown={(e) => e.stopPropagation()}
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
                    <DialogFooter className=" mt-5">
                        <DialogClose asChild>
                            <Button variant={"default"}>Add</Button>
                        </DialogClose>
                    </DialogFooter>



                </DialogContent>
            </Dialog >

        </div>
    )
}

