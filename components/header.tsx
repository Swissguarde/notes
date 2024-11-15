import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Settings } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import SearchBar from "./search-bar";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import UserNav from "./user-nav";

export default async function Header() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="flex h-[10vh] w-full items-center justify-between border-b bg-background px-4 md:px-10">
      <div>
        {/* Dynamic Title later on */}
        <h2 className="hidden text-xl font-semibold tracking-wide md:block md:text-2xl">
          All Notes
        </h2>
        <SidebarTrigger className="md:hidden" />
      </div>

      <div className="flex items-center gap-2">
        <SearchBar userId={user?.id} />
        <ModeToggle />
        {(await isAuthenticated()) ? (
          <UserNav
            email={user?.email as string}
            image={user?.picture as string}
            name={user?.given_name as string}
          />
        ) : (
          <div className="hidden items-center gap-x-5 sm:flex">
            <Link href="/sign-in">
              <Button variant="secondary">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
