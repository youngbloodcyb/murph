-- CreateTable
CREATE TABLE "Murph" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "firstMileMin" INTEGER NOT NULL,
    "firstMileSec" INTEGER NOT NULL,
    "secondMileMin" INTEGER NOT NULL,
    "secondMileSec" INTEGER NOT NULL,
    "pullups" INTEGER NOT NULL,
    "pushups" INTEGER NOT NULL,
    "squats" INTEGER NOT NULL,
    "comments" TEXT
);
