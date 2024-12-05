SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `administrator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password_hash` text NOT NULL,
  `is_super` tinyint(1) NOT NULL DEFAULT 0,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);

CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `qr_code` text DEFAULT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);

CREATE TABLE `employee_atendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `max_hours` int(11) NOT NULL,
  `check_in_time` time NOT NULL,
  `check_out_time` time DEFAULT NULL,
  `manager_id` int(11),
  `client_id` int(11),
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);

CREATE TABLE `manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `username` varchar(128) NOT NULL,
  `password_hash` text NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_type` varchar(32) NOT NULL,
  -- `user_type` enum('administrator', 'manager') NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`)
);

ALTER TABLE `employee_atendance`
  ADD CONSTRAINT `fk_employee_atendance_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_employee_atendance_manager` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_employee_atendance_client` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE SET NULL;

ALTER TABLE `manager`
  ADD CONSTRAINT `fk_manager_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE;

COMMIT;