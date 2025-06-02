
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = isUserAuthenticated ? await getUser() : null;

  return (
    <div>
      <nav className="fixed h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex h-14 items-center justify-between border-b border-zinc-200">
            {/* Logo */}
            <Link href="/" className="flex z-40 font-semibold" translate="no">
              <span>verbis.</span>
            </Link>

            {/* Authentication Buttons */}
            <div className="hidden items-center space-x-4 sm:flex">
              {isUserAuthenticated ? (
                <>
                  <span className="text-sm font-medium">Profile</span>
                  <LogoutLink
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Log out
                  </LogoutLink>
                </>
              ) : (
                <>
                  <LoginLink
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Sign in
                  </LoginLink>
                  <RegisterLink
                    className={buttonVariants({
                      size: "sm",
                    })}
                  >
                    Get Started <ArrowRight className="ml-1.5 h-5 w-5" />
                  </RegisterLink>
                </>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </div>
  );
};

export default Navbar;
