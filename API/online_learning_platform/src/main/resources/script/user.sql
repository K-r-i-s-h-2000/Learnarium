create table user(
	version BIGINT,
	created_by VARCHAR(255),
	created_date DATE,
	created_date_time TIMESTAMP,
	last_modified_by VARCHAR(255),
	last_modified_date DATE,
	last_modified_date_time TIMESTAMP,
	id SERIAL primary key,
	firstname VARCHAR(255) not null,
	lastname VARCHAR(255) not null,
	email VARCHAR(255) not null unique,
	password VARCHAR(255) not null,
	role VARCHAR(20) not null,
	is_active BOOLEAN default false
);
