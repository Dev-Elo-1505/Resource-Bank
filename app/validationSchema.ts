import { z } from "zod"

const CategoryEnum = z.enum(["BLOG", "VIDEO", "LINK", "OTHER"])

export const resourceSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    url:z.string().url(),
    category: CategoryEnum
})