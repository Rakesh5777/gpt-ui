import { sembTitle } from "@/components/sembTitle";
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
      const { token, id, username , email } = await mockSignIn(
        values.username,
        values.password
      );
      if (!token || !id || !username) throw new Error("User not found");
      setIsLoading(false);
      setToken(token);
      setUserDetails({ id, username ,email});
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
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900 dark:bg-gray-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            Samsung Electro Mechanics
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This application has saved me countless hours of work and
                helped me deliver oxygen to my clients faster than ever
                before.&rdquo;
              </p>
              <footer className="text-sm">Akhil kunda</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <Card className="mx-auto flex w-screen p-8 md:p-0 flex-col justify-center space-y-6 lg:w-[400px] border-none">
            <CardHeader>
              <CardTitle>
                Sign In to <sembTitle />
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
