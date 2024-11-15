import { deleteNote } from "@/app/actions";
import { TrashDelete } from "@/components/submit-buttons";
import { Button } from "@/components/ui/button";
import { Archive, Trash } from "lucide-react";
import EditNote from "./edit-note";
import DeleteNote from "./delete-note";
import ArchiveNote from "./archive-note";

export default function NoteActions({
  noteId,
  archived,
}: {
  noteId: string;
  archived: boolean;
}) {
  return (
    <>
      <div className="hidden p-10 md:block md:flex-1">
        <div className="flex w-full flex-col gap-3">
          <ArchiveNote noteId={noteId} archived={archived} />
          <EditNote noteId={noteId} />
          <DeleteNote noteId={noteId} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 h-[10vh] w-full border-t bg-black md:hidden">
        <div className="flex w-full items-center justify-between p-4">
          <Button variant="outline">
            <Archive />
            Archive Note
          </Button>
          <form action={deleteNote}>
            <TrashDelete />
          </form>
        </div>
      </div>
    </>
  );
}
