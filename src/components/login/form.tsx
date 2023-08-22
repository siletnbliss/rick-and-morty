"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { CustomButton } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  user: z.string().trim().min(3, {
    message: "Username must be at least 3 characters",
  }),
  password: z.string().trim(),
});
type FormValues = z.infer<typeof FormSchema>;
export const LoginForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authenticateUser = (values: FormValues) => {
    setLoading(true);
    // actually make call to auth service in a real application
    setTimeout(() => {
      if (!!values.user && !!values.password) {
        router.push("/auth");
        setLoading(false);
      }
    }, 1000);
  };

  const onSubmit = (values: FormValues) => {
    authenticateUser(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 flex-col flex"
      >
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="bg-card"
                  placeholder="your-username"
                  {...field}
                />
              </FormControl>

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
                <Input
                  className="bg-card"
                  type="password"
                  placeholder="*******"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Link href="/">
          <p className="underline my-2 w-fit text-gray-400 ">
            Forgot password?
          </p>
        </Link>
        <CustomButton loading={loading} type="submit" className="w-full">
          Sign In
        </CustomButton>
      </form>
      <p className="mt-12">
        {`Don't have an account?`}{" "}
        <Link href="/">
          <span className="underline color-secondary ">Sign Up</span>
        </Link>
      </p>
    </Form>
  );
};
