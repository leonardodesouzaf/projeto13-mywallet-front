import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../../contexts/UserContext";
import SignInDisplay from "../SignInDisplay/SignInDisplay";
import SignUpDisplay from "../SignUpDisplay/SignUpDisplay";
import InDisplay from "../InDisplay/InDisplay";
import OutDisplay from "../OutDisplay/OutDisplay";
import HomeDisplay from "../HomeDisplay/HomeDisplay";


export default function App(){
    const [tasks, setTasks] = useState([]);
    return(
        <UserContext.Provider value={{tasks, setTasks}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignInDisplay />} />
                    <Route path="/sign-up" element={<SignUpDisplay />} />
                    <Route path="/home" element={<HomeDisplay />} />
                    <Route path="/in" element={<InDisplay />} />
                    <Route path="/out" element={<OutDisplay />} />
                </Routes>
		    </BrowserRouter>
        </UserContext.Provider>
    )
}