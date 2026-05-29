-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Máquina: localhost
-- Data de Criação: 04-Abr-2026 às 20:33
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
-- Estrutura da tabela `transacoes`
--

CREATE TABLE IF NOT EXISTS `transacoes` (
  `codigo` bigint(11) NOT NULL AUTO_INCREMENT,
  `data_reg` date NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `categoria` varchar(20) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1775334150173 ;

--
-- Extraindo dados da tabela `transacoes`
--

INSERT INTO `transacoes` (`codigo`, `data_reg`, `descricao`, `categoria`, `tipo`, `valor`) VALUES
(1775334114732, '2026-04-08', 'fasfa', 'Educação', 'Renda', '3213.00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
