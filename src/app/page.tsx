"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/db";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";



export default  function Page() {
  const  [value, setValue] = useState("");

  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("Background job started")
    }
  }))

  return (
    <div className="p-4">
      <Input value={value} onChange={(e) => setValue(e.target.value)} className="p-4 mx-auto"/>
      <div className="p-4 max-w-7xl">
        <Button onClick={() => invoke.mutate({value: value})}  className="mx-auto w-1.2xl">Invoke Button</Button>
      </div>
      
    </div>
  );
}
