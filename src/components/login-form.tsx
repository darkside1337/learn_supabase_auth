"use client";
import { login } from "@/actions/authActions";
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
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DestructiveAlert } from "./ui/destructive-alert";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const globalErrorMessage = searchParams?.get("message") || "";

  //

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      const formData = new FormData();

      formData.append("email", values.email);
      formData.append("password", values.password);

      const response = await login(formData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {globalErrorMessage && (
          <DestructiveAlert message={globalErrorMessage} />
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Link href="/auth/forgot-password" className="text-sm text-center">
          Forgot Password?
        </Link>

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
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
