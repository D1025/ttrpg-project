ALTER TABLE "users" ADD COLUMN "refresh_token" varchar;
ALTER TABLE "users" ADD COLUMN "refresh_token_expiration_time" TIMESTAMP;