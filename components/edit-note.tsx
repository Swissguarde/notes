import { editData } from "@/app/actions";
import prisma from "@/app/lib/db";
import { SubmitButton } from "@/components/submit-buttons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";

async function getData({ noteId, userId }: { noteId: string; userId: string }) {
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
      tag: true,
    },
  });
  return data;
}

export default async function EditNote({ noteId }: { noteId: string }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ userId: user.id, noteId: noteId });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Edit />
          <span>Edit Note</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit your Note</DialogTitle>
          <DialogDescription>Update your note details below.</DialogDescription>
        </DialogHeader>
        <form action={editData} className="flex flex-col gap-4">
          <input type="hidden" name="noteId" value={noteId} />

          <div>
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              defaultValue={data?.title}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              required
              defaultValue={data?.description}
              className="mt-2 h-40 w-full"
            />
          </div>

          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
