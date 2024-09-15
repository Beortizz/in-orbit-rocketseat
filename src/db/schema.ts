import { pgTable, text, integer, timestamp, serial } from 'drizzle-orm/pg-core'

export const goals = pgTable('goals', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const goalCompletions = pgTable('goal_completions', {
    id: serial('id').primaryKey(),
    goalId: integer('goal_id').notNull().references(() => goals.id),
    completedAt: timestamp('completed_at', { withTimezone: true }).notNull().defaultNow(),
})