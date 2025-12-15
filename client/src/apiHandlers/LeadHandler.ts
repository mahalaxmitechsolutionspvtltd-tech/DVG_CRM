import axios from "axios";
import type { Lead } from "../lib/types";





const URI = import.meta.env.VITE_REACT_BACKEND_URI;

async function addLeadHandler(formdata: Partial<Lead>) {

    const reaponse = await axios.post(`${URI}/api/addlead`, formdata,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
    );
    return reaponse;
}


async function getLeadsHandler() {

    const reaponse = await axios.get(`${URI}/api/getleads`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    return reaponse;

}

async function updateLeadHandler(formdata: Partial<Lead>) {

    const srNo = formdata.sr_no;

    const reaponse = await axios.put(`${URI}/api/updatelead/${srNo}`, formdata, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })

    return reaponse;

}



export { getLeadsHandler, addLeadHandler, updateLeadHandler }