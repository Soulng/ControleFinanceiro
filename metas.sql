-- Create table for metas (goals)
CREATE TABLE IF NOT EXISTS `metas` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `nome_meta` varchar(255) NOT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  `valor_guardado` decimal(10,2) NOT NULL DEFAULT 0.00,
  `descricao` text,
  `imagem_url` varchar(500),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;