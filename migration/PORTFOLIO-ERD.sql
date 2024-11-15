CREATE TABLE `users` (
  `id` varchar(36) PRIMARY KEY,
  `username` varchar(64),
  `password` varchar(64),
  `profile_name` varchar(64),
  `is_admin` boolean,
  `refresh_token` text,
  `created_at` timestamp DEFAULT NOW()
);

CREATE TABLE `blogs` (
  `id` varchar(36) PRIMARY KEY,
  `writer_id` varchar(36) REFERENCES users(id) ON DELETE CASCADE,
  `title` varchar(64),
  `body` text,
  `category` varchar(64),
  `tags` varchar(64),
  `created_at` timestamp DEFAULT NOW(),
  `updated_at` timestamp DEFAULT NOW()
);

CREATE TABLE `blog_images` (
  `id` varchar(36) PRIMARY KEY,
  `blog_id` varchar(36) REFERENCES blogs(id) ON DELETE CASCADE,
  `name` varchar(64),
  `alt` varchar(64),
  `created_at` timestamp DEFAULT NOW()
);

CREATE TABLE `my_projects` (
  `id` varchar(36) PRIMARY KEY,
  `user_id` varchar(36) REFERENCES users(id) ON DELETE CASCADE,
  `title` varchar(64),
  `tech_stack` varchar(64),
  `created_at` timestamp DEFAULT NOW()
);

CREATE TABLE `project_images` (
  `id` varchar(36) PRIMARY KEY,
  `project_id` varchar(36) REFERENCES my_projects(id) ON DELETE CASCADE,
  `name` varchar(64),
  `alt` varchar(64),
  `created_at` timestamp DEFAULT NOW()
);

CREATE TABLE `testimonies` (
  `id` varchar(36) PRIMARY KEY,
  `user_id` varchar(36) REFERENCES users(id) ON DELETE CASCADE,
  `client_name` varchar(64),
  `description` text,
  `rating` int,
  `created_at` timestamp DEFAULT NOW()
);

-- ALTER TABLE `blogs` ADD FOREIGN KEY (`writer_id`) REFERENCES `users` (`id`);

-- ALTER TABLE `blog_images` ADD FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`);

-- ALTER TABLE `my_projects` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

-- ALTER TABLE `testimonies` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

-- ALTER TABLE `project_images` ADD FOREIGN KEY (`project_id`) REFERENCES `my_projects` (`id`);
