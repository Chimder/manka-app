CREATE TABLE IF NOT EXISTS "Anime" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"img" text NOT NULL,
	"imgHeader" text NOT NULL,
	"describe" text NOT NULL,
	"genres" text[] NOT NULL,
	"author" text NOT NULL,
	"country" text NOT NULL,
	"published" integer,
	"averageRating" double precision DEFAULT 0,
	"ratingCount" integer DEFAULT 0,
	"status" text NOT NULL,
	"popularity" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Chapter" (
	"chapter" integer NOT NULL,
	"img" text[],
	"name" text NOT NULL,
	"animeName" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text[],
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_animeName_Anime_name_fk" FOREIGN KEY ("animeName") REFERENCES "Anime"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
