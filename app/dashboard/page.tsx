"use client"
import { useSessionContext } from "@/lib/SessionContext";
import React from "react";

const DashBoardpage =  () => {

  const {session} = useSessionContext()
  console.log(session)
  
  return (
    <div className="">
     { session && (
      <div>{session}</div>
     )

     }
    </div>
  );
};

export default DashBoardpage;
