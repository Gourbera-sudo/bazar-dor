"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.61Z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0" fill="currentColor">
    <path d="M12 .5C5.73.5.99 5.24.99 11.51c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.67-3.71-1.3-3.71-1.3-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.72.38-1.2.7-1.48-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.91 0 0 .92-.3 3.01 1.12a10.5 10.5 0 0 1 5.48 0c2.09-1.42 3.01-1.12 3.01-1.12.6 1.51.22 2.63.11 2.91.7.77 1.13 1.75 1.13 2.95 0 4.22-2.58 5.15-5.03 5.42.4.34.75 1.01.75 2.04 0 1.47-.01 2.65-.01 3.01 0 .29.2.64.76.53a11.02 11.02 0 0 0 7.51-10.44C23.01 5.24 18.27.5 12 .5Z" />
  </svg>
);

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  // "email" | "google" | "github" | null
  const [pendingProvider, setPendingProvider] = useState(null);
  const isSubmitting = pendingProvider !== null;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPendingProvider("email");

    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { error: signInError } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (signInError) {
      setError(signInError.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
      setPendingProvider(null);
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleSocialSignIn = async (provider) => {
    setError("");
    setPendingProvider(provider);

    try {
      const { error: signInError } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (signInError) {
        setError(signInError.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
        setPendingProvider(null);
      }
      // On success Better Auth redirects the browser to the provider.
    } catch {
      setError("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
      setPendingProvider(null);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">সাইন ইন</h1>
        <p className="mt-1 text-gray-500">
          বাজার দর ব্যবহার করতে আপনার অ্যাকাউন্টে সাইন ইন করুন
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          fullWidth
          className="flex items-center justify-center gap-2"
          isDisabled={isSubmitting}
          onPress={() => handleSocialSignIn("google")}
        >
          <GoogleIcon />
          {pendingProvider === "google"
            ? "সংযোগ হচ্ছে..."
            : "Google দিয়ে সাইন ইন"}
        </Button>

        <Button
          type="button"
          variant="outline"
          fullWidth
          className="flex items-center justify-center gap-2"
          isDisabled={isSubmitting}
          onPress={() => handleSocialSignIn("github")}
        >
          <GitHubIcon />
          {pendingProvider === "github"
            ? "সংযোগ হচ্ছে..."
            : "GitHub দিয়ে সাইন ইন"}
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-sm text-gray-500">অথবা</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="Enter Your Email" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex gap-2">
          <Button type="submit" className="flex-1" isDisabled={isSubmitting}>
            {pendingProvider === "email" ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </Button>
          <Button type="reset" variant="secondary" isDisabled={isSubmitting}>
            রিসেট
          </Button>
        </div>
      </Form>
    </div>
  );
}
