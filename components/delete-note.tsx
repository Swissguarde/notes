import { deleteNote } from "@/app/actions";
import { TrashDelete } from "@/components/submit-buttons";
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
import { Trash } from "lucide-react";

export default function DeleteNote({ noteId }: { noteId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="destructive">
          <Trash />
          <span>Delete Note</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Delete Note</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this note ?
          </DialogDescription>
        </DialogHeader>
        <form action={deleteNote} className="flex flex-col gap-4">
          <input type="hidden" name="noteId" value={noteId} />

          <DialogFooter>
            <TrashDelete />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
