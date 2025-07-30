"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/db";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { create } from "domain";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  // const { data: messages } = useQuery(trpc.messages.getMany.queryOptions());
  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },

      onSuccess: (data) => {
        console.log("✅ Project created successfully:", data);
        router.push(`/projects/${data.id}`);
      },
    })
  );

  return (
    <div className="h-screen w-screen flex item-center justify-center ">
      <div className="max-w-7xl mx-auto flex-col items-center justify-center flex gap-y-4">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className=""
        />
        <div className="p-4 max-w-7xl">
          <Button
            disabled={createProject.isPending}
            onClick={() => createProject.mutate({ value: value })}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
