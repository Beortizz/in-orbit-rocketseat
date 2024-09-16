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
import { createGoalRoute } from "./routes/createGoal"
import { createGoalCompletionRoute } from "./routes/createGoalCompletion"
import { getPendingGoalsRoute } from "./routes/getPendingGoals"

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getPendingGoalsRoute)




app.listen({
    port: 3000,
}).then(() => {
    console.log("Server is running on port 3000")
})
