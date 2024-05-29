"use server"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest) => {

  const cookies = req.cookies
  const sessionValue = cookies.get("session")?.value

  if(!sessionValue){
    console.log("session not found")
  }
console.log(sessionValue)
  return NextResponse.json({ session: sessionValue });
};
