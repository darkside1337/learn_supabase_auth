"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DestructiveAlert } from "./ui/destructive-alert";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ForgotPasswordSchema } from "@/schemas";
import { forgotPassword } from "@/actions/authActions";
import { SuccessAlert } from "./ui/success-alert";
export default function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const globalErrorMessage = searchParams?.get("message") || "";
  const globalSuccessMessage = searchParams?.get("success") || "";
  //

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  //

  async function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      const response = await forgotPassword(formData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {globalErrorMessage && (
          <DestructiveAlert message={globalErrorMessage} />
        )}

        {globalSuccessMessage && (
          <SuccessAlert message={globalSuccessMessage} />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johnsmith@example.com"
                  {...field}
                />
              </FormControl>
              <FormDescription className="sr-only">
                This is your email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={
            form.formState.isValid ? "bg-green-400 hover:bg-green-600" : ""
          }
        >
          {form.formState.isSubmitting ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>
    </Form>
  );
}
