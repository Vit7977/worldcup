DROP DATABASE IF EXISTS WorldCup;
CREATE DATABASE IF NOT EXISTS WorldCup;
USE WorldCup;

CREATE TABLE IF NOT EXISTS usuario(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    nacionalidade VARCHAR(100) NOT NULL,
    foto_url VARCHAR(1000),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS edicao(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome CHAR(4),
    sede VARCHAR(100),
    descricao VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS grupo(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome CHAR(1)
);

CREATE TABLE IF NOT EXISTS pais(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    bandeira_url VARCHAR(1000),
    grupo_id INT UNSIGNED,
    FOREIGN KEY (grupo_id) REFERENCES grupo(id)
);

CREATE TABLE IF NOT EXISTS posicao(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    sigla VARCHAR(3),
    descricao VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS jogador(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    data_nasc DATE,
    foto_url VARCHAR(1000)
);
ALTER TABLE jogador ADD INDEX(id);

CREATE TABLE IF NOT EXISTS tecnico(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    data_nasc DATE,
    foto_url VARCHAR(1000)
);
ALTER TABLE tecnico ADD INDEX(id);

CREATE TABLE IF NOT EXISTS estadio(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    endereco VARCHAR(200),
    cap_pessoas INT UNSIGNED
);

CREATE TABLE IF NOT EXISTS jogo(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    fase ENUM("Grupos","Oitavas","Quartas","Semifinal","Final"),
    data DATE,
    estadio_id INT UNSIGNED,
    FOREIGN KEY (estadio_id) REFERENCES estadio(id)
);
ALTER TABLE jogo ADD INDEX(id);

CREATE TABLE IF NOT EXISTS pais_em_grupo(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    status ENUM("Classificado", "Eliminado") NULL,
    pais_id INT UNSIGNED, 
    grupo_id INT UNSIGNED,
    FOREIGN KEY (pais_id) REFERENCES pais(id),
    FOREIGN KEY (grupo_id) REFERENCES grupo(id)
);

CREATE TABLE IF NOT EXISTS pais_em_jogo(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    resultado ENUM("Vitoria", "Derrota", "Empate") NOT NULL,
    pais_id INT UNSIGNED,
    jogo_id INT UNSIGNED,
    FOREIGN KEY (pais_id) REFERENCES pais(id),
    FOREIGN KEY (jogo_id) REFERENCES jogo(id)
);

CREATE TABLE IF NOT EXISTS jogador_em_pais(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    num_jogador INT,
    data_entrada DATE,
    data_saida DATE,
    pais_id INT UNSIGNED,
    jogador_id INT UNSIGNED,
    posicao_id INT UNSIGNED,
    FOREIGN KEY (pais_id) REFERENCES pais(id),
    FOREIGN KEY (jogador_id) REFERENCES jogador(id),
    FOREIGN KEY (posicao_id) REFERENCES posicao(id)
);

CREATE TABLE IF NOT EXISTS gol(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tempo VARCHAR(6) NOT NULL,
    jogador_em_pais_id INT UNSIGNED,
    pais_em_jogo_id INT UNSIGNED,
    FOREIGN KEY (jogador_em_pais_id) REFERENCES jogador_em_pais(id),
    FOREIGN KEY (pais_em_jogo_id) REFERENCES pais_em_jogo(id)
);

CREATE TABLE IF NOT EXISTS cartao(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tempo VARCHAR(6) NOT NULL,
    jogador_em_pais_id INT UNSIGNED,
    pais_em_jogo_id INT UNSIGNED,
     FOREIGN KEY (jogador_em_pais_id) REFERENCES jogador_em_pais(id),
    FOREIGN KEY (pais_em_jogo_id) REFERENCES pais_em_jogo(id)
);

INSERT INTO grupo (nome) VALUES ("A"), ("B"), ("C"), ("D"), ("E"), ("F"), ("G"), ("H");