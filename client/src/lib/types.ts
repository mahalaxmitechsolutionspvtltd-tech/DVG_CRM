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
    name: string;
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
    | 'One Time'
    | 'Monthly';

export interface FollowUp {
    id: string;
    date: string;
    note: string;
    completed: boolean;
    timestamp: number;
}


export interface Lead {
    id: string | null;
    entryDate: string | null;
    companyName: string | null;
    companyType: string | null;
    natureOfBusiness: string | null;
    gstNo?: string | null;

    // Contacts
    contact1Name: string | null;
    // contact1Phone: string; 
    contact2Name?: string | null;
    // contact2Phone?: string;
    contact3Name?: string | null;
    // contact3Phone?: string;
    email: string | null;


    addressLine1: string | null;
    city: string | null;


    problemStatement?: string | null;
    serviceRequirements: string[] | null;
    remarks?: string | null;
    status: LeadStatus;
    quotationAmount?: number | null;
    quotationType?: QuotationType;

    followUps: FollowUp[] | null;
    lastUpdated: number | null;
}