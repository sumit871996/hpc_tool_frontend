import { Route, Routes } from "react-router-dom"
import AboutView from "../views/AboutView"
import HomeView from "../views/HomeView"
import SignupView from "../views/SignupView"

const AppRouting = ()=>{
    return (
        <Routes>
            <Route path="/" element={ <HomeView/> } />
            <Route path="/about" element={ <AboutView/> } />
            <Route path="/signup" element={ <SignupView/> } />
        </Routes>
    )
}

export default AppRouting