CREATE TYPE "public"."sender_enum" AS ENUM('user', 'babu');--> statement-breakpoint
CREATE TYPE "public"."status_enum" AS ENUM('Pending', 'Approved', 'Rejected', 'Completed');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"mobile_number" varchar(15) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(20) NOT NULL,
	"admin_code" varchar(20) NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email"),
	CONSTRAINT "admins_mobile_number_unique" UNIQUE("mobile_number")
);
--> statement-breakpoint
CREATE TABLE "applied_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"service_name" varchar(255) NOT NULL,
	"user_name" varchar(255) NOT NULL,
	"user_mobile" varchar(20) NOT NULL,
	"user_details" text,
	"babu_id" varchar(20) NOT NULL,
	"status" "status_enum" DEFAULT 'Pending' NOT NULL,
	"applied_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "babus" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"mobile_number" varchar(15) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(20) NOT NULL,
	"babu_id" varchar(20) NOT NULL,
	CONSTRAINT "babus_email_unique" UNIQUE("email"),
	CONSTRAINT "babus_mobile_number_unique" UNIQUE("mobile_number"),
	CONSTRAINT "babus_babu_id_unique" UNIQUE("babu_id")
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"service_id" integer NOT NULL,
	"sender" "sender_enum" NOT NULL,
	"message" text NOT NULL,
	"sent_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"mobile_number" varchar(15) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(200) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_mobile_number_unique" UNIQUE("mobile_number")
);
--> statement-breakpoint
ALTER TABLE "applied_services" ADD CONSTRAINT "applied_services_babu_id_babus_babu_id_fk" FOREIGN KEY ("babu_id") REFERENCES "public"."babus"("babu_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_service_id_applied_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."applied_services"("id") ON DELETE cascade ON UPDATE no action;