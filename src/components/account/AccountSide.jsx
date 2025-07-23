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
import { CircleUserRound, ShoppingBag, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth";

export default function AccountSide({ mode, setMode }) {
  async function handleLogOut() {
    const error = await signOut();

    if (error) {
      console.log(error.message);
    } else {
      router.push("/");
    }
  }

  return (
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
              <DialogTitle>Are you sure you want to log out?</DialogTitle>
              <DialogDescription>
                This will log you out of your account. You will have to log back
                in to access you account again.
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
  );
}
