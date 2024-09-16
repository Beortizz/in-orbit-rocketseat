import z from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { createGoalCompletion } from "../../functions/createGoalCompletion"

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
    app.post(
        "/goal-completions",
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
}
