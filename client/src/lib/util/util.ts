import { format, type DateArg } from "date-fns";
import z from "zod";

export function formatDate(date: DateArg<Date>) {
    return format(date, "dd MMM yyyy h:mm a")
}

export const requiredString = (filedName:string) => z.string({error:`${filedName} is rquired`}).nonempty(`${filedName} is rquired`).min(1, {message: `${filedName} is rquired`});
