"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { toast } from "sonner";
import AccountOrders from "./AccountOrders";
import { changePassword } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import AccountWishlist from "./AccountWishlist";

export default function AccountBody({ user, mode }) {
  const [profile, setProfile] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saveDisabled, setSaveDisabled] = useState(true);

  async function handleChangePassword() {
    const error = await changePassword({
      email: user.email,
      oldPassword,
      newPassword,
    });

    if (error) console.error(error);
    else toast("Your password has been successfully changed.");

    setOldPassword("");
    setNewPassword("");
  }

  async function selectProfile() {
    const { data, error } = await supabase
      .from("Profiles")
      .select("*")
      .eq("uid", user.id)
      .single();

    if (error) console.error(error);
    else {
      setProfile(data);
      setFirstName(data.first_name || "");
      setLastName(data.last_name || "");
      setAddress(data.address || "");
      setPostalCode(data.postal_code || "");
    }
  }

  async function updateProfile() {
    if (!profile) return;

    const { error } = await supabase
      .from("Profiles")
      .update({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        address: address.trim(),
        postal_code: postalCode.trim(),
      })
      .eq("uid", profile.uid)
      .single();

    if (error) console.error(error);
    else {
      setProfile((prev) => ({
        ...prev,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        address: address.trim(),
        postal_code: postalCode.trim(),
      }));

      setFirstName(firstName.trim());
      setLastName(lastName.trim());
      setAddress(address.trim());
      setPostalCode(postalCode.trim());
      toast.success("Profile updated successfully!");
    }
  }

  useEffect(() => {
    if (user) selectProfile();
  }, [user]);

  useEffect(() => {
    if (!profile) return;

    const isUnchanged =
      profile.first_name === firstName &&
      profile.last_name === lastName &&
      profile.address === address &&
      profile.postal_code === postalCode;

    setSaveDisabled(isUnchanged);
  }, [firstName, lastName, address, postalCode, profile]);

  if (mode === "Account Details") {
    return (
      <div className="w-full flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Manage your profile, your way.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
            <div className="flex flex-col gap-2">
              <p>First name</p>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Last name</p>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Email</p>
              <Input value={user.email} disabled />
            </div>
            <div className="flex flex-col gap-2">
              <p>Password</p>
              {user.app_metadata.provider === "email" ? (
                <>
                  <Input value="************" type="password" disabled />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-fit text-[#4065dd] !p-0"
                        variant="link"
                      >
                        Change password?
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change password</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          change your password.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                          <p className="text-sm">Old password</p>
                          <Input
                            value={oldPassword}
                            placeholder="Enter old password"
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-sm">New password</p>
                          <Input
                            value={newPassword}
                            placeholder="Enter new password"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter className="msx-sm:flex max-sm:flex-row max-sm:gap-4">
                        <DialogClose className="max-sm:w-1/2" asChild>
                          <Button type="button" variant="link">
                            Close
                          </Button>
                        </DialogClose>
                        <DialogClose className="max-sm:w-1/2" asChild>
                          <Button
                            className="bg-[#ed5471] text-white"
                            type="button"
                            variant="link"
                            onClick={handleChangePassword}
                          >
                            Change
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <div className="h-full flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="none"
                    className="invert md:w-6 md:h-6"
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
                  <p className="text-sm">You're logged in using Google.</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p>Address</p>
              <div className="flex gap-4">
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Postal Code</p>
              <div className="flex gap-4">
                <Input
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              className="bg-[#e6b724]"
              disabled={saveDisabled}
              onClick={updateProfile}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (mode === "Orders") {
    return <AccountOrders user={user} />;
  }

  if (mode === "Wishlist") {
    return <AccountWishlist user={user} />;
  }
}
