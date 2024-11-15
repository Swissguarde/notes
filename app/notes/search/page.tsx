import { searchNotes } from "@/app/actions";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { searchQuery } = searchParams;
  const data = await searchNotes(searchParams.searchQuery as string);
  return (
    <div className="p-10">
      <h2 className="text-2xl">
        Search results for{" "}
        <span className="text-primary underline">{searchQuery}</span>
      </h2>

      <div className="mt-5">
        {data?.map((note, i) => {
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
        })}
      </div>
    </div>
  );
}
