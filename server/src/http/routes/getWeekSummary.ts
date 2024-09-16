import z from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { getWeekSummary } from "../../functions/getWeekSummary"

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
    app.get("/week-summary", getWeekSummary)
}
