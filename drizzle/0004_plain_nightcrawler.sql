ALTER TABLE "Anime" ADD CONSTRAINT "Anime_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_email_unique" UNIQUE("email");