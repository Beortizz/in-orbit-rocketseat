import fastify from "fastify"
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { createGoal } from "../functions/createGoal"
import { getWeekPendingGoals } from "../functions/getWeekPendingGoals"
import { createGoalCompletion } from "../functions/createGoalCompletion"
import z from "zod"

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)


app.post('/goal-completions', 
    {
        schema: {
            body: z.object({
                goalId: z.number(),
            }),
        },
    },
    async request => {
        const body = request.body
        return createGoalCompletion(body)
    }

)
app.get("/pending-goals", getWeekPendingGoals)
app.post(
    "/goals",
    {
        schema: {
            body: z.object({
                title: z.string(),
                desiredWeeklyFrequency: z.number().int().min(1).max(7),
            }),
        },
    },
    async request => {
        const body = request.body
        await createGoal(body)
    }
)

app.listen({
    port: 3000,
}).then(() => {
    console.log("Server is running on port 3000")
})
