import DashboardTable from "@/components/DashboardTable.tsx";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route.ts";
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  let users = [];

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/users`,
      {
        method: "GET",
      },
    );
    users = await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <div>
      <DashboardTable users={users} />
    </div>
  );
}
