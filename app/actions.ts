"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function postData(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user.id) throw new Error("Unauthorized");
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tags = JSON.parse(formData.get("tags") as string) as string[];

  await prisma.note.create({
    data: {
      userId: user.id,
      description: description,
      title: title,
      tag: tags,
    },
  });

  return redirect("/notes");
}

export async function editData(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user.id) throw new Error("Unauthorized");

  const noteId = formData.get("noteId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!noteId) throw new Error("Note ID is required.");

  await prisma.note.update({
    where: {
      id: noteId,
      userId: user.id,
    },
    data: {
      title,
      description,
    },
  });

  revalidatePath(`/notes/${noteId}`);
  return redirect(`/notes/${noteId}`);
}

export async function deleteNote(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user.id) throw new Error("Unauthorized");
  const noteId = formData.get("noteId") as string;
  await prisma.note.delete({
    where: {
      id: noteId,
      userId: user.id,
    },
  });
  revalidatePath("/notes");
  return redirect("/notes");
}

export async function archiveNote(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user.id) throw new Error("Unauthorized");
  const noteId = formData.get("noteId") as string;
  await prisma.note.update({
    where: {
      id: noteId,
      userId: user.id,
    },
    data: {
      archived: true,
    },
  });
  revalidatePath("/notes/archive");
  return redirect("/notes/archive");
}
export async function unArchiveNote(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user.id) throw new Error("Unauthorized");
  const noteId = formData.get("noteId") as string;
  await prisma.note.update({
    where: {
      id: noteId,
      userId: user.id,
    },
    data: {
      archived: false,
    },
  });
  revalidatePath("/notes/archive");
  return redirect("/notes/archive");
}

export async function getUserTags() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return;
  const data = await prisma.note.findMany({
    where: {
      userId: user.id,
    },
    select: {
      tag: true,
    },
  });
  return data;
}

export async function searchNotes(searchTerm: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!searchTerm) return [];

  const results = await prisma.note.findMany({
    where: {
      userId: user.id,
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          tag: {
            has: searchTerm.toLowerCase(),
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return results;
}
