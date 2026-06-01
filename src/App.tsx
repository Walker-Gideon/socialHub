import { 
  Route, 
  Routes,  
  BrowserRouter, 
} from "react-router-dom";

import HomePage from "./pages/home/index.tsx";
import ProfilePage from "./pages/profile/index.tsx";
import EditProfilePage from "./pages/profile/edit/index.tsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/profile/:username/edit" element={<EditProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}