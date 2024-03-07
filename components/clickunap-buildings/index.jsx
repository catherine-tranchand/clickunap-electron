import { useState } from "react"
import { Button } from '@mui/material';
import ClickunapAppBar from "../clickunap-appbar";


export default function ClickButton({name, text, color}){
    
    const [isOpen, setIsOpen] = useState(false);

    function toggle(){
        setIsOpen((isOpen) => !isOpen);
    }
return(
  <div className="app">
    
  </div>
)

}