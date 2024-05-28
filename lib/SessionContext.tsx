"use client";

import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type SessionData = {
  session: string | undefined;
};

const SessionContext = createContext<SessionData | undefined>(undefined);

function useFetchSession() {
  return useQuery<SessionData>({
    queryKey: ["session"],
    queryFn: async (): Promise<SessionData> => {
      const res = await fetch("/api/session");
      if (!res.ok) {
        const errorBody = await res.text()
        console.error("Error fetching session", errorBody)
        throw new Error("Error fetching session");
      }

      const data = await res.json();
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
  const {data, isLoading, error} = useFetchSession()

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
    <SessionContext.Provider value={data}>
      {children}
    </SessionContext.Provider>
  )
}




