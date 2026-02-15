"use client";

import LoginForm from "@/components/login-form";

export default function Auth() {

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="flex w-full max-w-[75%] min-h-[calc(100vh-20%)] overflow-hidden rounded-3xl border bg-white shadow-xl dark:bg-zinc-900">
        {/* Left Side: Gradient Hero */}
        <div className="relative hidden w-1/2 flex-col justify-between bg-gradient-to-br from-primary/20 via-primary/50 to-primary p-12 lg:flex">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        </div>

        {/* Right Side: Form */}
        <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16">
          <div className="mb-8 flex flex-col gap-4">
            <div className="text-4xl font-bold text-primary">＊</div>{" "}
            {/* Icon */}
            <h1 className="text-4xl font-bold">Momentum</h1>
            <p className="text-md text-muted-foreground">
              You're a few steps away from unleashing your full potential and
              achieve a great focus. Let's get you signed in to your account and
              start your journey towards unparalleled productivity and success.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
