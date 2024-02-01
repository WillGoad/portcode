"use client";

import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountIndicator } from "@/components/ui/account-indicator";

import { toast } from "@/components/ui/use-toast";
import { setUserCookies } from "@/lib/utils";

export default function Onboarding() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  //Enabled bool values for each tab
  const [emailTabDisabled, setEmailDisabled] = useState(false);
  const [confirmationTabDisabled, setConfirmationDisabled] = useState(true);
  const [currentTab, setCurrentTab] = useState("email"); //["email", "confirmation"]
  const router = useRouter();

  //Use effect only runs once
  useEffect(() => {
    if (params.get("verify") && params.get("email")) {
      setCurrentTab("confirmation");
      setCode(params.get("verify") || "");
      setEmail(params.get("email") || "");
    }
  }, []);

  //Function for changing enabled tab
  const setEnabledTab = (tab: string) => {
    if (tab === "email") {
      setEmailDisabled(false);
      setConfirmationDisabled(true);
      setCurrentTab("email");
    } else if (tab === "confirmation") {
      setEmailDisabled(true);
      setConfirmationDisabled(false);
      setCurrentTab("confirmation");
    }
  };

  const onSigninVerify = async () => {
    try {
      const response = await fetch(
        "https://api.portco.de/api/auth/signin-verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      //If status code 200 then change tab
      if (response.status === 200) {
        toast({
          title: "Code Sent",
          description:
            "We sent a code to your email. Make sure to check your spam folder.",
          duration: 5000,
        });
        setEnabledTab("confirmation");
      }
    } catch (error) {
      toast({
        title: "Error sending code",
        description: String(error),
        duration: 5000,
      });
    }
  };

  const onSignin = async () => {
    try {
      const response = await fetch("https://api.portco.de/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, email }),
      });
      // If status code 200 then change tab
      if (response.status === 200) {
        toast({
          title: "Welcome back",
          description: "You are now signed in.",
          duration: 5000,
        });
        const data = await response.json();
        setUserCookies(
          data.username,
          data.displayname,
          data.email,
          data.accessToken
        );
        router.push("/editor");
      }
    } catch (error) {
      toast({
        title: "Error signing in",
        description: String(error),
        duration: 5000,
      });
    }
  };

  //Function for when the user clicks the send code button
  const onSendCode = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    //Check email is valid
    if (email.includes("@") && email.includes(".") && email.length > 5) {
      onSigninVerify();
    }
  };

  //Function for when user clicks submit Code button
  const onSubmitCode = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      code.length === 6 &&
      email.includes("@") &&
      email.includes(".") &&
      email.length > 5
    ) {
      onSignin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center gap-4">
        <AccountIndicator page="signin" />
        <Tabs
          activationMode="automatic"
          value={currentTab}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger disabled={emailTabDisabled} value="email">
              Email
            </TabsTrigger>
            <TabsTrigger
              disabled={confirmationTabDisabled}
              value="confirmation"
            >
              Confirm
            </TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardDescription>
                  Enter the email associated with your account. We&apos;ll send
                  you a code to confirm it&apos;s you.
                </CardDescription>
              </CardHeader>
              <form>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input
                      id="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" onClick={onSendCode}>
                    Send Code
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="confirmation">
            <Card>
              <CardHeader>
                <CardDescription>
                  Enter the code we sent to your email. Make sure to check your
                  spam folder.
                </CardDescription>
              </CardHeader>
              <form>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Input
                      id="name"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" onClick={onSubmitCode}>
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
