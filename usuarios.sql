-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Máquina: localhost
-- Data de Criação: 05-Abr-2026 às 22:14
-- Versão do servidor: 5.6.13
-- versão do PHP: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de Dados: `p12semteste_paginicial`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_nascimento` varchar(20) DEFAULT NULL,
  `idade` int(11) NOT NULL,
  `ocupacao` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `data_nascimento`, `idade`, `ocupacao`, `created_at`) VALUES
(1, 'caca', 'acaca', '74b87337454200d4d33f80c4663dc5e5', '2026-01-03', 0, 'gest', '2026-04-05 01:40:43'),
(2, 'ffff', 'fff@g', '81dc9bdb52d04dc20036dbd8313ed055', '2026-04-02', 0, 'gggg', '2026-04-05 09:38:13'),
(8, 'carliros', 'carl@gmail.com', '12345', '2003-12-23', 0, 'gestor de nada', '2026-04-05 10:05:12'),
(9, 'ffff', 'abc@gmail.com', '1234', '2000-01-02', 0, 'chefis', '2026-04-05 19:08:28');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
