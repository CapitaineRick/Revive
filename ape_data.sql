-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 20 jan. 2025 à 11:37
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ape_data`
--

-- --------------------------------------------------------

--
-- Structure de la table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `user` text NOT NULL,
  `Email` text NOT NULL,
  `mdp` text NOT NULL,
  `date_create` date NOT NULL DEFAULT current_timestamp(),
  `session_cookie` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prix` decimal(10,2) DEFAULT NULL,
  `coup_de_coeur` tinyint(1) DEFAULT NULL,
  `groupe` varchar(255) DEFAULT NULL,
  `type_produit` varchar(255) DEFAULT NULL,
  `etat_produit` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `nom`, `prix`, `coup_de_coeur`, `groupe`, `type_produit`, `etat_produit`, `description`) VALUES
(1, 'Lenovo ThinkPad X1', 1499.99, 1, 'Ordinateur Pro', 'Ordinateur', 'Neuf', 'Écran 14\", Intel Core i7, 16 Go RAM, 512 Go SSD, autonomie jusqu\'à 15 heures, poids léger de 1,1 kg.'),
(2, 'PlayStation 5', 499.99, 1, 'Sony Consoles', 'Consoles', 'Neuf', 'Console de jeu nouvelle génération avec support 4K, SSD ultra-rapide de 825 Go, manette DualSense incluse.'),
(3, 'Manette Xbox Série X', 59.99, 0, 'Accessoires Xbox', 'Accessoires', 'Neuf', 'Manette sans fil avec ergonomie améliorée, compatible PC et Xbox Series X/S, batterie AA.'),
(4, 'SSD Samsung 980 Pro 1TB', 149.99, 1, 'Stockage rapide', 'Pièces détachées', 'Neuf', 'SSD NVMe avec vitesse de lecture jusqu\'à 7000 Mo/s, interface PCIe 4.0, format M.2.'),
(5, 'Guide d’installation iOS', 9.99, 0, 'Documentation', 'Fiche technique', 'Neuf', 'Guide détaillé pour l\'installation et la configuration d\'iOS, adapté pour débutants.'),
(6, 'Dell Inspiron 15 3000', 599.99, 0, 'Ordinateur Familial', 'Ordinateur', 'Reconditionné', 'Écran 15,6\", Intel Core i5, 8 Go RAM, 256 Go SSD, Windows 11 préinstallé.'),
(7, 'Nintendo Switch OLED', 349.99, 1, 'Nintendo Consoles', 'Consoles', 'Neuf', 'Console portable avec écran OLED de 7\", mémoire interne de 64 Go, joy-cons détachables.'),
(8, 'Casque Razer Kraken', 89.99, 1, 'Accessoires Gaming', 'Accessoires', 'Neuf', 'Casque audio gaming avec son surround 7.1, coussinets en gel refroidissant, micro rétractable.'),
(9, 'Ventilateur Cooler Master', 39.99, 0, 'Refroidissement', 'Pièces détachées', 'Neuf', 'Ventilateur silencieux 120 mm, compatible avec boîtiers ATX, flux d\'air optimisé.'),
(10, 'Fiche technique Ryzen 9', 5.99, 0, 'Documentation', 'Fiche technique', 'Neuf', 'Spécifications complètes du processeur AMD Ryzen 9 : 12 cœurs, 24 threads, 4,8 GHz boosté.'),
(11, 'MacBook Pro 14\" 2023', 2399.99, 1, 'Apple Ordinateurs', 'Ordinateur', 'Neuf', 'Écran Retina XDR 14\", puce Apple M2 Pro, 16 Go RAM, 1 To SSD, autonomie 18 heures.'),
(12, 'Xbox Series S', 299.99, 0, 'Microsoft Consoles', 'Consoles', 'Occasion', 'Console de jeu compacte, support 1440p à 120 FPS, 512 Go SSD, entièrement numérique.'),
(13, 'Câble HDMI 2.1', 19.99, 0, 'Connectique', 'Accessoires', 'Neuf', 'Câble HDMI 2.1 compatible 4K/120Hz et 8K/60Hz, longueur de 2 mètres, support HDR.'),
(14, 'Carte mère MSI MPG Z790', 259.99, 1, 'Composants PC', 'Pièces détachées', 'Neuf', 'Carte mère ATX compatible Intel 13ème génération, DDR5, PCIe 5.0, ports USB-C.'),
(15, 'Guide de réparation PS5', 12.99, 0, 'Documentation', 'Fiche technique', 'Occasion', 'Guide illustré pour démonter, diagnostiquer et réparer les problèmes courants de la PS5.'),
(16, 'Asus ROG Zephyrus G14', 1799.99, 1, 'Gaming Laptops', 'Ordinateur', 'Neuf', 'Ordinateur portable 14\" avec AMD Ryzen 9, RTX 3060, 16 Go RAM, 1 To SSD, clavier rétroéclairé.'),
(17, 'Steam Deck 512GB', 649.99, 1, 'Consoles Valve', 'Consoles', 'Neuf', 'Console de jeu portable avec écran 7\", processeur AMD Zen 2, 16 Go RAM, 512 Go SSD.'),
(18, 'Canon EOS R5', 3799.99, 0, 'Appareils Photo', 'Accessoires', 'Neuf', 'Appareil photo hybride plein format 45 MP, vidéo 8K, stabilisation intégrée.'),
(19, 'Samsung Galaxy Tab S8+', 949.99, 1, 'Tablettes Android', 'Ordinateur', 'Neuf', 'Écran AMOLED 12,4\", processeur Snapdragon 8 Gen 1, 12 Go RAM, 256 Go stockage, stylet inclus.'),
(20, 'Processeur AMD Ryzen 7 5800X', 349.99, 1, 'Composants PC', 'Pièces détachées', 'Neuf', '8 cœurs, 16 threads, 4,7 GHz boost, architecture Zen 3, compatible socket AM4.'),
(21, 'Écran LG UltraGear 27GL850', 449.99, 1, 'Écrans Gaming', 'Accessoires', 'Neuf', 'Écran QHD 27\", 144 Hz, temps de réponse 1 ms, technologie Nano IPS, support HDR10.'),
(22, 'Carte graphique NVIDIA RTX 4080', 1399.99, 1, 'Composants PC', 'Pièces détachées', 'Neuf', 'GPU haut de gamme avec 16 Go GDDR6X, ray tracing, DLSS 3, performances 4K exceptionnelles.'),
(23, 'Microsoft Surface Pro 9', 1299.99, 0, 'Ordinateurs Hybrides', 'Ordinateur', 'Neuf', 'Tablette hybride 13\" avec processeur Intel i7, 16 Go RAM, 512 Go SSD, clavier détachable.'),
(24, 'Souris Logitech MX Master 3', 99.99, 1, 'Accessoires Ergonomiques', 'Accessoires', 'Neuf', 'Souris sans fil avec molette magnétique, autonomie de 70 jours, chargement USB-C.'),
(25, 'Router Wi-Fi 6 TP-Link Archer AX50', 149.99, 0, 'Réseau', 'Accessoires', 'Neuf', 'Routeur Wi-Fi 6 avec débit jusqu’à 3 Gbps, 4 antennes, gestion multi-appareils.'),
(26, 'Sony WH-1000XM5', 399.99, 1, 'Accessoires Audio', 'Accessoires', 'Neuf', 'Casque sans fil à réduction de bruit active, autonomie 30 heures, compatible Hi-Res Audio.'),
(27, 'Apple iMac 24\" M1', 1599.99, 1, 'Apple Ordinateurs', 'Ordinateur', 'Neuf', 'Ordinateur tout-en-un avec écran Retina 4.5K, puce M1, 8 Go RAM, 512 Go SSD, design ultra-fin.'),
(28, 'Clavier mécanique Corsair K70', 149.99, 1, 'Accessoires Gaming', 'Accessoires', 'Neuf', 'Clavier mécanique RGB avec switches Cherry MX Red, repose-poignet amovible.'),
(29, 'Boîtier PC NZXT H510 Elite', 149.99, 0, 'Composants PC', 'Pièces détachées', 'Neuf', 'Boîtier PC moyen tour avec façade en verre trempé, 2 ventilateurs RGB inclus, gestion des câbles.'),
(30, 'Disque dur externe WD My Passport 4TB', 119.99, 0, 'Stockage Externe', 'Accessoires', 'Neuf', 'Disque dur portable USB 3.0 avec cryptage matériel 256 bits, format compact.'),
(31, 'MacBook Air M2', 1249.99, 1, 'Apple Ordinateurs', 'Ordinateur', 'Neuf', 'Écran Retina 13,6\", puce M2, 8 Go RAM, 256 Go SSD, autonomie 18 heures, design ultra-fin.'),
(32, 'Nintendo Joy-Con Pair', 79.99, 0, 'Accessoires Nintendo', 'Accessoires', 'Neuf', 'Paire de manettes Joy-Con pour Nintendo Switch, coloris gris, fonction gyroscope intégrée.'),
(33, 'Écouteurs Bose QuietComfort Earbuds II', 299.99, 1, 'Accessoires Audio', 'Accessoires', 'Neuf', 'Écouteurs sans fil à réduction de bruit active, autonomie 6 heures, boîtier de charge USB-C.'),
(34, 'Processeur Intel Core i5-12600K', 299.99, 0, 'Composants PC', 'Pièces détachées', 'Neuf', '6 cœurs, 12 threads, fréquence boostée à 4,9 GHz, compatible PCIe 5.0 et DDR5.'),
(35, 'Samsung T7 Shield SSD 1TB', 129.99, 1, 'Stockage Externe', 'Accessoires', 'Neuf', 'SSD externe USB-C robuste avec vitesse de transfert jusqu\'à 1050 Mo/s, résistant à l\'eau et aux chocs.');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
