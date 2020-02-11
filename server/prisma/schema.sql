CREATE TABLE "public"."Link" (
  link_id SERIAL PRIMARY KEY NOT NULL,
  -- created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  description VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,

  FOREIGN KEY (link_id) REFERENCES "public"."User"(user_id)
);

CREATE TABLE "public"."User" (
  user_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
  password VARCHAR(255) NOT NULL
);

CREATE TABLE "public"."Vote" (
  vote_id SERIAL PRIMARY KEY NOT NULL,
  bio TEXT,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "public"."User"(user_id)
);
