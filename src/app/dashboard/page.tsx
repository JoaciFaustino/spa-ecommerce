import { redirect } from "next/navigation";

async function DashboardPage() {
  redirect("/dashboard/cakes");
}

export default DashboardPage;
