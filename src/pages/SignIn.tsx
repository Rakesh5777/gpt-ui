import { SembTitle } from "@/components/sembTitle";
import useLocalStorage from "@/hooks/localStorage";
import { mockSignIn } from "@/services/api";
import { userDetailsAtom } from "@/store/userDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Icons } from "@ui/icons";
import { Input } from "@ui/input";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { z } from "zod";
import lightBg from "@/assets/sign-in-light.svg";
import darkBg from "@/assets/sign-in-dark.svg";

export const SignInSchema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
  })
  .strict();

export type SignInFormValues = z.infer<typeof SignInSchema>;

export function SignInForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [_token, setToken] = useLocalStorage("token", "");
  const setUserDetails = useSetRecoilState(userDetailsAtom);
  const navigate = useNavigate();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    setIsLoading(true);
    try {
      const { token, id, username, email } = await mockSignIn(
        values.username,
        values.password
      );
      if (!token || !id || !username) throw new Error("User not found");
      setIsLoading(false);
      setToken(token);
      setUserDetails({ id, username, email });
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export function SignIn() {
  const [token] = useLocalStorage("token", "");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <div className="container relative h-screen grid-cols-1 flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-800 dark:bg-black" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            Samsung Electro Mechanics
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              "After all," he said, "everyone enjoys a good joke, so it's only
              fair that they should pay for the privilege."
            </blockquote>
            <footer className="pl-6 text-base mt-2">Akhil kunda</footer>
          </div>
        </div>
        <div className="relative h-full w-full lg:p-8 flex justify-center items-center">
          <img
            className="dark:hidden absolute top-0 left-0 h-full w-full object-cover z-[-10]"
            src={lightBg}
            alt="no-data-found"
          />
          <img
            className="absolute top-0 left-0 h-full w-full object-cover z-[-10]"
            src={darkBg}
            alt="no-data-found"
          />
          <Card className="my-auto z-20 flex flex-col justify-center space-y-6 w-4/5 lg:w-[400px] border-none shadow-xl dark:shadow-xl">
            <CardHeader>
              <CardTitle>
                Sign In to <SembTitle />
              </CardTitle>
              <CardDescription>
                Enter your username and password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
