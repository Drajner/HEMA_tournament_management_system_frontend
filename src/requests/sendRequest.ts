import { FieldValues } from "react-hook-form";
import { API_URL } from "../config/apiUrl";

const BASE_URL = API_URL != "" ? API_URL : 'http://localhost:8080/';
//const BASE_URL = API_URL != "" ? API_URL : 'http://192.168.1.248:8080/';
export function sendRequestPOST(data: FieldValues, url: string) {
    url = BASE_URL + url
    
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    });
}   

export function sendBareRequestPOST(data: string, url: string) {
    url = BASE_URL + url
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: data
    });
}  

export function sendEmptyRequestPOST(url: string) {
    url = BASE_URL + url
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });
}  

export function sendRequestGET(url: string) {
    url = BASE_URL + url
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export function sendUnauthRequestGET(url: string) {
    url = BASE_URL + url
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export function sendRequestDELETE(url: string) {
    url = BASE_URL + url
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });
}

export function sendBareRequestDELETE(data: undefined, url: string) {
    url = BASE_URL + url
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: data
    });
}  
