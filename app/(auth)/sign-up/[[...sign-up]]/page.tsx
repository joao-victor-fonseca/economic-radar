import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-dark-2 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-44">
        <div className="flex flex-col items-center md:items-center text-center">
          <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            Bem Vindo Ao Radar <br /> Econômico do Estado <br /> de Minas Gerais
          </h1>
          <Image
            src="/images/brasãoMG.png"
            alt="Logo"
            width={350}
            height={350}
            className="mb-8"
          />
        </div>
        <div className="flex justify-center">
          <SignUp />
        </div>
      </div>
    </main>
  );
}
