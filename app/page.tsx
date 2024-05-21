import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function isUserLogged() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return {
      redirect: {
        destination: "/api/auth/login?post_login_redirect_url=/dashboard",
        permanent: false,
      },
    };
  }
}

export default async function Home() {}
