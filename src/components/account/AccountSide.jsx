"use client";

import { motion } from "framer-motion";
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
import { CircleUserRound, ShoppingBag, Heart, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AccountSide({ mode, setMode }) {
  const router = useRouter();

  async function handleLogOut() {
    const error = await signOut();
    if (error) {
      console.log(error.message);
    } else {
      router.push("/");
    }
  }

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  // Menu item animation variants
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Hover animation variants for menu items
  const hoverVariants = {
    rest: { 
      scale: 1,
      x: 0
    },
    hover: { 
      scale: 1.05,
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const menuItems = [
    {
      key: "Account Details",
      icon: CircleUserRound,
      label: "Account Details"
    },
    {
      key: "Orders",
      icon: ShoppingBag,
      label: "Orders"
    },
    {
      key: "Wishlist",
      icon: Heart,
      label: "Wishlist"
    }
  ];

  return (
    <motion.div 
      className="w-fit flex flex-col md:flex"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex flex-col mt-4 gap-8"
        variants={containerVariants}
      >
        <motion.div 
          className="flex flex-col flex-wrap gap-8 max-md:flex-row"
          variants={containerVariants}
        >
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = mode === item.key;
            
            return (
              <motion.div
                key={item.key}
                variants={itemVariants}
                initial="rest"
                whileHover="hover"
                className={`flex items-center flex-row text-nowrap gap-4 hover:cursor-pointer duration-200 ${
                  isActive ? "text-[#e6b724] font-bold" : ""
                }`}
                onClick={() => setMode(item.key)}
              >
                <motion.div
                  variants={hoverVariants}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.2, 
                      duration: 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <IconComponent />
                  </motion.div>
                  <motion.h3 
                    className="text-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1 + 0.3, 
                      duration: 0.3 
                    }}
                  >
                    {item.label}
                  </motion.h3>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="rest"
          whileHover="hover"
        >
          <Dialog>
            <DialogTrigger asChild>
              <motion.div
                variants={hoverVariants}
                className="hover:cursor-pointer duration-200"
              >
                <Button
                  className="w-fit flex items-center text-[#ed5471] !p-0 gap-4 font-black duration-200"
                  variant="link"
                >
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    Log Out
                  </motion.span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.7, 
                      duration: 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <LogOut />
                  </motion.div>
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <DialogHeader>
                  <DialogTitle>Are you sure you want to log out?</DialogTitle>
                  <DialogDescription>
                    This will log you out of your account. You will have to log back
                    in to access you account again.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="max-sm:flex max-sm:flex-row max-sm:gap-4">
                  <DialogClose className="max-sm:w-1/2" asChild>
                    <Button type="button" variant="link">
                      Close
                    </Button>
                  </DialogClose>
                  <DialogClose className="max-sm:w-1/2" asChild>
                    <Button
                      className="bg-[#ed5471] text-white"
                      type="button"
                      onClick={handleLogOut}
                    >
                      Log out
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
