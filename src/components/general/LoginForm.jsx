"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signUp, login, loginWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { CircleUserRound } from "lucide-react";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    const { error } = await login({ email, password });

    if (error) {
      console.log(error.message);
    } else {
      router.push("/products");
    }
  }

  async function handleSignUp() {
    if (password === confirmPassword) {
      const { error } = await signUp({ email, password });

      if (error) {
        console.log(error.message);
      } else {
        router.push("/products");
      }
    }
  }

  async function handleGoogleLogin() {
    loginWithGoogle();
  }

  if (isLogin) {
    return (
      <Dialog>
        <DialogTrigger>
          <CircleUserRound size={28} className="cursor-pointer md:w-8 md:h-8" />
        </DialogTrigger>
        <DialogContent className="w-[95vw] max-w-md md:w-1/2 lg:w-1/3 py-6 md:py-8 mx-4">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle className="text-lg md:text-xl">
              Login to Mamiko
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base text-center">
              Welcome back! Please Login to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex my-4 gap-2">
            <Button
              className="flex-1 bg-[#b1d5ed] text-[#4065dd] h-12 md:h-auto"
              onClick={handleGoogleLogin}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
                className="md:w-8 md:h-8"
              >
                <g clipPath="url(#clip0_3515_2)">
                  <path
                    d="M23.9996 19.6363V28.9309H36.916C36.3488 31.9199 34.6468 34.4509 32.0941 36.1527L39.8831 42.1964C44.4213 38.0075 47.0395 31.8547 47.0395 24.5456C47.0395 22.8438 46.8868 21.2073 46.6031 19.6366L23.9996 19.6363Z"
                    fill="white"
                  />
                  <path
                    d="M10.5494 28.5681L8.79263 29.9128L2.57434 34.7564C6.52342 42.589 14.6174 48 23.9991 48C30.4789 48 35.9116 45.8618 39.8826 42.1965L32.0936 36.1528C29.9554 37.5928 27.2281 38.4656 23.9991 38.4656C17.7591 38.4656 12.4575 34.2547 10.5592 28.5819L10.5494 28.5681Z"
                    fill="white"
                  />
                  <path
                    d="M2.57436 13.2437C0.938084 16.4726 0 20.1163 0 23.9999C0 27.8834 0.938084 31.5271 2.57436 34.7561C2.57436 34.7778 10.5599 28.5597 10.5599 28.5597C10.08 27.1197 9.79624 25.5926 9.79624 23.9996C9.79624 22.4067 10.08 20.8795 10.5599 19.4395L2.57436 13.2437Z"
                    fill="white"
                  />
                  <path
                    d="M23.9996 9.55636C27.5342 9.55636 30.676 10.7781 33.1851 13.1345L40.0577 6.2619C35.8904 2.37833 30.4797 0 23.9996 0C14.6179 0 6.52342 5.38908 2.57434 13.2437L10.5597 19.44C12.4578 13.7672 17.7596 9.55636 23.9996 9.55636Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3515_2">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </div>
          <div className="w-full flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-black"></div>
            <p className="text-sm">or</p>
            <div className="h-[1px] flex-1 bg-black"></div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="text-sm md:text-base">Email address</p>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 md:h-auto"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="text-sm md:text-base">Password</p>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 md:h-auto"
            />
          </div>
          <Button
            className="w-full bg-[#e6b724] my-2 h-10 md:h-auto"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            variant="link"
            onClick={() => setIsLogin(false)}
            className="text-sm"
          >
            Don't have an account? Sign up
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <CircleUserRound size={32} className="cursor-pointer md:w-8 md:h-8" />
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-md md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-y-auto py-6 md:py-8 mx-4 no-scrollbar">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-lg md:text-xl">
            Create your account
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-center">
            Welcome! Please fill in your details.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex my-4 gap-2">
          <Button
            className="flex-1 bg-[#b1d5ed] text-[#4065dd] h-12 md:h-auto"
            onClick={handleGoogleLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              className="md:w-8 md:h-8"
            >
              <g clipPath="url(#clip0_3515_2)">
                <path
                  d="M23.9996 19.6363V28.9309H36.916C36.3488 31.9199 34.6468 34.4509 32.0941 36.1527L39.8831 42.1964C44.4213 38.0075 47.0395 31.8547 47.0395 24.5456C47.0395 22.8438 46.8868 21.2073 46.6031 19.6366L23.9996 19.6363Z"
                  fill="white"
                />
                <path
                  d="M10.5494 28.5681L8.79263 29.9128L2.57434 34.7564C6.52342 42.589 14.6174 48 23.9991 48C30.4789 48 35.9116 45.8618 39.8826 42.1965L32.0936 36.1528C29.9554 37.5928 27.2281 38.4656 23.9991 38.4656C17.7591 38.4656 12.4575 34.2547 10.5592 28.5819L10.5494 28.5681Z"
                  fill="white"
                />
                <path
                  d="M2.57436 13.2437C0.938084 16.4726 0 20.1163 0 23.9999C0 27.8834 0.938084 31.5271 2.57436 34.7561C2.57436 34.7778 10.5599 28.5597 10.5599 28.5597C10.08 27.1197 9.79624 25.5926 9.79624 23.9996C9.79624 22.4067 10.08 20.8795 10.5599 19.4395L2.57436 13.2437Z"
                  fill="white"
                />
                <path
                  d="M23.9996 9.55636C27.5342 9.55636 30.676 10.7781 33.1851 13.1345L40.0577 6.2619C35.8904 2.37833 30.4797 0 23.9996 0C14.6179 0 6.52342 5.38908 2.57434 13.2437L10.5597 19.44C12.4578 13.7672 17.7596 9.55636 23.9996 9.55636Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_3515_2">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>
        </div>
        <div className="w-full flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-black"></div>
          <p className="text-sm">or</p>
          <div className="h-[1px] flex-1 bg-black"></div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="text-sm md:text-base">Email</p>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 md:h-auto"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="text-sm md:text-base">Password</p>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 md:h-auto"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="text-sm md:text-base">Confirm password</p>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-10 md:h-auto"
          />
        </div>
        <Button
          className="w-full bg-[#e6b724] my-2 h-10 md:h-auto"
          onClick={handleSignUp}
        >
          Sign up
        </Button>
        <Button
          variant="link"
          onClick={() => setIsLogin(true)}
          className="text-sm"
        >
          Already have an account? Sign in
        </Button>
      </DialogContent>
    </Dialog>
  );
}
