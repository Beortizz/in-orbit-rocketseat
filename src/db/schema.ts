import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const goals = pgTable('goals', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    diseredWeeklyFrequency: integer('disered_weekly_frequency').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})