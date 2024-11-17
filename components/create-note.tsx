"use client";
import { postData } from "@/app/actions";
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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function CreateNote() {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const clientAction = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await postData(formData);
        setOpen(false);
        setTags([]);
        setTagInput("");
        router.refresh();
      } catch (error) {
        console.error("Error:", error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-56">Create New Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create a New Note</DialogTitle>
          <DialogDescription>
            Add a title and details for your new note.
          </DialogDescription>
        </DialogHeader>
        <form action={clientAction} className="flex flex-col gap-4">
          <div>
            <Label>Title</Label>
            <Input name="title" type="text" required className="mt-2" />
          </div>

          <div>
            <Label>Tags</Label>
            <div className="mt-2 flex items-center gap-2">
              <Input
                placeholder="Add tags to organize and categorize your note"
                className="w-full"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value.toLowerCase())}
              />
              <Button type="button" onClick={handleAddTag} className="flex-1">
                Add
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="badge">
                  {tag}
                  <Button
                    size="sm"
                    className="ml-1"
                    variant="destructive"
                    onClick={() => handleRemoveTag(index)}
                  >
                    x
                  </Button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              required
              className="mt-2 h-40 w-full"
            />
          </div>
          <input type="hidden" name="tags" value={JSON.stringify(tags)} />

          <DialogFooter>
            {isPending ? (
              <Button disabled className="w-fit">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </Button>
            ) : (
              <Button className="w-fit" type="submit">
                Create Note
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
