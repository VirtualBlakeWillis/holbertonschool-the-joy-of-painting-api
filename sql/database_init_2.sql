CREATE DATABASE  IF NOT EXISTS joy_of_painting;
USE joy_of_painting;

CREATE TABLE IF NOT EXISTS episodes (
    episode_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    air_date VARCHAR(255) NOT NULL,
    episode_number INT NOT NULL,
    season_number INT NOT NULL,
    painting_img_src VARCHAR(255) NOT NULL,
    painting_yt_src VARCHAR(255) NOT NULL,
    Black_Gesso INT NOT NULL,
    Bright_Red INT NOT NULL,
    Burnt_Umber INT NOT NULL,
    Cadmium_Yellow INT NOT NULL,
    Dark_Sienna INT NOT NULL,
    Indian_Red INT NOT NULL,
    Indian_Yellow INT NOT NULL,
    Liquid_Black INT NOT NULL,
    Liquid_Clear INT NOT NULL,
    Midnight_Black INT NOT NULL,
    Phthalo_Blue INT NOT NULL,
    Phthalo_Green INT NOT NULL,
    Prussian_Blue INT NOT NULL,
    Sap_Green INT NOT NULL,
    Titanium_White INT NOT NULL,
    Van_Dyke_Brown INT NOT NULL,
    Yellow_Ochre INT NOT NULL,
    Alizarin_Crimson INT NOT NULL
);