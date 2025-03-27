CREATE TABLE `usuario` (
  `id_usuario` int PRIMARY KEY AUTO_INCREMENT,
  `nome_usuario` varchar(255),
  `tipo_usuario` int,
  `status_usuario` char
);

CREATE TABLE `telefone` (
  `id_telefone` int PRIMARY KEY AUTO_INCREMENT,
  `nome_usuario` int,
  `ddd_telefone` varchar(255),
  `numero_telefone` varchar(255)
);

CREATE TABLE `tipousuario` (
  `id_tipousuario` int PRIMARY KEY AUTO_INCREMENT,
  `desc_tipousuario` varchar(255),
  `nivel_tipousuario` int
);

ALTER TABLE `usuario` ADD FOREIGN KEY (`tipo_usuario`) REFERENCES `tipousuario` (`id_tipousuario`);

ALTER TABLE `telefone` ADD FOREIGN KEY (`nome_usuario`) REFERENCES `usuario` (`nome_usuario`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`nome_usuario`);
