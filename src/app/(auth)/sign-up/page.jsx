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

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { error: signUpError } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    setIsSubmitting(false);

    if (signUpError) {
      setError(signUpError.message || "Sign up failed. Please try again.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex justify-center my-12">
      <Form className="flex flex-col w-96 gap-4" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label>Name</Label>
          <Input placeholder="Enter your Name" />
          <FieldError />
        </TextField>
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
          <Button type="submit" isDisabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Submit"}
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;
