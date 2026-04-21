import axios from 'axios'
import https from 'https'

const agent = new https.Agent({  
  rejectUnauthorized: false
});

export const WINCC_API = axios.create({
    baseURL: "https://niokrpc:34568/WinCCRestService/tagManagement/",
    httpAgent: agent,
    auth: {
        username: "user",
        password: "111111"
    },
    headers: {
        "Content-Type": "application/json"
    }
})