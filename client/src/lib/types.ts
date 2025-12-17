import type { Dispatch, SetStateAction } from "react";

export interface FormData {
    full_name?: string | null,
    email: string | null,
    password: string | null,
    mobile_no?: number | null | string
}

export interface LoginData {
    email?: string | null;
    password?: string | null;
}
export interface LoginErrors {
    email?: string | null;
    password?: string | null;
}


export interface FormErrors {
    full_name?: string;
    email?: string;
    password?: string;
    mobile_no?: string;
}


export interface AuthProviderProps {
    children: React.ReactNode;

}

export interface User {
    id: string;
    email: string;
    username: string;
    mobile: number | string;

}

export interface AuthContextType {
    user: User | null;
    login: (user: User) => Promise<void>;
    logout: () => Promise<void>;
    isloading: boolean;
    setLoding: Dispatch<SetStateAction<boolean>>

}

export type LeadStatus =
    | 'Cold'
    | 'Warm'
    | 'Hot'
    | 'Quotation Sent';

export type QuotationType =
    | 'onetime'
    | 'monthly';

export interface FollowUp {
    id: string;
    date: string;
    note: string;
    completed: boolean;
    timestamp: number;
}


export interface Lead {

    contactPerson1: any;
    sr_no: string | null;
    date: string | null;
    company_name: string | null;
    company_type: string | null;
    nature_of_business: string | null;
    gst_no?: string | null;

    // Contacts
    contact1_name: string | null;
    contact2_name?: string | null;
    contact3_name?: string | null;
    email: string | null;


    address_line1: string | null;
    city: string | null;


    problem_statement?: string | null;
    service_requirements: string[] | null;
    remarks?: string | null;
    status: LeadStatus;
    quotation_amount?: number | null;
    quotation_type?: QuotationType;

    follow_ups: FollowUp[] | null;
    last_updated: number | null;
}

export type TypeoFonnect = 'HVT' | 'HII' | 'BA';
export interface IndustryConnects {
    name: string | null
}


export interface Netwoks {
    name: string | null,
    email: string | null,
    contact: string | null,
    type_of_connect: TypeoFonnect,
    industry_connects: IndustryConnects[] | null
}