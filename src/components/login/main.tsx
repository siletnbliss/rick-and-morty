import Image from "next/image";
import { LoginCard } from "./card";
import stars from "../../../public/login/stars.gif";
export const LoginMain = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginCard />
      <Image
        src={stars}
        quality={100}
        fill
        sizes="100vw"
        alt="bg"
        className="object-cover absolute -z-10 bg-repeat"
      />
    </div>
  );
};
