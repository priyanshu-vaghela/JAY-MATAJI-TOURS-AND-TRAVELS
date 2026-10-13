-- phpMyAdmin SQL Dump
-- Database: `jay_mataji`

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Table structure for table `destinations`
--

CREATE TABLE IF NOT EXISTS `destinations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`id`, `name`, `location`, `image`, `rating`, `description`) VALUES
(1, 'Dwarka', 'Gujarat, India', './assets/Popular/Dwarka.jpeg', 5, 'Explore the spiritual and historical charm of Dwarka, one of the four sacred Char Dham pilgrimage sites in India, known for its ancient temples and serene coastal beauty.'),
(2, 'Somnath & Gir', 'Gujarat, India', './assets/Popular/The Cape.jpeg', 5, 'Experience the eternal shrine of Somnath on the Arabian Sea coast, paired with the wild beauty of Sasan Gir, home to the majestic Asiatic lions.'),
(3, 'Rajasthan', 'India', './assets/optimized/rajasthan.jpg', 5, 'Immerse yourself in royal heritage, grand hilltop forts, ornate palace courtyards, vibrant bazaars, and timeless desert landscapes.'),
(4, 'Goa', 'India', './assets/Popular/Goa.jpeg', 5, 'Experience the vibrant culture, golden beaches, and lively Portuguese-influenced coastal heritage of Goa.')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `location`=VALUES(`location`), `image`=VALUES(`image`), `description`=VALUES(`description`);

--
-- Table structure for table `destinations_details`
--

CREATE TABLE IF NOT EXISTS `destinations_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `description` text NOT NULL,
  `best_time` varchar(20) NOT NULL,
  `famous_for` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinations_details`
--

INSERT INTO `destinations_details` (`id`, `name`, `location`, `image`, `rating`, `description`, `best_time`, `famous_for`) VALUES
(1, 'Dwarka', 'Gujarat, India', './assets/Popular/Dwarka.jpeg', 5, 'Dwarka, one of the four sacred Char Dham pilgrimage sites, is steeped in mythology and history. Revered as the ancient kingdom of Lord Krishna, this coastal city is famous for its grand temples, spiritual atmosphere, and scenic beaches. Pilgrims and travelers alike are drawn to its timeless charm and tranquil beauty.', 'Oct - Mar', 'Temples, Pilgrimage, Beaches'),
(2, 'Somnath & Gir', 'Gujarat, India', './assets/Popular/The Cape.jpeg', 5, 'Somnath is the first among the twelve holy Jyotirlingas, overlooking the Arabian Sea with majestic Chalukya architecture. Nearby Sasan Gir offers the world exclusive access to Asiatic lions in their pristine natural habitat.', 'Nov - Mar', 'First Jyotirlinga, Lion Safari, Coastal Temples'),
(3, 'Rajasthan', 'India', './assets/optimized/rajasthan.jpg', 5, 'Rajasthan brings together grand forts, ornate palaces, living traditions, and vast desert landscapes shaped by centuries of royal history.', 'Oct - Mar', 'Forts, palaces, desert culture'),
(4, 'Goa', 'India', './assets/Popular/Goa.jpeg', 5, 'Goa pairs golden beaches and palm-lined villages with colourful markets, coastal food, and a vibrant Portuguese-influenced heritage.', 'Nov - Mar', 'Beaches, heritage, nightlife')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `location`=VALUES(`location`), `image`=VALUES(`image`), `description`=VALUES(`description`), `best_time`=VALUES(`best_time`), `famous_for`=VALUES(`famous_for`);

--
-- Table structure for table `key_attractions`
--

CREATE TABLE IF NOT EXISTS `key_attractions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `destination_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `destination_id` (`destination_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `key_attractions`
--

INSERT INTO `key_attractions` (`id`, `destination_id`, `name`, `description`) VALUES
(1, 1, 'Dwarkadhish Temple', 'The grand 5-storey temple dedicated to Lord Krishna on Gomti confluence.'),
(2, 1, 'Bet Dwarka', 'A sacred island with ancient temples and tranquil beaches.'),
(3, 1, 'Nageshwar Jyotirlinga', 'One of the twelve holy Jyotirlingas with an 85-foot Shiva statue.'),
(4, 1, 'Gomti Ghat', 'A holy riverfront for rituals and scenic sunset prayers.'),
(5, 1, 'Shivrajpur Beach', 'Blue Flag certified pristine white-sand beach with clear waters.'),
(6, 2, 'Somnath Jyotirlinga Temple', 'First among twelve Jyotirlingas, with evening light and sound show.'),
(7, 2, 'Gir National Park & Safari', 'The only natural sanctuary of the Asiatic lion in the world.'),
(8, 2, 'Triveni Sangam', 'Sacred confluence of three holy rivers: Hiran, Kapila, and Saraswati.'),
(9, 2, 'Bhalka Tirth', 'The holy grove where Lord Krishna concluded his earthly journey.'),
(10, 3, 'Amber Fort', 'A hilltop fort outside Jaipur with grand courtyards and sweeping views.'),
(11, 3, 'City Palace, Udaipur', 'A lakeside palace complex that reflects Rajasthan’s royal heritage.'),
(12, 3, 'Jaisalmer Fort', 'A living desert fort of golden sandstone rising above the Thar.'),
(13, 4, 'Baga Beach', 'A lively beach known for water sports, cafés, and sunset walks.'),
(14, 4, 'Basilica of Bom Jesus', 'A UNESCO-listed church and landmark of Old Goa.'),
(15, 4, 'Fontainhas', 'Panjim’s colourful Latin Quarter, full of Portuguese-era character.')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `description`=VALUES(`description`);

--
-- Table structure for table `bookings`
--

CREATE TABLE IF NOT EXISTS `bookings` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `public_reference` VARCHAR(24) NOT NULL UNIQUE,
  `customer_name` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(40) NOT NULL,
  `email` VARCHAR(254) NULL,
  `trip_label` VARCHAR(180) NOT NULL,
  `travel_date` DATE NOT NULL,
  `pickup_location` VARCHAR(255) NOT NULL,
  `passengers` SMALLINT UNSIGNED NOT NULL,
  `vehicle_preference` VARCHAR(80) NULL,
  `return_trip` TINYINT(1) NOT NULL DEFAULT 0,
  `return_date` DATE NULL,
  `notes` TEXT NULL,
  `status` ENUM('new','contacted','confirmed','completed','cancelled','rejected') NOT NULL DEFAULT 'new',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_bookings_status_date` (`status`, `travel_date`),
  INDEX `idx_bookings_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `admins`
--

CREATE TABLE IF NOT EXISTS `admins` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(120) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login_at` TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `booking_status_history`
--

CREATE TABLE IF NOT EXISTS `booking_status_history` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `booking_id` BIGINT UNSIGNED NOT NULL,
  `old_status` VARCHAR(20) NULL,
  `new_status` VARCHAR(20) NOT NULL,
  `changed_by_admin_id` BIGINT UNSIGNED NOT NULL,
  `note` VARCHAR(500) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_booking_history_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_booking_history_admin` FOREIGN KEY (`changed_by_admin_id`) REFERENCES `admins`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
