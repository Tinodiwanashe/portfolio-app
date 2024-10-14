import { Separator } from "@/components/ui/separator";
import { Id } from "@/convex/_generated/dataModel";
import ProjectForm from "../../_components/ProjectForm";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";


export default async function page({ params }: { params: { id: Id<"Project"> } }) {
  const { id } = params;
  const [project,companies] = await Promise.all([
    preloadQuery(api.projects.getProject,{ProjectId: id}),
    preloadQuery(api.companies.getCompanies)
  ]);
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <h3 className="text-lg font-medium">Project</h3>
        <p className="text-sm text-muted-foreground">
          This is where you add Project details.
        </p>
      </div>
      <Separator />
      <ProjectForm preloadedProject={project} preloadedCompanies={companies} />
    </div>
  )
}