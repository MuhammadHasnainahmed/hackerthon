import { Route, Routes, useLocation } from "react-router-dom"
import { supabase } from "../supabase"
import Heropage from "./Heropage"
import Navbar from "./Component/Navbar"
import Signup from "./Component/Signup"
import { Toaster } from "react-hot-toast";
import Login from "./Component/Login"
import Dashboard from "./Pages/Dashboard"
import Profile from "./Pages/Profile"
import Propmtpage from "./Pages/Propmtpage"

console.log(supabase);
function App() {
 
  const location = useLocation();

  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/dashboard" || location.pathname === "/dashboard/profile";
  

  return (
    <>
 
  {!hideNavbar && <Navbar/>}
 
 <Toaster position="top-right" />
<Routes>
  <Route path="/" element={<Heropage/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/login" element={<Login/>}/>
 <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route index element={<Propmtpage/>} />
        </Route>
 
</Routes>   
 

{/* <Heropage/> */}
              
    </>
  )
}

export default App
