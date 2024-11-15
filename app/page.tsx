import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return redirect("/notes");
  }
  return (
    <section className="flex h-[90vh] items-center justify-center bg-background">
      <div className="relative mx-auto w-full max-w-7xl items-center px-5 py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <span className="w-auto rounded-full bg-secondary px-6 py-3">
              <span className="text-sm font-medium text-primary">
                Sort your notes easily
              </span>
            </span>

            <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
              Create Notes with ease
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-base text-secondary-foreground lg:text-xl">
              Notes Made Simple, Organization Made Smarter
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-sm justify-center">
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
