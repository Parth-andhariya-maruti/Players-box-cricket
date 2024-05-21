import {z} from 'zod';

export const userInfoSchema = z.object({
    name: z.string().min(2,'Please Enter Name').max(50,'Enter name up to 50 characters'),
    date:z.string().trim().min(1, { message: "Please select date and start time" }),
    hours:z.string().trim().min(1, { message: "Please select hours" })

})