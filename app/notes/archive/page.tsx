import prisma from "@/app/lib/db";
import CreateNote from "@/components/create-note";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

async function getNotes(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      Notes: {
        where: {
          archived: true,
        },
        select: {
          createdAt: true,
          description: true,
          title: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return data;
}

export default async function ArchivesPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getNotes(user?.id as string);

  return (
    <section className="h-full min-h-screen w-full p-4 md:w-72 md:border-r md:p-10">
      <CreateNote />
      <div className="mt-5">
        {data?.Notes.length === 0 ? (
          <p className="text-sm text-gray-400">
            Nothing in the archive yet—maybe it&apos;s time to sort your notes?
          </p>
        ) : (
          data?.Notes.map((note, i) => {
            const { createdAt, title, id } = note;
            return (
              <Link
                href={`/notes/${id}`}
                key={i}
                className="my-2 flex cursor-pointer flex-col gap-2 rounded-md p-2 hover:bg-gray-200/40"
              >
                <Separator />

                <h2 className="text-xl">{title}</h2>

                <p className="text-sm text-gray-300">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                  }).format(new Date(createdAt))}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
