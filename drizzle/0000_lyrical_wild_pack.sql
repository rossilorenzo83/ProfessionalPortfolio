CREATE TABLE IF NOT EXISTS "contact_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"location" text NOT NULL,
	"social" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"read" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "github_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"repo_count" integer NOT NULL,
	"stars" integer NOT NULL,
	"forks" integer NOT NULL,
	"contributions" integer NOT NULL,
	"contribution_period" jsonb NOT NULL,
	"languages" jsonb NOT NULL,
	"recent_repos" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"current_role" text NOT NULL,
	"experience" text NOT NULL,
	"location" text NOT NULL,
	"education" text NOT NULL,
	"avatar" text NOT NULL,
	"linkedin_url" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"live_url" text,
	"github_url" text,
	"tech" text[] NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resume_cv" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"file_url" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"level" integer NOT NULL,
	"type" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
