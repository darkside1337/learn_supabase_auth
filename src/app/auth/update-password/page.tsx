import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UpdatePasswordForm from "@/components/update-password.form";

function UpdatePasswordPage() {
  return (
    <Card className="w-[350px] md:w-[450px] mt-8">
      <CardHeader>
        <CardTitle className="text-center">Update Password:</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdatePasswordForm />
      </CardContent>
    </Card>
  );
}

export default UpdatePasswordPage;
