import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { LoginForm } from "./form";
import { Logo } from "../ui/logo";

export const LoginCard = () => {
  const FormCard = (
    <Card className="border-0  p-6 col-start-1 col-end-7">
      <CardHeader className="mb-4">
        <Logo className="mb-12" size={75} />
        <CardTitle>
          <div className="mb-2">Welcome to all things Rick and Morty.</div>
        </CardTitle>
        <CardDescription>
          {`Log in to find all the info you need about everyone's favorite TV
          show.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
  return (
    <Card className="max-w-4xl mx-auto my-auto p-0 ">
      <CardContent className="p-0">
        <div className="flex grid-cols-10 sm:grid  border-0 relative">
          {FormCard}

          <div className="w-full relative sm:inline hidden col-start-7 col-end-11">
            <Image
              className="object-cover rounded-r "
              src="/login/banner-2.jpg"
              fill
              alt="space banner"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
