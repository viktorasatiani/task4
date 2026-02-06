import { Verify } from "@/components/Verify";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const email = (await searchParams).email;

  return (
    <div>
      <Verify email={email as string} />
    </div>
  );
}
