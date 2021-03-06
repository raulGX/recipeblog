CREATE TABLE USERS (
  userid int(7) NOT NULL AUTO_INCREMENT,
  email varchar(40) NOT NULL,
  password varchar(20) NOT NULL,
  first_name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL,
  is_admin tinyint(1) DEFAULT 0,
  PRIMARY KEY (userid),
  UNIQUE INDEX (email),
  CHECK (CHAR_LENGTH(password) >= 6)
);

CREATE TABLE INGREDIENT_CATEGORY (
  catid int(3) NOT NULL AUTO_INCREMENT,
  catname varchar(40) NOT NULL,
  PRIMARY KEY (catid),
  UNIQUE INDEX (catname)
);

CREATE TABLE INGREDIENTS (
  ingredientid int(5) NOT NULL AUTO_INCREMENT,
  ingredient_name varchar(40) NOT NULL,
  measure_unit varchar(20) NOT NULL,
  calories  int(4),
  category int(3) NOT NULL,
  PRIMARY KEY (ingredientid),
  FOREIGN KEY (category) REFERENCES INGREDIENT_CATEGORY (catid),
  UNIQUE INDEX (ingredient_name)
);

CREATE TABLE RECIPES (
  recipeid int(5) NOT NULL AUTO_INCREMENT,
  recipe_name varchar(40) NOT NULL,
  description TEXT NOT NULL,
  userid int(7) NOT NULL,
  PRIMARY KEY (recipeid),
  FOREIGN KEY (userid) REFERENCES USERS (userid),
  UNIQUE INDEX (recipe_name, userid)
);

CREATE TABLE INGREDIENTS_TO_RECIPES (
  ingredientid int(5) NOT NULL,
  recipeid int(5) NOT NULL,
  quantity decimal(5,2) NOT NULL,
  FOREIGN KEY (ingredientid) REFERENCES INGREDIENTS (ingredientid),
  FOREIGN KEY (recipeid) REFERENCES RECIPES (recipeid),
  UNIQUE INDEX (recipeid, ingredientid)
);

DELIMITER $$
CREATE TRIGGER `length` BEFORE INSERT ON `users`
 FOR EACH ROW BEGIN
    IF CHAR_LENGTH(NEW.password) <= 6 OR CHAR_LENGTH(NEW.email) <= 6 THEN
    SIGNAL SQLSTATE '10000'
        SET MESSAGE_TEXT = 'check constraint on password failed during insert';
    END IF;
END$$
DELIMITER ;

#users
INSERT INTO `users` (`userid`, `email`, `password`, `first_name`, `last_name`, `is_admin`) VALUES
(1, 'raulpopovici', 'parola1', 'Raul', 'Popovici', 1),
(2, 'markmark', 'parola1', 'Mark', 'Mark', 0),
(3, 'gordonramsay', 'parola1', 'Gordon', 'Ramsey', 0),
(4, 'jamieoliver  ', 'parola1', 'Jamie', 'Oliver', 0);

#ingredient categories
INSERT INTO `ingredient_category` (`catid`, `catname`) VALUES
(7, 'BEANS'),
(1, 'COFFEE, TEA, COCOA, and CHOCOLATE'),
(2, 'DAIRY, CHEESE/CHEESE INGREDIENTS, and EGGS'),
(3, 'FLOURS, GRAINS, SEEDS and MEAL, MALTS'),
(4, 'FRUITS and VEGETABLES'),
(5, 'MEAT, POULTRY, SEAFOOD'),
(6, 'NUTS'),
(8, 'OILS, FATS, and SHORTENINGS'),
(9, 'SEASONINGS, SPICES, HERBS, and SALTS'),
(10, 'SUGAR and SWEETENERS');


#ingredients
INSERT INTO `ingredients` (`ingredientid`, `ingredient_name`, `measure_unit`, `calories`, `category`) VALUES
(1, 'Potatoes', 'kg', NULL, 4),
(2, 'Vegetable oil', 'tablespoons', NULL, 8),
(3, 'Flour', 'kg', NULL, 3),
(4, 'Tomatoes', 'kg', NULL, 4),
(5, 'Cheese', 'grams', NULL, 2),
(6, 'Eggs', 'unit', NULL, 2),
(7, 'Mushrooms', '100g', NULL, 4),
(9, 'Beef', '100g', NULL, 5);

#recipes
INSERT INTO `recipes` (`recipeid`, `recipe_name`, `description`, `userid`) VALUES
(1, 'French Fries', 'Peel potatoes, fry them, serve', 1),
(2, 'Pizza', 'Make dough, spread dough, cover with tomatoes and cheese', 1),
(3, 'Beef WELLINGTON', 'Check on gordonramsay.com website', 3);

#ingredients to recipes
INSERT INTO `ingredients_to_recipes` (`ingredientid`, `recipeid`, `quantity`) VALUES
(1, 1, '1.00'),
(2, 1, '5.00'),
(3, 2, '0.50'),
(4, 2, '0.20'),
(5, 2, '100.00'),
(9, 3, '3'),
(6, 3, '3'),
(7, 3, '3'),
(2, 3, '3');
