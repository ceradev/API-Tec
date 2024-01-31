-- Active: 1706629984813@@127.0.0.1@3306
CREATE DATABASE tecdb DEFAULT CHARACTER SET = 'utf8mb4';

USE tecdb;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    username VARCHAR(255),
    address VARCHAR(255),
    tel VARCHAR(15),
    email VARCHAR(255),
    perfil_id INT,
    password VARCHAR(255)
) COMMENT '';

INSERT INTO users (id, username, address, tel, email, perfil_id, password) VALUES
(1, 'Tina_Syratt', 'PO Box 58420', '825-183-2548', 'tsyratt0@linkedin.com', 1, 'S3cr3tT!na1'),
(2, 'Ravid_Smallridge', 'Room 1696', '364-935-8407', 'rsmallridge1@prweb.com', 2, 'R@v1dP@ss2'),
(3, 'Sarajane_Hollow', '2nd Floor', '351-478-2802', 'shollow2@un.org', 3, 'S@raP@ssw0rd3'),
(4, 'Brigitte_Garlicke', 'Apt 710', '480-275-0598', 'bgarlicke3@google.com.br', 4, 'Br!g1tteP@ss4'),
(5, 'Del_Cicculini', 'Suite 99', '528-659-2340', 'dcicculini4@howstuffworks.com', 5, 'D3lP@ssw0rd5'),
(6, 'Calvin_Tiller', 'Apt 1344', '160-446-6830', 'ctiller5@mail.ru', 6, 'C@lvinP@ssw6rd'),
(7, 'Penn_Horsewood', 'Suite 72', '662-187-7270', 'phorsewood6@rediff.com', 7, 'P3nnH0rs3w00d7'),
(8, 'Rosalind_Fairn', 'Room 1093', '252-433-0912', 'rfairn7@apple.com', 8, 'R0s@l!ndF@!rn8'),
(9, 'Emanuel_Gillino', '6th Floor', '943-516-9285', 'egillino8@ca.gov', 9, '3m@nu3lG1ll1n09'),
(10, 'Mariska_Williment', 'Room 226', '806-746-9608', 'mwilliment9@pinterest.com', 10, 'M@r1skaP@ss10'),
(11, 'Claiborne_Margrie', 'Apt 352', '600-967-2316', 'cmargriea@lycos.com', 11, 'Cl@!b0rn3P@ss11'),
(12, 'Nap_Ogdahl', 'Apt 1974', '846-202-5006', 'nogdahlb@state.tx.us', 12, 'N@pP@ss12'),
(13, 'Janel_Handforth', 'Apt 1677', '218-169-1291', 'jhandforthc@ezinearticles.com', 13, 'J@n3lP@ss13'),
(14, 'Burnaby_Barnet', 'Room 16', '402-439-5362', 'bbarnetd@weebly.com', 14, 'B@rn@bY14'),
(15, 'Bernadine_Kenn', 'Apt 1194', '732-179-7007', 'bkennae@discuz.net', 15, 'B3rn@d1n3P@ss15'),
(16, 'Oberon_Munson', '18th Floor', '441-763-9862', 'omunsonf@auda.org.au', 16, 'Ober0nMunsonP@ss16'),
(17, 'Abramo_Offner', '14th Floor', '643-845-3087', 'aoffnerg@soundcloud.com', 17, 'Abr@moP@ss17'),
(18, 'Laurel_Gaffer', 'Room 1063', '800-517-4973', 'lgafferh@cargocollective.com', 18, 'L@ur3lG@ff3r18'),
(19, 'Elva_Cesar', 'Suite 52', '487-305-2796', 'ecesarici@wikipedia.org', 19, '3lv@C3s@r1c1P@ss19'),
(20, 'Derrek_Girauld', 'PO Box 97109', '153-717-7259', 'dgirauldj@seesaa.net', 20, 'D3rr3kP@ss20'),
(21, 'Adrianna_Lodge', 'Suite 10', '523-723-1819', 'alodgek@g.co', 21, 'Adr14nn@P@ss21'),
(22, 'Teodoor_Heimann', 'Apt 214', '353-218-3549', 'theimannl@buzzfeed.com', 22, 'T30d00rP@ss22'),
(23, 'Wyn_Baptist', 'Room 325', '443-454-0071', 'wbaptistm@ucsd.edu', 23, 'WynB@pt1stP@ss23'),
(24, 'Rosella_Gilmore', '1st Floor', '247-443-6231', 'rgilmoren@surveymonkey.com', 24, 'R0s3ll@P@ss24'),
(25, 'Marchelle_Ladson', '7th Floor', '831-817-6291', 'mladsono@google.cn', 25, 'M@rch3ll3P@ss25');
