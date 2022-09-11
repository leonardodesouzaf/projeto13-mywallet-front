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
}
export function postSignIn(body){
    const requisition = axios.post(
        `${URL}/sign-in`,
        body
    );
}
export function postSignUp(body){
    const requisition = axios.post(
        `${URL}/sign-up`,
        body
    );
}