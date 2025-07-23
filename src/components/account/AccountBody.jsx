import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import AccountOrders from "./AccountOrders";

export default function AccountBody({ user, mode }) {
  if (mode === "Account Details") {
    return (
      <div className="w-full flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Manage your profile, your way.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <p>Email</p>
              <Input value="test@gmail.com" disabled />
            </div>
            <div className="flex flex-col gap-2">
              <p>Password</p>
              <Input value="test@gmail.com" type="password" disabled />
              <Button className="w-fit text-[#4065dd] !p-0" variant="link">
                Change password?
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <p>Address</p>
              <div className="flex gap-4">
                <Input value="test@gmail.com" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Postal Code</p>
              <div className="flex gap-4">
                <Input value="test@gmail.com" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === "Orders") {
    return <AccountOrders user={user} />;
  }
}
