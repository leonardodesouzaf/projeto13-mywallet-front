import axios from "axios";
const URL = 'http://localhost:5000';
const headerCreator = (token) => {
    return {headers: {Authorization: `Bearer ${token}`}}
};
export function getTransactions(token){
    const requisition = axios.get(
        `${URL}/home`,
        headerCreator(token)
    );
    return requisition;
}
export function postSignIn(body){
    const requisition = axios.post(
        `${URL}/sign-in`,
        body
    );
    return requisition;
}
export function postSignUp(body){
    const requisition = axios.post(
        `${URL}/sign-up`,
        body
    );
    return requisition;
}

export function postIn(body,token){
    const requisition = axios.post(
        `${URL}/in`,
        body,
        headerCreator(token)
    );
    return requisition;
}

export function postOut(body,token){
    const requisition = axios.post(
        `${URL}/out`,
        body,
        headerCreator(token)
    );
    return requisition;
}