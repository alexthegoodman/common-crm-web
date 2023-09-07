import { NextResponse } from "next/server";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

// get auth url
export async function GET() {
  const scopes = ["https://www.googleapis.com/auth/gmail.modify"];

  const url = oauth2Client.generateAuthUrl({
    scope: scopes,
  });

  return NextResponse.json({ url });
}
