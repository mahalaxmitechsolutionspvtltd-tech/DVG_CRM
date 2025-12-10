
import { useState, type FormEvent } from "react";
import { cn } from "../lib/utils.ts"
import { Button } from "../components/ui/button.tsx"
import { Card, CardContent } from "../components/ui/card.tsx";

import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    // FieldSeparator,
} from "../components/ui/field.tsx"

import { Input } from "../components/ui/input.tsx"
import { Link, useNavigate } from "react-router-dom";
import { EyeClosed, EyeIcon, Loader } from "lucide-react";

import { useAuth } from "./AuthProvider.tsx";
import signupHandler from "./authHandlers/signupHandler.tsx";
import type { FormErrors, FormData } from "../lib/types.ts";



export function Signup({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const { isloading, setLoding } = useAuth();
    const navigate = useNavigate();

    const [hidePassword, setHidePassword] = useState(true);

    const [formdata, setFormData] = useState<FormData>({
        full_name: "",
        email: "",
        password: "",
        mobile_no: null,
    });

    const [errors, setErrors] = useState<FormErrors>({
        full_name: "",
        email: "",
        password: "",
        mobile_no: ""
    });

    const handelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

    }

    const handleSumit = async (e: FormEvent) => {
        e.preventDefault();
        setLoding(true);
        const result = await signupHandler(formdata, setLoding, setErrors);
        
        setFormData({
            full_name: " ",
            email: " ",
            password: " ",
            mobile_no: " "
        });

        if (result) {
            navigate("/login");
        }

    }




    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">

            <div className="w-full max-w-sm md:max-w-4xl">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card className="overflow-hidden p-0 border border-gray-300">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <form className="p-6 md:p-8" onSubmit={(e) => handleSumit(e)}>
                                <FieldGroup>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <h1 className="text-2xl font-bold">Create your account</h1>
                                        <p className="text-muted-foreground text-sm text-balance">
                                            Enter your email , mobile number and password below to create your account
                                        </p>
                                    </div>
                                    <Field>
                                        <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
                                        <Input
                                            id="fullname"
                                            type="text"
                                            placeholder={errors?.full_name ? errors?.full_name : "your name..."}
                                            value={formdata.full_name ?? ""}
                                            name="full_name"
                                            className={`${errors?.full_name ? "border-2 border-red-600 placeholder:text-red-600" : ""}`}
                                            onChange={(e) => handelOnChange(e)}
                                        />

                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder={errors?.email ? errors?.email : "sample@gmail.com"}
                                            className={`${errors?.email ? "border-2 border-red-600 placeholder:text-red-600" : ""}`}
                                            value={formdata.email ?? " "}
                                            name="email"
                                            onChange={(e) => handelOnChange(e)}

                                        />

                                    </Field>
                                    <Field>
                                        <Field className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
                                            <Field className="md:col-span-1">
                                                <FieldLabel htmlFor="mobile">Mobile number</FieldLabel>
                                                <Input
                                                    id="mobile"
                                                    type="tel"
                                                    value={formdata.mobile_no ?? ""}
                                                    placeholder={errors?.mobile_no ? errors?.mobile_no : "12345678909"}
                                                    className={`${errors?.mobile_no ? "border-2 border-red-600 placeholder:text-red-600" : ""}`}

                                                    name="mobile_no"
                                                    onChange={(e) => handelOnChange(e)}
                                                />
                                            </Field>
                                            <Field >
                                                <FieldLabel htmlFor="confirm-password">
                                                    Create Password
                                                </FieldLabel>
                                                <div className="flex relative">
                                                    <Input
                                                        id="confirm-password"
                                                        type={hidePassword ? "password" : "text"}
                                                        value={formdata.password ?? ""}

                                                        placeholder={errors?.password ? errors?.password : "password"}
                                                        className={`${errors?.password ? "border-2 border-red-600 placeholder:text-red-600" : ""}`}

                                                        name="password"
                                                        onChange={(e) => handelOnChange(e)}
                                                    />
                                                    {
                                                        hidePassword ? <EyeClosed onClick={() => setHidePassword(!hidePassword)} width={18} height={18} className="transition-all  absolute top-[25%] right-2" />
                                                            :
                                                            <EyeIcon onClick={() => setHidePassword(!hidePassword)} width={18} height={18} className=" transition-all absolute top-[25%] right-2" />

                                                    }
                                                </div>

                                            </Field>
                                        </Field>

                                    </Field>
                                    <Field>
                                        <Button type="submit">
                                            {
                                                isloading ? <Loader className="w-18 h-18 animate-spin" /> : " Create Account"
                                            }

                                        </Button>
                                    </Field>
                                    {/* <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator> */}

                                    <FieldDescription className="text-center">
                                        Already have an account? <Link to={"/login"}>Sign in</Link>
                                    </FieldDescription>
                                </FieldGroup>
                            </form>
                            <div className="bg-muted relative hidden md:block">
                                <img
                                    src="./src/assets/images/bwink_bld_03_single_03.jpg"
                                    alt="Image"
                                    className="absolute inset-0 h-full w-full object-cover "
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <FieldDescription className="px-6 text-center">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Conditions</a>
                    </FieldDescription>

                </div>
            </div>

        </div>
    )
}





