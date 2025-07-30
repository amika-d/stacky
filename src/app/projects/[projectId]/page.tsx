import { ProjectView } from "@/modules/projects/server/ui/views/project-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"

interface Props{
    params: Promise<{
        projectId: string
    }>
}


const Page =  async ({params} : Props)=> {
    const {projectId} =  await params
    const queryClient = getQueryClient();

     try {
        // Add await to see if prefetching fails
        await queryClient.prefetchQuery(trpc.projects.getOne.queryOptions({
            id: projectId
        }));

        await queryClient.prefetchQuery(trpc.messages.getMany.queryOptions({
            projectId: projectId
        }));
        
        console.log("✅ Prefetching completed successfully");
        
    } catch (error) {
        console.error("❌ Prefetching failed:", error);
        // You might want to redirect or show an error page here
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<p>Loading ....</p>}>
                <ProjectView projectId={projectId}/>
            </Suspense>

        </HydrationBoundary>
    )
}

export default Page