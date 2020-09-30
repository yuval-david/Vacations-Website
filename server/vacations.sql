create database vacationDB;
use vacationdb;

CREATE TABLE users
(
userID int auto_increment,
firstName varchar(255),
lastName varchar(255),
username varchar(255),
password varchar(1000),
isAdmin boolean,
primary key (userID),
UNIQUE KEY uniqe_username (username)
);

INSERT INTO users
(firstName, lastName, username, password, isAdmin)
VALUES
("yuval","david","yuvi6","123123",false),
("eyal","david","eyal02","123123",false),
("smadar","david","smadi","123123",false),
("kobi","peretz","kobi5","123123",false),
("noah","levi","noah15","123123",false),
("liraz","moshe","lir","123123",false),
("yosi","cohen","cohen12","123123",false),
("moshe","nir","nir55","123123",false),
("system","administrator","admin","12341234",true);

CREATE TABLE vacations
(
vacationID int auto_increment,
description text,
location varchar(255),
picture varchar(500),
dateGo date not null,
dateBack date not null,
price int not null,
followersNum int not null,
primary key (vacationID)
);


INSERT INTO vacations
(description, location, picture, dateGO, dateBack, price, followersNum)
VALUES
("Rome - magic city","Rome, Italy","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgLsKMsPUx4R7c-PvjtuRGaeWQzBWjpQpWL-owgb1xK42uLEDgDA&s","2020-02-03","2020-02-08",2800,4),
("Love Amsterdam","Amsterdam, The netherlands","https://jawlatours.com/assets/images/tours/15559246732880.jpg","2020-02-03","2020-02-08",3000,3),
("London","United Kingdom, London","https://cdn.londonandpartners.com/assets/73295-640x360-london-skyline-ns.jpg","2020-02-03","2020-02-08",2650,4),
("Thailand - the perfect freedom","Thailand","https://www.masa.co.il/wp-content/uploads/2017/11/thailand_open.jpg","2020-02-03","2020-02-28",25000,6),
("Vietnam - relax","Vietnam","https://www.ncl.com/sites/default/files/881-Vietnam-Thailand-Cambodia-Singapore-JADE11SINLCHSH1SGNNHADADHANHKG_R.jpg","2020-02-03","2020-02-20",20500,4),
("Paris - city of lights","Paris, France","https://www.gotnewswire.com/wp-content/uploads/2017/11/paris.jpg","2020-03-03","2020-03-03",3200,3),
("Welcome to Montreal","Montreal, Canada","https://q-cf.bstatic.com/images/hotel/max1024x768/215/215651947.jpg","2020-05-03","2020-05-07",32000,2),
("Mauritius - magic island","Mauritius, Africa","https://gcs.thesouthafrican.com/2019/11/8dd44e59-adobestock_166065656-1200x858.jpeg","2020-02-03","2020-02-09",3800,4),
("India - best place to relax","India","https://www.bookotrip.com/content/images/vacations/BOT00014/master-Magical-india-jpg.jpg","2020-03-01","2020-04-03",12000,0);

CREATE TABLE vacations_of_users
(
	rowID int auto_increment,
    user_id int,
    vacation_id int,
    primary key (rowID),
    foreign key (user_id) references users(userID),
    foreign key (vacation_id) references vacations(vacationID)
);

-- INSERT INTO vacations_of_users
-- (user_id, vacation_id)
-- VALUES
-- (1,4),
-- (2,6),
-- (3,4),
-- (1,2),
-- (3,5),
-- (4,2),
-- (5,5);







































/* קבלת החופשות שיוזר מסוים עוקב אחריהן */
/* בשביל לקבל רק את החופשות- להוריד את העמודה של היוזרים בselect */
-- SELECT 
-- vacations_of_users.rowID,
-- users.username,
-- vacations.description
-- FROM vacationdb.vacations_of_users
-- INNER JOIN users on users.userID = vacations_of_users.user_id
-- INNER JOIN vacations on vacations.vacationID = vacations_of_users.vacation_id
-- -- ORDER BY users.username
-- WHERE users.userID = 1


/* קבלת כל החופשות */
-- SELECT 
-- vacations_of_users.rowID,
-- users.username,
-- vacations.description
-- FROM vacationdb.vacations_of_users
-- INNER JOIN users on users.userID = vacations_of_users.user_id
-- INNER JOIN vacations on vacations.vacationID = vacations_of_users.vacation_id

/* קבלת כל העוקבים של חופשה מסוימת */
-- SELECT 
-- vacations_of_users.rowID,
-- users.username,
-- vacations.description
-- FROM vacationdb.vacations_of_users
-- INNER JOIN users on users.userID = vacations_of_users.user_id
-- INNER JOIN vacations on vacations.vacationID = vacations_of_users.vacation_id
-- WHERE vacations.vacationID = 2
