-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2025 at 04:39 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jay_mataji`
--

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`id`, `name`, `location`, `image`, `rating`, `description`) VALUES
(1, 'Dwarka', 'Gujarat', './assets/Popular/Dwarka.jpeg', 5, 'Explore the spiritual and historical charm of Dwarka, one of the most sacred pilgrimage sites in India, known for its ancient temples and serene coastal beauty.'),
(2, 'Goa', 'INDIA', './assets/Popular/The Cape.jpeg', 5, 'Experience the vibrant culture, stunning beaches, and lively nightlife of Goa, a destination that offers something for everyone.'),
(3, 'Rajasthan', 'INDIA', './assets/optimized/rajasthan.jpg', 5, 'Immerse yourself in the royal heritage of Rajasthan, known for its majestic palaces, vibrant culture, and timeless desert landscapes.');

-- --------------------------------------------------------

--
-- Table structure for table `destinations_details`
--

CREATE TABLE `destinations_details` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `description` text NOT NULL,
  `best_time` varchar(20) NOT NULL,
  `famous_for` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinations_details`
--

INSERT INTO `destinations_details` (`id`, `name`, `location`, `image`, `rating`, `description`, `best_time`, `famous_for`) VALUES
(1, 'Dwarka', 'Gujarat', '../assets/Popular/Dwarka.jpeg', 5, 'Dwarka, one of the four sacred Char Dham pilgrimage sites, is steeped in mythology and history. Revered as the ancient kingdom of Lord Krishna, this coastal city is famous for its grand temples, spiritual atmosphere, and scenic beaches. Pilgrims and travelers alike are drawn to its timeless charm and tranquil beauty.', 'Oct - Mar', 'Temples, Pilgrimage, Beaches'),
(2, 'Goa', 'India', '../assets/Popular/The Cape.jpeg', 5, 'Goa pairs golden beaches and palm-lined villages with colourful markets, coastal food, and a vibrant Portuguese-influenced heritage.', 'Nov - Mar', 'Beaches, heritage, nightlife'),
(3, 'Rajasthan', 'India', '../assets/optimized/rajasthan.jpg', 5, 'Rajasthan brings together grand forts, ornate palaces, living traditions, and vast desert landscapes shaped by centuries of royal history.', 'Oct - Mar', 'Forts, palaces, desert culture');

-- --------------------------------------------------------

--
-- Table structure for table `key_attractions`
--

CREATE TABLE `key_attractions` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `key_attractions`
--

INSERT INTO `key_attractions` (`id`, `destination_id`, `name`, `description`) VALUES
(1, 1, 'Dwarkadhish Temple', 'The grand temple dedicated to Lord Krishna.'),
(2, 1, 'Bet Dwarka', 'A sacred island with ancient temples and beautiful beaches.'),
(3, 1, 'Rukmini Devi Temple', 'Dedicated to Krishna’s consort, Rukmini.'),
(4, 1, 'Gomti Ghat', 'A holy riverfront for rituals and prayers.'),
(5, 2, 'Baga Beach', 'A lively beach known for water sports, cafés, and sunset walks.'),
(6, 2, 'Basilica of Bom Jesus', 'A UNESCO-listed church and an important landmark of Old Goa.'),
(7, 2, 'Fontainhas', 'Panjim’s colourful Latin Quarter, full of Portuguese-era character.'),
(8, 3, 'Amber Fort', 'A hilltop fort outside Jaipur with grand courtyards and sweeping views.'),
(9, 3, 'City Palace, Udaipur', 'A lakeside palace complex that reflects Rajasthan’s royal heritage.'),
(10, 3, 'Jaisalmer Fort', 'A living desert fort of golden sandstone, rising above the Thar.' );

--
-- Indexes for dumped tables
--

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `destinations_details`
--
ALTER TABLE `destinations_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `key_attractions`
--
ALTER TABLE `key_attractions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `destinations_details`
--
ALTER TABLE `destinations_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `key_attractions`
--
ALTER TABLE `key_attractions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `key_attractions`
--
ALTER TABLE `key_attractions`
  ADD CONSTRAINT `key_attractions_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations_details` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
