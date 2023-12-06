import type { APIRoute } from "astro";
import { supabase } from "~/lib/supabase";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const authCode = url.searchParams.get("code");

  if (!authCode) {
    return new Response("No code provided", { status: 400 });
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);

  if (error) {
    return new Response(error.message, { status: 500 });
  }
  // console.log(data);
  const { access_token, refresh_token } = data.session;
  const pfpUrl = data.user?.user_metadata.avatar_url;

  cookies.set("sb-access-token", access_token, {
    path: "/",
    secure: true,
    httpOnly: true,
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
    secure: true,
    httpOnly: true,
  });
  if (pfpUrl) {
    cookies.set("profile-picture-url", pfpUrl, {
    path: "/",
    secure: true,
    httpOnly: true,
  })
  }
  return redirect("/dashboard");
};
