import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useCallback, useState } from "react";
import type { Netwoks } from "../../lib/types";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";
import { addNetwork } from "../../apiHandlers/NetworkHandler";
import { industryType } from "../../lib/storeag";

import ComboboxMultipleExpandable from "../ui/ComboboxMultipleExpandable";



const NetworkForm: Partial<Netwoks> = {
    full_name: "",
    email: "",
    mobile: "",
    remarks: "",
    type_of_industries: []
}
interface childProps {
    onSuccess: (isSuccess: boolean) => void;
    errormsg?: (msg: string) => void;
}

// function start form hear
export default function AddNetwok({ onSuccess, errormsg }: childProps) {
    const [formdata, setFormData] = useState<Partial<Netwoks>>(NetworkForm);
    const [open, setOpen] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formdata,
            [name]: value
        })
    }
    const handleSelectChange = useCallback((value: string[]) => {
        setFormData(prev => ({
            ...prev,
            type_of_industries: value
        }));
    }, []);

    const handleTextArea = (name: string, value: string,) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }


    const handleSubmit = async () => {
        console.log(formdata);
        setLoader(true)
        try {
            const resp = await addNetwork(formdata);
            if (resp.data) {
                onSuccess(true);
                setLoader(false);
            }

        } catch (error) {
            console.log("some thing went wrong..");
            if (errormsg) {
                errormsg("Failed to add network. Please try again.");
            }
            setLoader(false);
        }
        finally {
            setOpen(false);
        }
    }


    return (
        <>
            <Dialog open={open} >
                <DialogTrigger asChild>
                    <Button onClick={() => setOpen(true)} variant={'default'} className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus /> Add Network
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className=" border border-gray-300 lg:max-w-xl"

                >
                    <DialogHeader>
                        <DialogTitle>Add Network</DialogTitle>
                    </DialogHeader>
                    {/* containt will be added heare */}
                    <div>
                        <div className="grid grid-cols-1 gap-2">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="grid grid-cols-1 lg:grid-col-2 xl:grid-cols-2 2xl:xl:grid-cols-2 gap-2">
                                    <Field>
                                        <FieldLabel>Full name</FieldLabel>
                                        <Input
                                            className="border border-gray-300 shadow-none"
                                            type="text"
                                            placeholder="Enter full name.."
                                            name="full_name"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Contact number </FieldLabel>
                                        <Input
                                            className="border border-gray-300 shadow-none"
                                            type="text"
                                            placeholder="eg.987xxxxxx"
                                            name="mobile"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </Field>

                                </div>
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input
                                        className="border border-gray-300 shadow-none"
                                        type="email"
                                        placeholder="example@gmail.com"
                                        name="email"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Field>
                                <Field className="">
                                    <FieldLabel>Type of Industry</FieldLabel>
                                    <ComboboxMultipleExpandable
                                        list={industryType}
                                        placeholder="Type of industries"
                                        onSelect={handleSelectChange}

                                    />
                                </Field>
                                <Field>
                                    <FieldLabel>Remark</FieldLabel>
                                    <Textarea
                                        className="border border-gray-300 shadow-none"
                                        placeholder="type and press enter.."
                                        name="remarks"
                                        onChange={(e) => handleTextArea("remarks", e.target.value)}

                                    />
                                </Field>
                            </div>
                        </div>
                    </div>

                    <DialogFooter >
                        <div className="flex gap-2">
                            <Button onClick={() => setOpen(false)} variant={"outline"}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} variant={"default"}>
                                {
                                    loader ? <Spinner /> : "Add Network"
                                }
                            </Button>
                        </div>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </>
    )
}
