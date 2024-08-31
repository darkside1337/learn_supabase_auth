import RegisterForm from "@/components/register-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function RegisterPage() {
  return (
    <Card className="w-[350px] md:w-[450px] mt-8">
      <CardHeader>
        <CardTitle className="text-center">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="mr-2">Already have an account?</p>
        <Link className="text-blue-600 hover:text-blue-800" href="/auth/login">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}

export default RegisterPage;
