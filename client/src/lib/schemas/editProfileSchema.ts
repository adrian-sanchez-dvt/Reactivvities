import z from "zod";
import { requiredString } from "../util/util";

export const editprofileSchema = z.object({
    displayName: requiredString('displayName'),
    bio: z.string().optional(),
});

export type EditprofileSchema = z.input<typeof editprofileSchema>;