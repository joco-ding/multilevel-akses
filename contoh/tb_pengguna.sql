CREATE TABLE `tb_pengguna` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

ALTER TABLE
  `tb_pengguna`
ADD
  `idpengguna` varchar(45) DEFAULT NULL,
ADD
  UNIQUE KEY `idpengguna_idx` (`idpengguna`);

ALTER TABLE
  `tb_pengguna`
ADD
  `password` char(64) DEFAULT NULL;

ALTER TABLE
  `tb_pengguna`
ADD
  `namalengkap` varchar(45) DEFAULT NULL;

ALTER TABLE
  `tb_pengguna`
ADD
  `kasta` tinyint DEFAULT NULL,
ADD
  KEY `kasta_idx` (`kasta`),
ADD
  CONSTRAINT `kasta` FOREIGN KEY (`kasta`) REFERENCES `tb_kasta` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE
  `tb_pengguna`
ADD
  `status` enum('AKTIF', 'INAKTIF') DEFAULT 'INAKTIF';

ALTER TABLE
  `tb_pengguna`
ADD
  `kunci` char(36) DEFAULT NULL;