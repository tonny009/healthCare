import express, { Application, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
//import { prisma } from "./app/lib/prisma";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import { auth } from "./app/lib/auth";
import { toNodeHandler } from "better-auth/node";
import path from "path";
import cors from "cors";
import { envVars } from "./app/config/env";

const app: Application = express();

// view showed from backend part without frontend part
app.set("view engine", "ejs"); 
app.set("views",path.resolve(process.cwd(), `src/app/templates`) )

app.use(cors({
    origin : [envVars.FRONTEND_URL, envVars.BETTER_AUTH_URL, "http://localhost:3000", "http://localhost:5000"],
    credentials : true,
    methods : ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders : ["Content-Type", "Authorization"]
}))



app.use("/api/auth",toNodeHandler(auth)); // Mount the auth router


// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", IndexRoutes);

// Basic route
app.get('/', async (req: Request, res: Response) => {
    try {
        const specialty = await prisma.specialty.create({
            data: {
                title: 'Cardiology'
            }
        });

        res.status(201).json({
            success: true,
            message: 'API is working',
            data: specialty
        });
    } catch (error) {
        console.error('Failed to create specialty:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create specialty'
        });
    }
});

app.use(globalErrorHandler);

export default app;