-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: vuzstack
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `directions`
--

DROP TABLE IF EXISTS `directions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `article` varchar(255) NOT NULL,
  `budgetPlaces` int NOT NULL,
  `vuzId` int DEFAULT NULL,
  `requiredExams` text NOT NULL,
  `optionalExams` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_94b3dbd2efcd38990d3aa83058a` (`vuzId`),
  CONSTRAINT `FK_94b3dbd2efcd38990d3aa83058a` FOREIGN KEY (`vuzId`) REFERENCES `vuz` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directions`
--

LOCK TABLES `directions` WRITE;
/*!40000 ALTER TABLE `directions` DISABLE KEYS */;
INSERT INTO `directions` VALUES (1,'Автоматизация технологических процессов и производств','Автоматизация технологических процессов и производств',10,1,'MATH,RUSSIAN_LANGUAGE','COMPUTER_SCIENCE,PHYSIC'),(2,'Биотехнические системы и технологии','Биотехнические системы и технологии',5,1,'MATH,RUSSIAN_LANGUAGE','PHYSIC'),(3,'Боеприпасы и взрыватели','Боеприпасы и взрыватели',3,1,'MATH,RUSSIAN_LANGUAGE','PHYSIC,COMPUTER_SCIENCE'),(4,'Автоматизация технологических процессов и производств','Автоматизация технологических процессов и производств',3,2,'MATH,RUSSIAN_LANGUAGE','PHYSIC,COMPUTER_SCIENCE'),(5,'Наземные транспортно-технологические средства','Наземные транспортно-технологические средства',3,2,'MATH,RUSSIAN_LANGUAGE','PHYSIC,COMPUTER_SCIENCE'),(6,'Прикладная математика','Прикладная математика',3,2,'MATH,RUSSIAN_LANGUAGE','PHYSIC,COMPUTER_SCIENCE'),(7,'Инфокоммуникационные технологии и системы связи','Инфокоммуникационные технологии и системы связи',5,3,'MATH,RUSSIAN_LANGUAGE','PHYSIC,COMPUTER_SCIENCE'),(8,'Программная инженерия','Программная инженерия',2,3,'MATH,RUSSIAN_LANGUAGE','PHYSIC,COMPUTER_SCIENCE'),(9,'Радиотехника','Радиотехника',2,3,'MATH,RUSSIAN_LANGUAGE','PHYSIC,COMPUTER_SCIENCE'),(10,'Информатика и вычислительная техника','Информатика и вычислительная техника',5,4,'MATH,RUSSIAN_LANGUAGE','COMPUTER_SCIENCE'),(11,'Биотехнология','Биотехнология',5,4,'MATH,RUSSIAN_LANGUAGE','CHEMISTRY,BIOLOGY'),(12,'Ядерная физика','Ядерная физика',7,5,'MATH,RUSSIAN_LANGUAGE','PHYSIC'),(13,'Биология','Биология',2,5,'MATH,RUSSIAN_LANGUAGE','BIOLOGY'),(14,'Авиастроение','Авиастроение',2,6,'MATH,RUSSIAN_LANGUAGE','COMPUTER_SCIENCE,PHYSIC'),(15,'Баллистика и гидроаэродинамика','Баллистика и гидроаэродинамика',2,6,'MATH,RUSSIAN_LANGUAGE','COMPUTER_SCIENCE,PHYSIC'),(16,'Двигатели летательных аппаратов','Двигатели летательных аппаратов',2,6,'MATH,RUSSIAN_LANGUAGE','COMPUTER_SCIENCE,PHYSIC'),(17,'Программная инженерия','Программная инженерия',5,7,'MATH,RUSSIAN_LANGUAGE','COMPUTER_SCIENCE'),(18,'Информационная безопасность','Информационная безопасность',4,7,'MATH,RUSSIAN_LANGUAGE','COMPUTER_SCIENCE'),(19,'Инноватика','Инноватика',4,8,'MATH,RUSSIAN_LANGUAGE','COMPUTER_SCIENCE'),(20,'Информатика и вычислительная техника','Информатика и вычислительная техника',2,8,'MATH,RUSSIAN_LANGUAGE','COMPUTER_SCIENCE'),(21,'Информатика и вычислительная техника','Информатика и вычислительная техника',2,9,'MATH,RUSSIAN_LANGUAGE','COMPUTER_SCIENCE,PHYSIC'),(22,'Астрономия','Астрономия',2,10,'MATH,RUSSIAN_LANGUAGE','PHYSIC'),(23,'Геодезия и дистанционное зондирование','Геодезия и дистанционное зондирование',2,10,'MATH,RUSSIAN_LANGUAGE','PHYSIC'),(24,'Нефтегазовое дело','Нефтегазовое дело',2,9,'MATH,RUSSIAN_LANGUAGE','PHYSIC,COMPUTER_SCIENCE'),(25,'Машиностроение','Машиностроение',3,9,'MATH,RUSSIAN_LANGUAGE','PHYSIC,COMPUTER_SCIENCE');
/*!40000 ALTER TABLE `directions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exam` enum('russian_language','math','physic','chemistry','history','social_science','computer_science','biology','foreign_language') NOT NULL,
  `result` int NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_27622fbe99d85dc11b081f64a12` (`userId`),
  CONSTRAINT `FK_27622fbe99d85dc11b081f64a12` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marks`
--

DROP TABLE IF EXISTS `marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exam` enum('RUSSIAN_LANGUAGE','MATH','PHYSIC','CHEMISTRY','HISTORY','SOCIAL_SCIENCE','COMPUTER_SCIENCE','BIOLOGY','FOREIGN_LANGUAGE') NOT NULL,
  `result` int NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e21a0fc27837fcc49166f565478` (`userId`),
  CONSTRAINT `FK_e21a0fc27837fcc49166f565478` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marks`
--

LOCK TABLES `marks` WRITE;
/*!40000 ALTER TABLE `marks` DISABLE KEYS */;
/*!40000 ALTER TABLE `marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1658063000654,'CreateUser1658063000654'),(2,1658078014727,'UpdateUser1658078014727'),(3,1658078238531,'FixUser1658078238531'),(4,1658086492352,'CreateSession1658086492352'),(5,1658086545289,'FixSession1658086545289'),(6,1658835574554,'AddAgree1658835574554'),(7,1659604080415,'FixUserForVuzStack1659604080415'),(8,1659610512356,'CreateMarks1659610512356'),(9,1660060832144,'FixMark1660060832144'),(10,1660069889132,'FixRelationBetweenUserAndMark1660069889132'),(11,1660072015168,'FixRelationBetweenMarkAndUser1660072015168'),(12,1660072371095,'CreateRelationBetweenUserAndMark1660072371095'),(13,1660494955333,'AddAcceptedWithCookie1660494955333'),(14,1661196832724,'AddUserStatus1661196832724'),(15,1661201723487,'DropMark1661201723487'),(16,1661271776670,'CreateDirection1661271776670'),(17,1661273056616,'CreateVuz1661273056616'),(18,1661273751078,'AddRelationsBetweenVuzAndDirection1661273751078'),(19,1661275514847,'AddExams1661275514847'),(20,1661452842924,'CreateExam1661452842924'),(21,1661453193317,'AddRelationBetweenExamAndUser1661453193317'),(22,1661507669532,'AddRelationsBetweenUserAndDirections1661507669532'),(23,1661699951185,'RefactorMark1661699951185'),(24,1662053035309,'Fix1662053035309'),(25,1662057751596,'AddNewUserStatus1662057751596'),(26,1663320964264,'AddDefaultFirstNameAndLastName1663320964264'),(27,1663414576191,'CreateProfile1663414576191'),(28,1663417565912,'UpdateProfileAndUser1663417565912'),(29,1663695249072,'AddReadyColumn1663695249072'),(30,1663696782016,'AddUserInfoUploadedColumn1663696782016');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_entity`
--

DROP TABLE IF EXISTS `profile_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_entity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL DEFAULT '',
  `lastName` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(255) NOT NULL DEFAULT '',
  `link` varchar(255) NOT NULL DEFAULT '',
  `snils` varchar(255) NOT NULL DEFAULT '',
  `passportID` varchar(255) NOT NULL DEFAULT '',
  `passportSeries` varchar(255) NOT NULL DEFAULT '',
  `acceptedWithCookie` tinyint DEFAULT NULL,
  `passport` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `ready` tinyint NOT NULL DEFAULT '0',
  `userInfoUploaded` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_entity`
--

LOCK TABLES `profile_entity` WRITE;
/*!40000 ALTER TABLE `profile_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) NOT NULL,
  `refreshToken` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_57de40bc620f456c7311aa3a1e6` (`userId`),
  CONSTRAINT `FK_57de40bc620f456c7311aa3a1e6` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `activationLink` varchar(255) NOT NULL,
  `agree` tinyint NOT NULL,
  `isActivated` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `priority` text NOT NULL,
  `profileId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  UNIQUE KEY `REL_b1bda35cdb9a2c1b777f5541d8` (`profileId`),
  CONSTRAINT `FK_b1bda35cdb9a2c1b777f5541d87` FOREIGN KEY (`profileId`) REFERENCES `profile_entity` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_directions_directions`
--

DROP TABLE IF EXISTS `users_directions_directions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_directions_directions` (
  `usersId` int NOT NULL,
  `directionsId` int NOT NULL,
  PRIMARY KEY (`usersId`,`directionsId`),
  KEY `IDX_6441f1694c8780caa5b5d862f9` (`usersId`),
  KEY `IDX_837792fa5651877d781add2566` (`directionsId`),
  CONSTRAINT `FK_6441f1694c8780caa5b5d862f90` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_837792fa5651877d781add25668` FOREIGN KEY (`directionsId`) REFERENCES `directions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_directions_directions`
--

LOCK TABLES `users_directions_directions` WRITE;
/*!40000 ALTER TABLE `users_directions_directions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_directions_directions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vuz`
--

DROP TABLE IF EXISTS `vuz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vuz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `article` varchar(255) NOT NULL,
  `type` enum('university','academy','institute') NOT NULL DEFAULT 'institute',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vuz`
--

LOCK TABLES `vuz` WRITE;
/*!40000 ALTER TABLE `vuz` DISABLE KEYS */;
INSERT INTO `vuz` VALUES (1,'МГТУ им. Баумана (НИУ)','Москва','Ключевой университет по подготовке инженеров в России.','university'),(2,'НИУ МГСУ','Москва','Ведущий вуз РФ по подготовке в строительной сфере.','university'),(3,'РТУ МИРЭА','Москва','Московский университет по подготовке IT-специалистов','university'),(4,'МФТИ','Москва','Передовой технический институт, созданный Нобелевскими лауреатами','university'),(5,'НИЯУ МИФИ','Москва','Ядерный университет РФ','university'),(6,'НИУ МАИ','Москва','Московский авиационный институт','university'),(7,'Университет ИТМО','Санкт-Петербург','Ключевой университет РФ в IT сфере','university'),(8,'Политех Петра Великого','Санкт-Петербург','Старейший и крупнейший политехнический вуз России','university'),(9,'РГУ нефти и газа им. Губкина','Москва','Передовой университет по подготовке специалистов в нефтегазовой отросле','university'),(10,'КФУ','Казань','Ключевой вуз республики Татарстан','university');
/*!40000 ALTER TABLE `vuz` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-24 23:46:41
