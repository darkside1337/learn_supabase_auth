import ForgotPasswordForm from "@/components/forgot-password-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function ForgotPasswordPage() {
  return (
    <Card className="w-[350px] md:w-[450px] mt-8">
      <CardHeader>
        <CardTitle className="text-center">Forgot Password</CardTitle>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
}

export default ForgotPasswordPage;
