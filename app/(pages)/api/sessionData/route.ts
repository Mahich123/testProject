import { db } from "@/lib/db";
import { oauthAccount } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type Data = {
  session: string;
};
export const GET = async ({ session }: Data) => {
  try {
    const sessionData = await db
      .select()
      .from(oauthAccount)
      .where(eq(oauthAccount.user_id, session));
    console.log(sessionData)
    return sessionData;
    return NextResponse.json({ sessionData: sessionData });
  } catch (error) {
    console.error("No session data found", error);
    throw error;
  }
};
