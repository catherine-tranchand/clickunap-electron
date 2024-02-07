/* Import your clickunap components here */
import ClickunapAuthLogin from '@/components/clickunap-auth-login'
import ClickunapAuthAside from '@/components/clickunap-auth-aside'


export default function LoginPage() {
  return (
    <main className="LoginPage flex w-full h-full overflow-auto p-6 bg-neutral-100">

      {/* CONTAINER */}
      <div className="Container flex justify-center items-center p-6 grow h-full">

        {/* Clickunap - Auth - Login */}
        <ClickunapAuthLogin />

      </div>

      {/* Clickunap - Auth - Aside */}
      <ClickunapAuthAside />

    </main>
  );
}

