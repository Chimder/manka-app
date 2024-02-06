import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

const client = postgres(process.env.DATABASE_URL as string, { max: 1 })
export const db = drizzle(client, { schema })

// const migrateDb = async () => {
//   try {
//     console.log('🟠 Migrating client')
//     await migrate(db, { migrationsFolder: 'migrations' })
//     console.log('🟢 Successfully Migrated')
//   } catch (error) {
//     console.log('🔴 Error Migrating client', error)
//   }
// }
// migrateDb()
