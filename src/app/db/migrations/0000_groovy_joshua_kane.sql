CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(25) NOT NULL,
	"last_name" varchar(25) NOT NULL,
	"email" varchar(20) NOT NULL,
	"mobile_number" varchar(10) NOT NULL,
	"password" varchar(255) NOT NULL,
	"admin_code" varchar(20) NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email"),
	CONSTRAINT "admins_mobile_number_unique" UNIQUE("mobile_number")
);
--> statement-breakpoint
CREATE TABLE "babus" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(25) NOT NULL,
	"last_name" varchar(25) NOT NULL,
	"email" varchar(20) NOT NULL,
	"mobile_number" varchar(10) NOT NULL,
	"password" varchar(255) NOT NULL,
	"babu_id" varchar(20) NOT NULL,
	CONSTRAINT "babus_email_unique" UNIQUE("email"),
	CONSTRAINT "babus_mobile_number_unique" UNIQUE("mobile_number"),
	CONSTRAINT "babus_babu_id_unique" UNIQUE("babu_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(25) NOT NULL,
	"last_name" varchar(25) NOT NULL,
	"email" varchar(20) NOT NULL,
	"mobile_number" varchar(10) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(10) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_mobile_number_unique" UNIQUE("mobile_number")
);
