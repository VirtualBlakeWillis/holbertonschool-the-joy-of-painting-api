CREATE DATABASE joy_of_painting IF NOT EXISTS;
USE joy_of_painting;

-- create tables: episodes, colors, subject_matters
CREATE TABLE episodes IF NOT EXISTS (
    episode_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    air_date DATE NOT NULL,
    episode_number INT NOT NULL,
    season_number INT NOT NULL,
    painting_img_src VARCHAR(255) NOT NULL,
    painting_yt_src VARCHAR(255) NOT NULL,
);

CREATE TABLE colors IF NOT EXISTS (
    color_id INT PRIMARY KEY AUTO_INCREMENT,
    color_name VARCHAR(255) NOT NULL,
    color_hex VARCHAR(255) NOT NULL,
);

CREATE TABLE subject_matters IF NOT EXISTS (
    subject_matter_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_matter_name VARCHAR(255) NOT NULL,
);

-- create join tables: episode_colors, episode_subject_matters
CREATE TABLE episode_colors IF NOT EXISTS (
    episode_color_id INT PRIMARY KEY AUTO_INCREMENT,
    episode_id INT NOT NULL,
    color_id INT NOT NULL,
    FOREIGN KEY (episode_id) REFERENCES episodes(episode_id),
    FOREIGN KEY (color_id) REFERENCES colors(color_id),
);

CREATE TABLE episode_subject_matters IF NOT EXISTS (
    episode_subject_matter_id INT PRIMARY KEY AUTO_INCREMENT,
    episode_id INT NOT NULL,
    subject_matter_id INT NOT NULL,
    FOREIGN KEY (episode_id) REFERENCES episodes(episode_id),
    FOREIGN KEY (subject_matter_id) REFERENCES subject_matters(subject_matter_id),
);

SHOW TABLES FROM joy_of_painting;


