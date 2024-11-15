import Logo from "@/app/logo.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
  return (
    <div className="mt-20 flex items-center justify-center px-4 sm:mt-0 sm:min-h-screen sm:px-0">
      <Card className="mx-auto w-[500px]">
        <CardHeader className="flex items-center justify-center space-y-3">
          <Image
            className="mx-auto"
            src={Logo}
            alt="logo"
            height={100}
            width={100}
          />

          <CardTitle className="text-xl">Create Your Account</CardTitle>
          <CardDescription>
            Sign up to start organizing your notes and boost your productivity.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center">
          <Separator />
          <RegisterLink
            authUrlParams={{
              connection_id:
                process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE || "",
            }}
          >
            <Button className="mt-6 w-full gap-4" variant="outline">
              <FcGoogle />
              <span>Continue with Google</span>
            </Button>
          </RegisterLink>
        </CardContent>
      </Card>
    </div>
  );
}
