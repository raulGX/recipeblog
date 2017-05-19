CREATE TABLE USERS (
  userid int(7) NOT NULL AUTO_INCREMENT,
  email varchar(40) NOT NULL,
  password varchar(20) NOT NULL,
  first_name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL,
  is_admin tinyint(1) DEFAULT 0,
  PRIMARY KEY (userid),
  UNIQUE INDEX (email)
)

CREATE TABLE INGREDIENT_CATEGORY (
  catid int(3) NOT NULL AUTO_INCREMENT,
  catname varchar(40) NOT NULL,
  PRIMARY KEY (catid),
  UNIQUE INDEX (catname)
)

CREATE TABLE INGREDIENTS (
  ingredientid int(5) NOT NULL AUTO_INCREMENT,
  ingredient_name varchar(40) NOT NULL,
  measure_unit varchar(20) NOT NULL,
  calories  int(4),
  category int(3) NOT NULL,
  PRIMARY KEY (ingredientid),
  FOREIGN KEY (category) REFERENCES INGREDIENT_CATEGORY (catid),
  UNIQUE INDEX (ingredient_name)
)

CREATE TABLE RECIPES (
  recipeid int(5) NOT NULL AUTO_INCREMENT,
  recipe_name varchar(40) NOT NULL,
  description TEXT NOT NULL,
  userid int(7) NOT NULL,
  rating int(2) DEFAULT NULL,
  PRIMARY KEY (recipeid),
  FOREIGN KEY (userid) REFERENCES USERS (userid),
  UNIQUE INDEX (recipe_name, userid)
)

CREATE TABLE INGREDIENTS_TO_RECIPES (
  ingredientid int(5) NOT NULL,
  recipeid int(5) NOT NULL,
  quantity int(5) NOT NULL,
  FOREIGN KEY (ingredientid) REFERENCES INGREDIENTS (ingredientid),
  FOREIGN KEY (recipeid) REFERENCES RECIPES (recipeid),
  UNIQUE INDEX (recipeid, ingredientid)
)


