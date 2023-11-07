CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "Users" (
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"nickname" varchar NOT NULL,
	"email" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"token" varchar,
	"token_expiration_time" TIMESTAMP,
	"admin" bool NOT NULL DEFAULT 'false',
	"avatar" bytea,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
);



CREATE TABLE "Rooms" (
	"id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"image" bytea,
	"system" varchar NOT NULL,
	"invitation_link" varchar NOT NULL,
	"owner" uuid NOT NULL,
	"private" bool NOT NULL DEFAULT 'false',
	CONSTRAINT "Rooms_pk" PRIMARY KEY ("id")
);



CREATE TABLE "User_room" (
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid NOT NULL,
	"room_id" uuid NOT NULL,
	CONSTRAINT "User_room_pk" PRIMARY KEY ("id")
);



CREATE TABLE "Remember_me" (
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid NOT NULL,
	"remember_token" varchar NOT NULL,
	CONSTRAINT "Remember_me_pk" PRIMARY KEY ("id")
);



CREATE TABLE "Characters" (
	"id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"room_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"avatar" bytea NOT NULL,
	"data" json NOT NULL,
	CONSTRAINT "Characters_pk" PRIMARY KEY ("id")
);



CREATE TABLE "Messages" (
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid NOT NULL,
	"room_id" uuid NOT NULL,
	"message" varchar NOT NULL,
	"timestamp" TIMESTAMP NOT NULL,
	CONSTRAINT "Messages_pk" PRIMARY KEY ("id")
);



CREATE TABLE "Rolls" (
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid NOT NULL,
	"room_id" uuid NOT NULL,
	"roll" json NOT NULL,
	"timestamp" TIMESTAMP NOT NULL,
	CONSTRAINT "Rolls_pk" PRIMARY KEY ("id")
);




ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_fk0" FOREIGN KEY ("owner") REFERENCES "Users"("id");

ALTER TABLE "User_room" ADD CONSTRAINT "User_room_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "User_room" ADD CONSTRAINT "User_room_fk1" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id");

ALTER TABLE "Remember_me" ADD CONSTRAINT "Remember_me_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");

ALTER TABLE "Characters" ADD CONSTRAINT "Characters_fk0" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id");
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_fk1" FOREIGN KEY ("user_id") REFERENCES "Users"("id");

ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk1" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id");

ALTER TABLE "Rolls" ADD CONSTRAINT "Rolls_fk0" FOREIGN KEY ("user_id") REFERENCES "Users"("id");
ALTER TABLE "Rolls" ADD CONSTRAINT "Rolls_fk1" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id");