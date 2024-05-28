"use server"
import { generateCodeVerifier, generateState } from "arctic";
import { google } from "./oauth";
import { cookies } from "next/headers";


export const createGoogleAuthorizationURL = async () => {
   try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier()
    
    
    cookies().set("codeVerifier", codeVerifier, {
        httpOnly: true,
		
    })
    cookies().set("state", state, {
        httpOnly: true
    })
    const authorizationURL = await google.createAuthorizationURL(state, codeVerifier,  {
        scopes: ["email","profile"]
    });
    return {
        success: true,
        data: authorizationURL
    }
   } catch (error) {
    return {
        error: error
    }
   }
}


