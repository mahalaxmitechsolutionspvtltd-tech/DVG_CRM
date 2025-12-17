import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Field,   FieldLabel,  } from "../ui/field";
import { Input } from "../ui/input";


export default function AddDeals() {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'default'} className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus /> Add Deals
                    </Button>
                </DialogTrigger>
                <DialogContent className=" border border-gray-300">
                    <DialogHeader>
                        <DialogTitle>Add deal</DialogTitle>
                    </DialogHeader>
                    {/* containt will be added heare */}
                    <div>
                        <div className="grid grid-cols-1 gap-2">
                            <div className="grid grid-cols-1 gap-2">
                                <Field>
                                    <FieldLabel>Company name</FieldLabel>
                                    <Input type="text" placeholder="Compnay name.." />
                                </Field>
                                <Field>
                                    <FieldLabel>Owner</FieldLabel>
                                    <Input type="text" placeholder="Owner name.." />
                                </Field>
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input type="email" placeholder="test@gmail.com" />
                                </Field>

                            </div>
                            <div className="flex gap-2">
                                <Field>
                                    <FieldLabel>Contact </FieldLabel>
                                    <Input type="number" placeholder="Deal value.." />
                                </Field>

                                <Field>
                                    <FieldLabel>Deal value</FieldLabel>
                                    <Input type="number" placeholder="Deal value.." />
                                </Field>

                            </div>
                        </div>


                    </div>

                    <DialogFooter >
                        <DialogClose asChild>
                            <Button className="bg-gray-700" variant={"default"}>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </>
    )
}
