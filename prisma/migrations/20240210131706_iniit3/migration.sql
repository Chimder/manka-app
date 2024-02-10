-- CreateTable
CREATE TABLE "Anime" (
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "imgHeader" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    "genres" TEXT[],
    "author" TEXT,
    "country" TEXT NOT NULL,
    "published" INTEGER NOT NULL,
    "averageRating" DOUBLE PRECISION DEFAULT 0,
    "ratingCount" INTEGER DEFAULT 0,
    "status" TEXT NOT NULL,
    "popularity" INTEGER DEFAULT 0,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "chapter" INTEGER NOT NULL,
    "img" TEXT[],
    "name" TEXT NOT NULL,
    "animeName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "favorite" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Anime_name_key" ON "Anime"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_name_key" ON "Chapter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_animeName_fkey" FOREIGN KEY ("animeName") REFERENCES "Anime"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
