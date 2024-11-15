import { archiveNote, unArchiveNote } from "@/app/actions";
import { ArchiveButton } from "@/components/submit-buttons";
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
import { Archive } from "lucide-react";

export default function ArchiveNote({
  noteId,
  archived,
}: {
  noteId: string;
  archived: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <Archive />
          <span>{archived === true ? "Unarchive Note" : "Archive Note"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {archived === true ? "Unarchive" : "Archive Note"}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to{" "}
            {archived === true ? "unarchive" : "archive"} this note ?
          </DialogDescription>
        </DialogHeader>
        <form
          action={archived ? unArchiveNote : archiveNote}
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="noteId" value={noteId} />

          <DialogFooter>
            <ArchiveButton archived={archived} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
