-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 09, 2020 at 07:06 PM
-- Server version: 8.0.21-0ubuntu0.20.04.4
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `codigo`
--

-- --------------------------------------------------------

--
-- Table structure for table `code`
--

CREATE TABLE `code` (
  `id` int NOT NULL,
  `promo_code` varchar(255) NOT NULL,
  `qr_image` varchar(255) NOT NULL,
  `used` tinyint NOT NULL DEFAULT '0',
  `sold_out` tinyint NOT NULL DEFAULT '0',
  `evoucherId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `code`
--

INSERT INTO `code` (`id`, `promo_code`, `qr_image`, `used`, `sold_out`, `evoucherId`) VALUES
(2411, 'lvolz889406', 'lvolz889406.png', 0, 0, 139),
(2412, 'rbmIW524976', 'rbmIW524976.png', 0, 0, 139),
(2413, 'ZMynA947811', 'ZMynA947811.png', 0, 0, 139),
(2414, 'zKuow299048', 'zKuow299048.png', 0, 0, 139),
(2415, 'ncZGo419284', 'ncZGo419284.png', 0, 0, 140),
(2416, 'KAwcn172620', 'KAwcn172620.png', 0, 0, 140),
(2417, 'glXBp188580', 'glXBp188580.png', 0, 0, 140),
(2418, 'ixaKO829637', 'ixaKO829637.png', 0, 0, 140),
(2419, 'dSEQc619078', 'dSEQc619078.png', 0, 0, 141),
(2420, 'VBpWw073365', 'VBpWw073365.png', 0, 0, 141),
(2421, 'XPfLr026271', 'XPfLr026271.png', 0, 0, 141),
(2422, 'JXxFh855335', 'JXxFh855335.png', 0, 0, 141),
(2423, 'MCTmZ663114', 'MCTmZ663114.png', 0, 0, 142),
(2424, 'ZDNng683316', 'ZDNng683316.png', 0, 0, 142),
(2425, 'ShqxA541570', 'ShqxA541570.png', 0, 0, 142),
(2426, 'pgacy045229', 'pgacy045229.png', 0, 0, 142),
(2427, 'OyCMU862715', 'OyCMU862715.png', 0, 1, 143),
(2428, 'rCqXV413188', 'rCqXV413188.png', 0, 1, 143),
(2429, 'gZtzV106736', 'gZtzV106736.png', 0, 1, 143),
(2430, 'aVmnu666606', 'aVmnu666606.png', 0, 0, 143),
(2431, 'jDwNc531305', 'jDwNc531305.png', 0, 0, 144),
(2432, 'PvCiI209208', 'PvCiI209208.png', 0, 0, 144),
(2433, 'hrySi102201', 'hrySi102201.png', 0, 0, 144),
(2434, 'aqaKU130793', 'aqaKU130793.png', 0, 0, 144),
(2435, 'jSKWD284576', 'jSKWD284576.png', 0, 0, 145),
(2436, 'yvcVd256129', 'yvcVd256129.png', 0, 0, 145),
(2437, 'zoMGm851190', 'zoMGm851190.png', 0, 0, 145),
(2438, 'eScgk745983', 'eScgk745983.png', 0, 0, 145);

-- --------------------------------------------------------

--
-- Table structure for table `evoucher`
--

CREATE TABLE `evoucher` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `payment_discount_type` varchar(255) NOT NULL,
  `discount_percent` int NOT NULL,
  `maximun_limit` int NOT NULL,
  `quantity` int NOT NULL,
  `active` tinyint NOT NULL DEFAULT '0',
  `expiry_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `evoucher`
--

INSERT INTO `evoucher` (`id`, `title`, `description`, `amount`, `payment_discount_type`, `discount_percent`, `maximun_limit`, `quantity`, `active`, `expiry_date`) VALUES
(139, 'Testing 1', 'asdasd', 2000, 'VISA', 10, 4, 4, 0, '2019-09-23 00:00:00'),
(140, 'Testing 1', 'asdasd', 2000, 'VISA', 10, 4, 4, 1, '2019-09-23 00:00:00'),
(141, 'Testing 1', 'asdasd', 2000, 'VISA', 10, 4, 4, 1, '2019-09-23 00:00:00'),
(142, 'Testing 1', 'asdasd', 2000, 'VISA', 10, 4, 4, 1, '2019-09-23 00:00:00'),
(143, 'Testing 1', 'asdasd', 2000, 'VISA', 10, 4, 4, 1, '2021-09-23 00:00:00'),
(144, 'Testing 1', 'asdasd', 2000, 'VISA', 10, 4, 4, 1, '2021-09-23 00:00:00'),
(145, 'Testing 1', 'asdasd', 2000, 'VISA', 10, 4, 4, 1, '2021-09-23 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `name` varchar(255) NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `phone_no`, `id`) VALUES
('', '', 1),
('', '', 2),
('', '', 3),
('', '', 4),
('', '', 5),
('', '', 6),
('', '', 7),
('', '', 8),
('', '', 9),
('', '', 10),
('', '', 11),
('', '', 12),
('', '', 13),
('', '', 14),
('', '', 15),
('', '', 16),
('', '', 17),
('', '', 18),
('', '', 19),
('', '', 20),
('', '', 21),
('', '', 22),
('', '', 23),
('', '', 24),
('', '', 25),
('', '', 26),
('', '', 27),
('', '', 28),
('', '', 29),
('', '', 30),
('', '', 31),
('', '', 32),
('', '', 33),
('', '', 34),
('', '', 35),
('', '', 36),
('', '', 37),
('', '', 38),
('', '', 39),
('', '', 40),
('', '', 41),
('', '', 42),
('', '', 43),
('', '', 44),
('', '', 45),
('', '', 46),
('', '', 47),
('', '', 48),
('', '', 49),
('', '', 50),
('', '', 51),
('', '', 52),
('', '', 53),
('', '', 54),
('', '', 55),
('', '', 56),
('', '', 57),
('', '', 58),
('', '', 59),
('', '', 60),
('', '', 61),
('', '', 62),
('', '', 63),
('', '', 64),
('', '', 65),
('', '', 66),
('', '', 67),
('', '', 68),
('', '', 69),
('', '', 70),
('', '', 71),
('', '', 72),
('', '', 73),
('', '', 74),
('', '', 75),
('', '', 76),
('', '', 77),
('', '', 78),
('', '', 79),
('', '', 80),
('', '', 81),
('', '', 82),
('', '', 83),
('', '', 84),
('', '', 85),
('', '', 86),
('', '', 87),
('', '', 88),
('', '', 89),
('', '', 90),
('', '', 91),
('', '', 92),
('', '', 93),
('', '', 94),
('', '', 95),
('', '', 96),
('', '', 97),
('', '', 98),
('', '', 99),
('', '', 100),
('', '', 101),
('', '', 102),
('', '', 103),
('', '', 104),
('', '', 105),
('', '', 106),
('', '', 107),
('', '', 108),
('', '', 109),
('', '', 110);

-- --------------------------------------------------------

--
-- Table structure for table `user_code`
--

CREATE TABLE `user_code` (
  `id` int NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `evoucherId` int DEFAULT NULL,
  `codeId` int DEFAULT NULL,
  `amount` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_code`
--

INSERT INTO `user_code` (`id`, `phone_no`, `evoucherId`, `codeId`, `amount`) VALUES
(7, '123123', 143, 2427, 1800),
(8, '123123', 143, 2429, 1800);

-- --------------------------------------------------------

--
-- Table structure for table `user_gift`
--

CREATE TABLE `user_gift` (
  `id` int NOT NULL,
  `phone_no` varchar(255) NOT NULL,
  `to_user` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `evoucherId` int DEFAULT NULL,
  `codeId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_gift`
--

INSERT INTO `user_gift` (`id`, `phone_no`, `to_user`, `amount`, `evoucherId`, `codeId`) VALUES
(5, '123123', '09420298439', 1800, 143, 2428);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `code`
--
ALTER TABLE `code`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_12ec2502b675af15fc6af9aea24` (`evoucherId`);

--
-- Indexes for table `evoucher`
--
ALTER TABLE `evoucher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_code`
--
ALTER TABLE `user_code`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_29e81b5f4298e06f7a4ef402776` (`evoucherId`),
  ADD KEY `FK_9185f44372c64e7b10de077e40e` (`codeId`);

--
-- Indexes for table `user_gift`
--
ALTER TABLE `user_gift`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_49d5a84487c396aa0fbbb044ec7` (`evoucherId`),
  ADD KEY `FK_3d61a01577ec7145a4b0600e613` (`codeId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `code`
--
ALTER TABLE `code`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2439;

--
-- AUTO_INCREMENT for table `evoucher`
--
ALTER TABLE `evoucher`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `user_code`
--
ALTER TABLE `user_code`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_gift`
--
ALTER TABLE `user_gift`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `code`
--
ALTER TABLE `code`
  ADD CONSTRAINT `FK_12ec2502b675af15fc6af9aea24` FOREIGN KEY (`evoucherId`) REFERENCES `evoucher` (`id`);

--
-- Constraints for table `user_code`
--
ALTER TABLE `user_code`
  ADD CONSTRAINT `FK_29e81b5f4298e06f7a4ef402776` FOREIGN KEY (`evoucherId`) REFERENCES `evoucher` (`id`),
  ADD CONSTRAINT `FK_9185f44372c64e7b10de077e40e` FOREIGN KEY (`codeId`) REFERENCES `code` (`id`);

--
-- Constraints for table `user_gift`
--
ALTER TABLE `user_gift`
  ADD CONSTRAINT `FK_3d61a01577ec7145a4b0600e613` FOREIGN KEY (`codeId`) REFERENCES `code` (`id`),
  ADD CONSTRAINT `FK_49d5a84487c396aa0fbbb044ec7` FOREIGN KEY (`evoucherId`) REFERENCES `evoucher` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
