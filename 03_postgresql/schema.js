import { pgTable, serial, text, varchar, numeric, timestamp, integer } from 'drizzle-orm/pg-core';

export const cars = pgTable('cars', {
  id: serial('id').primaryKey(),
  make: varchar('make', { length: 255 }).notNull(),
  model: varchar('model', { length: 255 }).notNull(),
  year: integer('year').notNull(),           // optional: integer instead of text
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),  
  createdAt: timestamp('created_at').defaultNow().notNull(),
});