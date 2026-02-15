"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SubmitEvent } from "react";

export default function LoginForm() {

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Login successful:", result);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full gap-6 flex flex-col items-center justify-center">
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Log in:</FieldLegend>
          <FieldDescription>
            We need to verify your identity before you can access your account.
            Please fill in the form below with your email and password to log in.
          </FieldDescription>
          <FieldGroup className="grid w-full items-center gap-4">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldDescription>
                Enter the email address associated with your account.
              </FieldDescription>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                className="inset-shadow-sm inset-shadow-black/25"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldDescription>
                Enter your password to log in.
              </FieldDescription>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                className="inset-shadow-sm inset-shadow-black/25"
              />
            </Field>
            <Button className="w-full">Log in</Button>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
