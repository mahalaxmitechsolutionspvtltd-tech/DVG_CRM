import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import type { Netwoks } from "../../lib/types";


export default function AddNetwok() {
    const [formdata, setFormData] = useState<Netwoks[]>([]);

    const handleSubmit = async () => {
     
    }








    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'default'} className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus /> Add Network
                    </Button>
                </DialogTrigger>
                <DialogContent className=" border border-gray-300  ">
                    <DialogHeader>
                        <DialogTitle>Add Network</DialogTitle>
                    </DialogHeader>
                    {/* containt will be added heare */}
                    <div>
                        <div className="grid grid-cols-1 gap-2">
                            <div className="grid grid-cols-1 gap-2">
                                <Field>
                                    <FieldLabel>Name</FieldLabel>
                                    <Input className="border border-gray-300 shadow-none" type="text" placeholder="Enter full name.." />
                                </Field>
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input className="border border-gray-300 shadow-none" type="email" placeholder="example@gmail.com" />
                                </Field>
                                <Field>
                                    <FieldLabel>Contact </FieldLabel>
                                    <Input className="border border-gray-300 shadow-none" type="text" placeholder="eg.987xxxxxx" />
                                </Field>
                                <div className="flex gap-2">
                                    <Field className="">
                                        <FieldLabel>Type of Connect </FieldLabel>
                                        <Select>
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Select type of connect" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-300 ">
                                                <SelectGroup>
                                                    <SelectLabel>type of connect</SelectLabel>
                                                    <SelectItem value="HVT">HVT-High Value Target</SelectItem>
                                                    <SelectItem value="HII">HII- High Influence Individual</SelectItem>
                                                    <SelectItem value="BA">BA-Business Associate</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Industry Connects</FieldLabel>
                                        <Input className="border border-gray-300 shadow-none" type="text" placeholder="type and press enter.." />
                                    </Field>
                                </div>

                            </div>
                        </div>


                    </div>

                    <DialogFooter >
                        <DialogClose asChild>
                            <Button className="bg-gray-700" variant={"default"}>
                                Add
                            </Button>
                        </DialogClose>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </>
    )
}
