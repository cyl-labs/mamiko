"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/general/navbar";
import AccountBody from "@/components/account/AccountBody";
import Wrapper from "@/components/Wrapper";
import Footer from "@/components/general/footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { CircleUserRound, ShoppingBag, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Page() {
  const [user, setUser] = useState();
  const [items, setItems] = useState([]);
  const [mode, setMode] = useState("Account Details");
  const router = useRouter();

  async function selectUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error(error);
      router.push("/");
    } else {
      setUser(data.user);
    }
  }

  async function selectCart() {
    const { data, error } = await supabase
      .from("Carts")
      .select("*")
      .eq("uid", user.id)
      .single();

    if (error) console.error(error);
    else {
      setItems(data.items);
    }
  }

  async function handleLogOut() {
    const error = await signOut();

    if (error) {
      console.log(error.message);
    } else {
      router.push("/");
    }
  }

  useEffect(() => {
    selectUser();
  }, []);

  useEffect(() => {
    if (user) selectCart();
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  if (user) {
    return (
      <Wrapper>
        <Navbar items={items} />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full mt-16"
        >
          <motion.div
            variants={headerVariants}
            className="w-full flex flex-col px-16 gap-2 max-lg:px-8 max-sm:px-6"
          >
            <motion.h1
              className="text-6xl text-[#4065dd] font-bold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your journey with Mamiko matters to us. Track your orders, manage
              your preferences, and enjoy a smoother shopping experience.
            </motion.p>
          </motion.div>
          <div className="flex mt-12 px-16 gap-16 max-md:flex-col max-md:gap-8 max-lg:px-8 max-sm:px-6">
            <div className="w-fit flex flex-col hidden md:flex">
              <div className="flex flex-col mt-4 gap-8">
                <div
                  className={`flex items-center text-nowrap gap-4 ${
                    mode === "Account Details" ? "text-[#e6b724] font-bold" : ""
                  }`}
                  onClick={() => setMode("Account Details")}
                >
                  <CircleUserRound />
                  <h3 className="text-lg">Account Details</h3>
                </div>
                <div
                  className={`flex items-center text-nowrap gap-4 ${
                    mode === "Orders" ? "text-[#e6b724] font-bold" : ""
                  }`}
                  onClick={() => setMode("Orders")}
                >
                  <ShoppingBag />
                  <h3 className="text-lg">Orders</h3>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-fit flex items-center text-[#ed5471] !p-0 gap-4"
                      variant="link"
                    >
                      Log Out
                      <LogOut />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to log out?
                      </DialogTitle>
                      <DialogDescription>
                        This will log you out of your account. You will have to
                        log back in to access you account again.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="link">
                          Close
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          className="bg-[#ed5471] text-white"
                          type="button"
                          onClick={handleLogOut}
                        >
                          Delete
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <AccountBody mode={mode} />
          </div>
        </motion.div>
        <Footer />
      </Wrapper>
    );
  }
}
