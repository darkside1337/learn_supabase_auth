import LoginForm from "@/components/login-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const LoginPage = () => {
  return (
    <Card className="w-[350px] md:w-[450px] mt-8">
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="mr-2">Don&apos;t have an account?</p>
        <Link
          className="text-blue-600 hover:text-blue-800"
          href="/auth/register"
        >
          Register here
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
