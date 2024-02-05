import Image from "next/image";
import Link from "next/link";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';





export default function ClickunapAuthLogin() {
  return (
    <div className="ClickunapAuthLogin flex flex-col justify-center items-center rounded-xl shadow-md bg-white w-full h-auto max-w-[500px] p-4 space-y-6">
    
      {/* Clickunap LogoName */}
      <Link href='/'>
        <Image
          src="/clickunap-black.png"
          width={224}
          height={48}
          alt="Clickunap logo"
          priority={true}
        />
      </Link>
            

      {/*  Title */}
      <h2 className="text-black">Mon Espace</h2>

      <form noValidate={true} className="flex flex-col justify-center w-full h-auto">
        {/* Email - Input */}
        <TextField className=""
          id="email-input"
          required={true}
          label="Email"
          defaultValue=""

        />

        {/* Password - Input */}

        {/* Subbmit - Button */}

        <Button variant="contained" className="bg-primaryLight hover:bg-primary w-full rounded-3xl p-2.5">login</Button>
      </form>
      
    </div>

  );

    
}
