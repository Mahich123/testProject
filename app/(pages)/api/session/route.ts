"use server"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest) => {

  const cookies = req.cookies
  const sessionValue = cookies.get("session")?.value

  if(!sessionValue){
    return NextResponse.json({ error: "Session  not found" }, { status: 400 });
  }
console.log(sessionValue)
  return NextResponse.json({ session: sessionValue });
};
