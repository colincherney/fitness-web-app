CREATE TABLE USERS (
user_id int auto_increment NOT NULL,
first_name varchar(50) NOT NULL,
last_name varchar(50) NOT NULL,
age int NOT NULL,
email varchar(100) NOT NULL,
phone varchar(20) NOT NULL,
PRIMARY KEY (user_id)
);

CREATE TABLE EXERCISES (
exercise_id int auto_increment NOT NULL,
exercise_name varchar(100) NOT NULL,
category varchar(30) NOT NULL,
weight int NOT NULL,
reps int NOT NULL,
PRIMARY KEY (exercise_id)
);

CREATE TABLE WORKOUTS (
workout_id int auto_increment NOT NULL,
user_id int NOT NULL,
exercise_id int NOT NULL,
category varchar(30) NOT NULL,
weight int NOT NULL,
reps int NOT NULL,
primary key (workout_id),
FOREIGN KEY (user_id) REFERENCES USERS(user_id),
FOREIGN KEY (exercise_id) REFERENCES EXERCISES(exercise_id)
);

CREATE TABLE COMMUNITY (
community_id int auto_increment NOT NULL,
community_name varchar(100) NOT NULL,
community_description varchar(1000),
PRIMARY KEY (community_id)
);

CREATE TABLE POSTS (
post_id int auto_increment NOT NULL,
user_id int NOT NULL,
community_id int NOT NULL,
message varchar(1000) NOT NULL,
primary key (post_id),
FOREIGN KEY (user_id) REFERENCES USERS(user_id),
FOREIGN KEY (community_id) REFERENCES COMMUNITY(community_id)
);