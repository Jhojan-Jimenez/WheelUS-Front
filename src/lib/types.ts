import { z } from "zod";
import { userLogSchema, userRegSchema } from "./formValidators";

export type userRegData = z.infer<typeof userRegSchema>;
export type userLogData = z.infer<typeof userLogSchema>;
