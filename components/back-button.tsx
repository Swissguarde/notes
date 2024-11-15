"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant="link"
      className="mb-2 flex items-center"
    >
      <ChevronLeft />
      <span>Back</span>
    </Button>
  );
}
