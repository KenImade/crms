import path from "node:path";
import "dotenv/config";
import * as dotenv from "dotenv"
import { defineConfig } from "prisma/config";

const envName = process.env.ENV || "development"

const envPath = path.join(__dirname, `../../.envs/.env.${envName}`);

dotenv.config({path: envPath});

console.log(`[prisma.config] Loaded environment: ${envName} - ${envPath}`)

export default defineConfig({
    schema: path.join(__dirname, "../prisma/schema.prisma"),
    migrations: {
        path: path.join(__dirname, "../prisma/migrations"),
    },
});