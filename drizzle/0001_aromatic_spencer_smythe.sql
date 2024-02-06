ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "favorite" text[];