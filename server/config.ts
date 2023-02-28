import dotenv from "dotenv";

dotenv.config();

export const USER_DB = process.env.USER_DB ?? "root";
export const PASS_DB = process.env.PASS_DB ?? "1234";
export const HOST_DB = process.env.HOST_DB ?? "localhost";
export const PORT_DB = process.env.PORT_DB ?? "27017";
export const PORT = process.env.PORT ?? "3000";
