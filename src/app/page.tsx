

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { caller } from "@/trpc/server";
import Image from "next/image";



export default async function Page() {
  console.log("Server component")
  const greeting = await caller.createAI({text: "Hello"})
  return (
    <div>
      Hello World
      {JSON.stringify(greeting)}
      
      

    </div>
  );
}
