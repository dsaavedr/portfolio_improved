"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";
import { Button } from "../ui/button";

function LogOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    const { errorMessage } = await logOutAction();

    if (!errorMessage) {
      toast.success("Logged out", {
        description: "You have been successfully logged out",
      });
      router.push("/");
    } else {
      toast.error("Error", {
        description: errorMessage,
      });
    }
    setLoading(false);
  };

  return (
    <Button
      disabled={loading}
      className="w-24"
      variant="outline"
      onClick={handleLogout}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogOutButton;
