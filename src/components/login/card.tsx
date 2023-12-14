import { Card, CardContent, CardHeader } from "../ui/card";
import { LoginForm } from "./form";
import LoginBanner from "./banner";
import { LoginHeader } from "./header";

export const LoginCard = () => {
  const FormCard = (
    <Card className="border-0  p-6 col-start-1 col-end-7">
      <CardHeader className="mb-4">
        <LoginHeader />
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
            <LoginBanner />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
