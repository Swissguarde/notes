import prisma from "@/app/lib/db";
import BackButton from "@/components/back-button";
import NoteActions from "@/components/note-actions";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Clock, Tag } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";

async function getData({ userId, noteId }: { userId: string; noteId: string }) {
  noStore();
  const data = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: userId,
    },
    select: {
      description: true,
      title: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      tag: true,
      archived: true,
    },
  });
  return data;
}

export default async function NoteDetails({
  params,
}: {
  params: { id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData({ userId: user.id, noteId: params.id });

  return (
    <section className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="w-full border-r p-4 md:w-[700px] md:p-10">
        <BackButton />
        <h2 className="text-2xl font-bold">{data?.title}</h2>
        <div className="my-6 flex max-w-[200px] items-center text-gray-200/80">
          <div className="flex w-full items-center justify-between gap-10">
            <div className="flex items-center gap-2">
              <Tag size={14} />
              <p className="text-sm">Tag(s)</p>
            </div>
            <div className="flex items-center gap-2">
              {data?.tag.map((tag, i) => (
                <p
                  key={i}
                  className="cursor-pointer text-xs capitalize underline"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="my-6 flex max-w-[300px] items-center text-gray-200/80">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <p className="text-sm">Last Edited</p>
            </div>
            <p className="text-xs">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "full",
              }).format(new Date(data!.updatedAt))}
            </p>
          </div>
        </div>

        <Separator />

        <div className="my-6">
          <h2>{data?.description}</h2>
        </div>
      </div>
      <NoteActions noteId={params.id} archived={data?.archived as boolean} />
    </section>
  );
}
