"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SearchBar({ userId }: { userId: string }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/notes/search?searchQuery=${query}`);
    setQuery("");
  };

  return (
    <div className="relative min-w-[300px]">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Search by title or tags"
          className="w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          disabled={query === ""}
          type="submit"
          className="absolute inset-y-1 right-1 h-auto"
        >
          <Search />
        </Button>
      </form>
    </div>
  );
}
