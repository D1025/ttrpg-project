CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "users" (
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"nickname" varchar NOT NULL,
	"email" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"token" varchar,
	"token_expiration_time" TIMESTAMP,
	"admin" bool NOT NULL DEFAULT 'false',
	"avatar" bytea,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);



CREATE TABLE "rooms" (
	"id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"image" bytea,
	"system" varchar NOT NULL,
	"invitation_link" varchar NOT NULL,
	"owner" uuid NOT NULL,
	"private" bool NOT NULL DEFAULT 'false',
	CONSTRAINT "rooms_pk" PRIMARY KEY ("id")
);



CREATE TABLE "user_room" (
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid NOT NULL,
	"room_id" uuid NOT NULL,
	CONSTRAINT "user_room_pk" PRIMARY KEY ("id")
);



CREATE TABLE "remember_me" (
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid NOT NULL,
	"remember_token" varchar NOT NULL,
	CONSTRAINT "remember_me_pk" PRIMARY KEY ("id")
);



CREATE TABLE "characters" (
	"id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"room_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"avatar" bytea NOT NULL,
	"data" json NOT NULL,
	CONSTRAINT "characters_pk" PRIMARY KEY ("id")
);



CREATE TABLE "messages" (
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid NOT NULL,
	"room_id" uuid NOT NULL,
	"message" varchar NOT NULL,
	"timestamp" TIMESTAMP NOT NULL,
	CONSTRAINT "messages_pk" PRIMARY KEY ("id")
);



CREATE TABLE "rolls" (
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid NOT NULL,
	"room_id" uuid NOT NULL,
	"roll" json NOT NULL,
	"timestamp" TIMESTAMP NOT NULL,
	CONSTRAINT "rolls_pk" PRIMARY KEY ("id")
);




ALTER TABLE "rooms" ADD CONSTRAINT "rooms_fk0" FOREIGN KEY ("owner") REFERENCES "users"("id");

ALTER TABLE "user_room" ADD CONSTRAINT "user_room_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "user_room" ADD CONSTRAINT "user_room_fk1" FOREIGN KEY ("room_id") REFERENCES "rooms"("id");

ALTER TABLE "remember_me" ADD CONSTRAINT "remember_me_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "characters" ADD CONSTRAINT "characters_fk0" FOREIGN KEY ("room_id") REFERENCES "rooms"("id");
ALTER TABLE "characters" ADD CONSTRAINT "characters_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("room_id") REFERENCES "rooms"("id");

ALTER TABLE "rolls" ADD CONSTRAINT "rolls_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "rolls" ADD CONSTRAINT "rolls_fk1" FOREIGN KEY ("room_id") REFERENCES "rooms"("id");