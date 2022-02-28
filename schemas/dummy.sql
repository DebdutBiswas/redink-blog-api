SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `redinkblog`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int UNSIGNED NOT NULL,
  `author_id` int UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `author_id`, `title`, `description`, `creation_date`, `last_updated`) VALUES
(1, 3, 'Post1', 'This is post 1.', '2022-02-27 00:04:30', '2022-02-27 06:29:55'),
(2, 3, 'Post2', 'This is post 2.', '2022-02-27 06:44:01', '2022-02-27 06:44:01'),
(3, 4, 'Post3 Title', 'This is post 3 description.', '2022-02-27 05:33:00', '2022-02-27 23:02:21'),
(4, 5, 'Post4', 'This is post 4.', '2022-02-27 06:35:23', '2022-02-27 06:35:23'),
(5, 5, 'Post5 New Title', 'This is post 5 new description.', '2022-02-27 06:35:34', '2022-02-27 06:39:53'),
(6, 5, 'Post6', 'This is post 6.', '2022-02-27 06:35:41', '2022-02-27 06:35:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `role` tinyint UNSIGNED NOT NULL,
  `reg_by` int UNSIGNED DEFAULT NULL,
  `reg_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `active`, `role`, `reg_by`, `reg_date`) VALUES
(1, 'admin', '$2a$10$8AgpMkRZeqF9i7nRufwa7.UJlCRI1VkUsrKt/OEWFFLh5Gy53D0um', 'Super Admin', 'redinkblogadmin@redinkmailhog', 1, 1, 1, '2022-02-26 20:13:51'),
(2, 'debdut', '$2a$10$iVsMppi6ENO5ERP6CBdemOh9R7KS447/zDDh3jkdQyxbsLkEUeKTS', 'Debdut', 'debdut@outlook.in', 1, 2, 1, '2022-02-26 20:15:43'),
(3, 'anubhav', '$2a$10$KHff.O7LN3Uprj4V7ebAAuyjnWo5egGdFzi7BuQIfPy2yWYy6BgYe', 'Anubhav Singh Bassi', 'anubhav.redinkbloguser@redinkmailhog', 1, 3, 2, '2022-02-26 20:22:31'),
(4, 'abhishek', '$2a$10$ok17F6.oJKni3kF1zLfKWOxuvMWcobzr0GNLXBfhTeun/QW2v2TM2', 'Abhishek Upmanyu', 'abhishek.redinkbloguser@redinkmailhog', 1, 3, 2, '2022-02-26 20:23:22'),
(5, 'abish', '$2a$10$vyjUNqJsW0xaZKFn/cObV.B5BK0NJmLq8/.nt.WeBuVka/YC.P23q', 'Abish Mathew', 'abish.redinkbloguser@redinkmailhog', 1, 3, 2, '2022-02-26 20:24:52'),
(6, 'aditi', '$2a$10$5EJxlQd3vykzjKX.W8HRCOO4o/K3U8uBP8.C10x77iZZjMGkEwuYG', 'Aditi Mittal', 'aditi.redinkbloguser@redinkmailhog', 1, 3, 2, '2022-02-26 20:26:03'),
(7, 'appurv', '$2a$10$tBDn8.PivUc/HpgPz41JAu4rYPL40./H4a/h7L2VH8BK4SJgcaTdS', 'Appurv Gupta', 'appurv.redinkbloguser@redinkmailhog', 1, 3, 2, '2022-02-26 20:27:25'),
(8, 'atul', '$2a$10$Z1a89Hn1xUDf.fa6bm7u0OXqdtZrBLaaSZcpLLydFudu4HetPK/vm', 'Atul Khatri', 'atul.redinkbloguser@redinkmailhog', 1, 3, 2, '2022-02-26 20:28:16'),
(9, 'biswa', '$2a$10$DM25SskR/avKfH2Ozq0kV.c.X0QjfJWHtE5HgGQ0KYyYkQ0S0QKmW', 'Biswa Kalyan Rath', 'biswa.redinkbloguser@redinkmailhog', 1, 3, 2, '2022-02-26 20:29:12'),
(10, 'rahul', '$2a$10$D75wg9TA6Tkw/eLZ9kF.Gu8H4upkwI1qxwaJ7F9PEOTQyCL5ElMyq', 'Rahul Subramanian', 'rahul.redinkbloguser@redinkmailhog', 1, 3, 2, '2022-02-26 20:30:49'),
(11, 'sorabh', '$2a$10$uenclE4oowfCHqmg3P0E8.OZRXFKcR8ZK6kYvgFrPwnzCjZ1EuTWW', 'Sorabh Pant', 'sorabh.redinkbloguser@redinkmailhog', 1, 3, 2, '2022-02-26 20:32:06'),
(12, 'vir', '$2a$10$KHOSsQY9meLkiTtqdqMI8u786r96MSsYoIXSdGo9IEKm1pn2o3KVq', 'Vir Das', 'vir.redinkbloguser@redinkmailhog', 1, 3, 2, '2022-02-26 20:33:17'),
(13, 'zakir', '$2a$10$9Y3qOJKDthG7EmG61TpQveUX7LYto4Z6W.FyZk9VOk4J/J2etKd02', 'Zakir Khan', 'zakir.redinkbloguser@redinkmailhog', 1, 3, 2, '2022-02-26 20:34:30'),
(14, 'sudhama', '$2a$10$uKGZQ7o1wcDVjTmsOyjmKuxlJbjeboWWdCzfxQiAzaqRbVhwRYjn.', 'Sudhama Paul', 'sudhama.redinkbloguser@redinkmailhog', 1, 3, 1, '2022-02-27 06:23:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `Id_Attribute_On_posts` (`author_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `Id_Attribute_On_posts` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
