import axios from "axios";
import type { Deal } from "../lib/types";

const URI = import.meta.env.VITE_REACT_BACKEND_URI;


async function getDealsHandler() {

    const reaponse = await axios.get(`${URI}/api/getdeals`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    return reaponse;

}

async function addDealHandler(fomdata: Partial<Deal>) {

    const reaponse = await axios.post(`${URI}/api/createdeal`, fomdata, {
        headers: {
            'Content-Type': 'applicaion/json',
            'Accept': 'application/json'
        }
    });
    return reaponse;

}

async function createRepeatDeal(formdata: Partial<Deal>) {
    const reaponse = await axios.post(`${URI}/api/repeatdeal`, formdata, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    return reaponse;
}

async function updateDealHandler(formdata: Partial<Deal>) {

    const dealId = formdata.id;

    const reaponse = await axios.post(`${URI}/api/updatedeal/${dealId}`, formdata, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    return reaponse;
}



export { getDealsHandler, addDealHandler, createRepeatDeal,updateDealHandler }