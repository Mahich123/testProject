import { defineConfig } from 'drizzle-kit'
import dotenv from 'dotenv'
dotenv.config({path: ".env.local"})

export default defineConfig({
 schema: "lib/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
  },

})