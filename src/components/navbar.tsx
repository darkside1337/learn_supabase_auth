import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/actions/authActions";

const Navbar = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
  }

  const isAuthenticated = data?.user;

  return (
    <header className="h-16 flex items-center shadow-md">
      <MaxWidthWrapper className="flex items-center justify-between ">
        <Link href="/">
          <h1 className="text-3xl font-bold text-blue-600">SupaAuth</h1>
        </Link>
        <nav>
          {isAuthenticated ? (
            <form action={logout}>
              <Button>Logout</Button>
            </form>
          ) : (
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>
          )}
        </nav>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
