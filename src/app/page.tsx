"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/db";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";



export default  function Page() {
  const  [value, setValue] = useState("");

  const trpc = useTRPC();
  const {data:messages} = useQuery(trpc.messages.getMany.queryOptions())
  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: () => {
      toast.success("Message Created")
    }
  }))

  return (
    <div className="p-4">
      <Input value={value} onChange={(e) => setValue(e.target.value)} className="p-4 mx-auto"/>
      <div className="p-4 max-w-7xl">
        <Button 
        disabled={createMessage.isPending}
        onClick={() => createMessage.mutate({value: value})}  className="mx-auto w-1.2xl">Invoke Button</Button>
        {JSON.stringify(messages, null, 2)}
      </div>
      
    </div>
  );
}
