/// <reference types="node" />
import "dotenv/config";
//import process from "node:process";
import { defineConfig } from "prisma/config";
import { envVars } from "./src/app/config/env";

export default defineConfig({
  schema: "prisma/schema",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: envVars.DATABASE_URL,
  },
});