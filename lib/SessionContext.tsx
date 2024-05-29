"use client";

import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type SessionData = {
  session: string | undefined;
  sessionData: string | undefined;
};

const SessionContext = createContext<SessionData | undefined>(undefined);

function useFetchSession() {
  return useQuery<SessionData>({
    queryKey: ["session"],
    queryFn: async (): Promise<SessionData> => {
      const res = await fetch("/api/session");
      if (!res.ok) {
        
        throw new Error("Error fetching session");
      }

      const data = (await res.json()) as SessionData;
      console.log(data);
      return data;
    },
  });
}

function useFetchSessionData(session: string) {
  console.log(session)
  return useQuery<SessionData>({
    queryKey: ["sessionData", session],
    queryFn: async (): Promise<SessionData> => {
      const res = await fetch("/api/sessionData");
     
      if (!res.ok) {
        
        throw new Error("Error fetching session");
      }
      console.log(res.json())
      const data = (await res.json()) as SessionData;
      console.log(data);
      return data;
    },
  });
} 



export const useSessionContext = () => {
  const context = useContext(SessionContext);
  console.log(context)

  if (!context) {
    throw new Error("context not found");
  }

  return context;
}


export const SessionProvider = ({children}: Props) => {
  const { data: sessionData, isLoading, error } = useFetchSession();
  const { data: sessionDataResponse } = useFetchSessionData(sessionData?.session || "");

  const value = {
    session: sessionData?.session,
    sessionData: sessionDataResponse?.sessionData
  }

  console.log(value)
  if(isLoading) {
    return (
      <div>Loading....</div>
    )
  }

  if(error) {
    return (
      <div>{error.message}</div>
    )
  }
  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}




