ALTER TABLE "Users" ADD COLUMN "refresh_token" varchar;
ALTER TABLE "Users" ADD COLUMN "refresh_token_expiration_time" TIMESTAMP;