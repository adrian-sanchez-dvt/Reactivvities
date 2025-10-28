import {z} from 'zod';

const requiredString = (filedName:string) => z.string({error:`${filedName} is rquired`}).nonempty(`${filedName} is rquired`).min(1, {message: `${filedName} is rquired`});

export const activitySchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: z.coerce.date({message: 'Date is requires'}),
    location: z.object({
        venue: requiredString('Venue'),
        city: z.string().optional(),
        latitude: z.coerce.number(),
        longitude: z.coerce.number(),
    })
});

export type ActivitySchema = z.input<typeof activitySchema>;