CREATE TABLE `tb_kasta` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE
  `tb_kasta`
ADD
  `namakasta` varchar(45) DEFAULT NULL,
ADD
  UNIQUE KEY `namakasta_idx` (`namakasta`);

ALTER TABLE
  `tb_kasta`
ADD
  `kapabilitas` text DEFAULT NULL;