import { timestamp } from 'drizzle-orm/gel-core';
import { pgTable, serial, text, varchar} from 'drizzle-orm/pg-core';
import { numeric } from 'drizzle-orm/sqlite-core';

export const cars = pgTable('cars', {
  id: serial('id').primaryKey(),
  make: varchar('make', { length: 255 }).notNull(),
  model: varchar('model', { length: 255 }).notNull(),
  year: text('year').notNull(),   
  price:numeric('price', { precision: 10, scale: 2 }).notNull(),  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});