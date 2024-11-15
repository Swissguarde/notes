import { getUserTags } from "@/app/actions";
import Logo from "@/app/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronRight, Home, Inbox, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

// Menu items.
const items = [
  {
    title: "All Notes",
    url: "/notes",
    icon: Home,
  },
  {
    title: "Archived Notes",
    url: "/notes/archive",
    icon: Inbox,
  },
];

export async function AppSidebar() {
  const data = await getUserTags();
  const uniqueTags = Array.from(
    new Set(data?.flatMap((item) => item.tag.map((tag) => tag.toLowerCase()))),
  );

  return (
    <Sidebar>
      <SidebarHeader className="flex h-[10vh] items-start justify-center border-b px-10">
        <Link href="/" className="text-3xl font-semibold">
          <Image src={Logo} alt="logo" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="py-6">
                    <Link
                      href={item.url}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="size-[17px] text-primary" />
                        <span>{item.title}</span>
                      </div>
                      <ChevronRight />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Separator />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel className="text-xl">Tags</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                {uniqueTags.length > 0 && (
                  <ul className="flex flex-col p-2">
                    {uniqueTags.map((tag, index) => (
                      <Link
                        href={`/notes/search?searchQuery=${tag}`}
                        key={index}
                        className="mt-4 capitalize text-primary underline"
                      >
                        {tag}
                      </Link>
                    ))}
                  </ul>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="my-2 flex w-full items-center justify-between">
          <h2>Settings</h2>
          <Settings />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
