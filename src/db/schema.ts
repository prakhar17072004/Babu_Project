import { pgTable, serial, text, varchar, integer } from 'drizzle-orm/pg-core';

// Define the "authers" table
export const users = pgTable('user', {
    id: serial('id').primaryKey(), // Primary key for authors
    auther_name: varchar('user_name', { length: 25 }).notNull(), // Name of the author
    mobile: integer('mobile_number').notNull(), // Email of the author
    
});

// // Define the "books" table
// export const books = pgTable('books', {
//     id: serial('id').primaryKey(), // Primary key for books
//     auther_id: integer('auther_id') // Foreign key referencing `authers.id`
//         .notNull()
//         .references(() => authers.id),
//     books_name: varchar('books_name', { length: 25 }).notNull(), // Name of the book
// });