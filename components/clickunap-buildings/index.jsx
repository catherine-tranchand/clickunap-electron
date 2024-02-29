import { useState } from "react"
import { Button } from '@mui/material';
import ClickunapAppBar from "../clickunap-appbar";


export default function ClickButton({name, color, text}){
    
    const [isOpen, setIsOpen] = useState(false);

    function toggle(){
        setIsOpen((isOpen) => !isOpen);
    }
return(
    <Button variant="contained">Contained
    
    </Button>
)

}