import { goals } from "../db/schema"
import { goalCompletions } from "../db/schema"
import z from "zod"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import { and, sql, lte, gte, count, eq } from "drizzle-orm"
import { db } from "../db"
dayjs.extend(isBetween)

interface createGoalCompletionRequest {
    goalId: number
}

export async function createGoalCompletion(
    validatedRequest: createGoalCompletionRequest
) {

    const firstDayOfWeek = dayjs().startOf("week").toDate() // Start of current week
    const lastDayOfWeek = dayjs().endOf("week").toDate() // End of current week

    const goalCompletionCounts = db.$with("goal_completion_counts").as(
        db
            .select({
                goalId: goalCompletions.goalId,
                completionCount: count(goalCompletions.id).as(
                    "completionCount"
                ),
            })
            .from(goalCompletions)
            .where(
                and(
                    gte(goalCompletions.completedAt, firstDayOfWeek),
                    lte(goalCompletions.completedAt, lastDayOfWeek),
                    eq(goalCompletions.goalId, validatedRequest.goalId)
                )
            )
            .groupBy(goalCompletions.goalId)
    )

    const result = await db
        .with(goalCompletionCounts)
        .select({
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            completionCount:
                sql`COALESCE(${goalCompletionCounts.completionCount}, 0)`.mapWith(
                    Number
                ),
        })
        .from(goals)
        .leftJoin(
            goalCompletionCounts,
            eq(goalCompletionCounts.goalId, goals.id)
        )
        .where(eq(goals.id, validatedRequest.goalId))
        .limit(1)
    const { desiredWeeklyFrequency, completionCount } = result[0]

    if (completionCount >= desiredWeeklyFrequency) {
        throw new Error("Goal already completed for the week")
    }
    const insertResult = await db
        .insert(goalCompletions)
        .values({ goalId: validatedRequest.goalId })
        .returning()
    const goalCompletion = insertResult[0]
    return {
        goalCompletion,
    }
}
