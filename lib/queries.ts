import { eq } from "drizzle-orm"
import { db } from "./db"
import { oauthAccount } from "./schema"

type Data = {
    session: string
}

export  const showData =  async ({session}: Data) => {
    console.log(session)
    const data = await db.select().from(oauthAccount).where(eq(oauthAccount.user_id, session))     
    // console.log(data)
    return data;
}