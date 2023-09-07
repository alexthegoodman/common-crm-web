import { NextResponse } from "next/server";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    console.error("no code");
    return NextResponse.redirect("/");
  }

  console.info("code", code);

  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);

  //   return NextResponse.json({ tokens });
  return NextResponse.redirect(
    `sunshot-app://sign-in?accessToken=${tokens.access_token}`
  );
}
