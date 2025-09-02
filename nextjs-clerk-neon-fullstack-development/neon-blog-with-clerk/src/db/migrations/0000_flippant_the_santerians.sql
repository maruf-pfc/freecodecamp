CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"author" text NOT NULL,
	"author_id" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
