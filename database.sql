CREATE TABLE "list" (
	"id" serial primary key,
	"task" varchar(300),
	"complete" boolean default false
);

INSERT INTO list (task)
VALUES ('complete homework');