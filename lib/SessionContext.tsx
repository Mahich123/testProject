"use client";

import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, ReactNode } from "react";

import Home from '@/app/(home)/page'

type Props = {
  children: ReactNode;
};

type SessionData = {
  session: string | undefined;
  sessionData: string | undefined;
};

const SessionContext = createContext<SessionData>({session: "", sessionData: ""});


function useFetchSession() {
  return useQuery<SessionData>({
    queryKey: ["session"],
    queryFn: async (): Promise<SessionData> => {
      try {
        const res = await fetch('/api/session');
        if (!res.ok) {
          
          throw new Error("Error fetching session");
        }
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Error fetching session data:", error);
        throw error; 
      }
    },
  });
}


function useFetchSessionData(session: string) {


  return useQuery<SessionData>({
    queryKey: ["sessionData", session],
    queryFn: async (): Promise<SessionData> => {
      try {
        const res = await fetch(`/api/sessionData?session=${session}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch session data: ${res.statusText}`);
        }
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Error fetching session data:", error);
        throw error; 
      }
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
      <div className=" flex items-center justify-center">Loading....</div>
    )
  }

  if(error) {
    return (
      <div> 
      Error here

      </div>
    )
  }

 
  return (
    <SessionContext.Provider value={value}>
      {sessionData && sessionData.session? (
        <>
     
          {children}
        </>
      ) : (
        <>
        <Home />
        </>
      )}
    </SessionContext.Provider>
  );
};







