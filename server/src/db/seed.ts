import { client, db } from '.'
import { goals, goalCompletions } from './schema'
import dayjs from 'dayjs'

async function seed() {
    await db.delete(goals)
    await db.delete(goalCompletions)

    const result = await db.insert(goals).values([
        { title: 'Workout', desiredWeeklyFrequency: 3 },
        { title: 'Read', desiredWeeklyFrequency: 2 },
        { title: 'Meditate', desiredWeeklyFrequency: 5 },
    ]).returning();

    const startOfWeek = dayjs().startOf('week')

    await db.insert(goalCompletions).values([
        { goalId: result[0].id, completedAt: startOfWeek.toDate() },
        { goalId: result[1].id, completedAt: startOfWeek.add(1, 'day').toDate() },  
    ])
}

seed().finally(() => {
    client.end()
    console.log('Seed complete')
})
