import { db } from "@/lib/db";
import { oauthAccount } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  session: string;
};
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url)
  const sessionParam = url.searchParams.get('session')
  if (!sessionParam) {
    console.log("Session ID not found");
    return NextResponse.json({ error: "Session ID not found" }, { status: 400 });
  }

  try {
    const sessionData = await db
      .select()
      .from(oauthAccount)
      .where(eq(oauthAccount.user_id, sessionParam));
    console.log(sessionData)
    // return sessionData;
    return NextResponse.json({ sessionData: sessionData });
  } catch (error) {
    console.error("Error fetching session data", error);
    return NextResponse.json({ error: "Error fetching session data" }, { status: 500 });
  }
};
