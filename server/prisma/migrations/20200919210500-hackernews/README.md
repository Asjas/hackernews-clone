# Migration `20200919210500-hackernews`

This migration has been generated by A-J Roos at 9/19/2020, 11:05:00 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Link" (
"id" SERIAL,
"description" text   NOT NULL ,
"url" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"userId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"id" SERIAL,
"name" text   NOT NULL ,
"email" text   NOT NULL ,
"password" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Vote" (
"id" SERIAL,
"linkId" integer   NOT NULL ,
"userId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Link" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Vote" ADD FOREIGN KEY ("linkId")REFERENCES "public"."Link"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Vote" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200919210500-hackernews
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,33 @@
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Link {
+  id          Int      @id @default(autoincrement())
+  description String
+  url         String
+  createdAt   DateTime @default(now())
+  updatedAt   DateTime @updatedAt
+  postedBy    User
+  votes       Vote[]
+}
+
+model User {
+  id       Int    @id @default(autoincrement())
+  name     String
+  email    String @unique
+  password String
+  links    Link[]
+  votes    Vote[]
+}
+
+model Vote {
+  id   Int  @id @default(autoincrement())
+  link Link
+  user User
+}
```


