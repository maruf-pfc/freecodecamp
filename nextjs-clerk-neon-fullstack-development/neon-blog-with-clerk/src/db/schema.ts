import { text, serial, pgTable, timestamp } from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  author_id: text("author_id").notNull(),
  slug: text("slug").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
