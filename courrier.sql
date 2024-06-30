-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 30 juin 2024 à 21:31
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `courrier`
--

-- --------------------------------------------------------

--
-- Structure de la table `courrierentrant`
--

DROP TABLE IF EXISTS `courrierentrant`;
CREATE TABLE IF NOT EXISTS `courrierentrant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sujet` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL,
  `dateReception` date NOT NULL,
  `contenu` text COLLATE utf8mb4_german2_ci NOT NULL,
  `expediteur` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL,
  `typeCourrierId` int DEFAULT NULL,
  `utilisateurId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typeCourrierId` (`typeCourrierId`),
  KEY `utilisateurId` (`utilisateurId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_german2_ci;

--
-- Déchargement des données de la table `courrierentrant`
--

INSERT INTO `courrierentrant` (`id`, `sujet`, `dateReception`, `contenu`, `expediteur`, `typeCourrierId`, `utilisateurId`) VALUES
(1, 'demande de stage', '2023-09-29', 'ceci est un test', 'ismael', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `courriersortant`
--

DROP TABLE IF EXISTS `courriersortant`;
CREATE TABLE IF NOT EXISTS `courriersortant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sujet` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL,
  `dateEnvoi` date NOT NULL,
  `contenu` text COLLATE utf8mb4_german2_ci NOT NULL,
  `destinataire` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL,
  `typeCourrierId` int DEFAULT NULL,
  `utilisateurId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typeCourrierId` (`typeCourrierId`),
  KEY `utilisateurId` (`utilisateurId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_german2_ci;

--
-- Déchargement des données de la table `courriersortant`
--

INSERT INTO `courriersortant` (`id`, `sujet`, `dateEnvoi`, `contenu`, `destinataire`, `typeCourrierId`, `utilisateurId`) VALUES
(1, 'demande de stage', '2023-03-28', 'ceci est un test', 'ismael', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `typeutilisateur`
--

DROP TABLE IF EXISTS `typeutilisateur`;
CREATE TABLE IF NOT EXISTS `typeutilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_german2_ci;

--
-- Déchargement des données de la table `typeutilisateur`
--

INSERT INTO `typeutilisateur` (`id`, `libelle`) VALUES
(1, 'admin'),
(2, 'simple');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL,
  `motDePasse` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL,
  `typeUtilisateurId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typeUtilisateurId` (`typeUtilisateurId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_german2_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom`, `email`, `motDePasse`, `typeUtilisateurId`) VALUES
(1, 'ismael', 'ismaeldjibo555@gmail.com', '91997582', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
