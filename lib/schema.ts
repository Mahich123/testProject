import { serial, text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";


export const oauthAccount = pgTable("oauthAccount", {
    id: serial("id").primaryKey(),
    provider: text("provider"),
    name: text("name"),
    email: text("email"),
    user_id: text("user_id"),
    picture: text("picture"),

    
});

