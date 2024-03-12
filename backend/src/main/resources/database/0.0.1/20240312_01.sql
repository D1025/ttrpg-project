CREATE TABLE "active_users" (
                         "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
                            "user_id" uuid NOT NULL,
                            "room_id" uuid NOT NULL,
                            CONSTRAINT "active_users_pk" PRIMARY KEY ("id")
);
