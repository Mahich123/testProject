import { db } from "@/lib/db";
import { google } from "@/lib/oauth";
import {  oauthAccount } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);

  const searchParams = url.searchParams;

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.json(
      { error: "Invalid request: missing code or state" },
      {
        status: 400,
      }
    );
  }

  const codeVerifier = cookies().get("codeVerifier")?.value;
  const savedState = cookies().get("state")?.value;

  if (!codeVerifier || !savedState) {
    return NextResponse.json(
      { error: " missing codeVerifier or state in cookies" },
      {
        status: 400,
      }
    );
  }

  if (savedState !== state) {
    return NextResponse.json(
      { error: "State doesn't match" },
      {
        status: 400,
      }
    );
  }

  try {
    const { accessToken } = await google.validateAuthorizationCode(
      code,
      codeVerifier
    );

    console.log("Access Token", accessToken)

    const googleResponse = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      }
    );



    if (!googleResponse.ok) {
      throw new Error("Failed to fetch user info from Google");
    }

    const googleData = (await googleResponse.json()) as User;

    const existingUser = await db
      .select()
      .from(oauthAccount)
      .where(eq(oauthAccount.user_id, googleData.id))

    if (existingUser.length === 0) {
    try {
      await db.insert(oauthAccount).values({
        provider: "google",
        name: googleData.name,
        email: googleData.email,
        user_id: googleData.id,
        picture: googleData.picture
        
      })

      cookies().set("session", googleData.id);

      return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_URI));
    
    } catch (error) {
      console.error("Error inserting", error)

      return NextResponse.json({
        error: "Error inserting data"
      })
    }
     

      
    } else {
      cookies().set("session", googleData.id);

      return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_URI));
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      {
        status: 500,
      }
    );
  }
};