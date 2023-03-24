

CREATE TABLE User (
  uniqueID INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  profile_picture_url VARCHAR(255),
  wallpaper_url VARCHAR(255),
  PRIMARY KEY (uniqueID)
);



CREATE TABLE UserGroup (
  uniqueID INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  PRIMARY KEY (uniqueID)
);


CREATE TABLE GroupMember (
  group_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (group_id) REFERENCES UserGroup(uniqueID),
  FOREIGN KEY (user_id) REFERENCES User(uniqueID),
  PRIMARY KEY (group_id, user_id)
);


CREATE TABLE Model (
  UniqueID INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  weights VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  group_id INT DEFAULT NULL,
  learning_rate FLOAT NOT NULL,
  regularization_rate FLOAT NOT NULL,
  optimizer VARCHAR(255) NOT NULL,
  PRIMARY KEY (UniqueID),
  FOREIGN KEY (user_id) REFERENCES User(uniqueID),
  FOREIGN KEY (group_id) REFERENCES UserGroup(uniqueID)
);


CREATE TABLE Layer (
  id INT NOT NULL AUTO_INCREMENT,
  type VARCHAR(255) NOT NULL,
  num_channels INT NOT NULL,
  model_id INT NOT NULL,
  activation_function VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (model_id) REFERENCES Model(UniqueID)
);



CREATE TABLE Messages (
  uniqueID INT NOT NULL AUTO_INCREMENT,
  text TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  group_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(uniqueID),
  FOREIGN KEY (group_id) REFERENCES UserGroup(uniqueID),
  PRIMARY KEY (uniqueID)
);


CREATE TABLE Model_likes (
  user_id INT NOT NULL,
  model_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(uniqueID),
  FOREIGN KEY (model_id) REFERENCES Model(uniqueID),
  PRIMARY KEY (user_id, model_id)
);



CREATE TABLE Comment (
  uniqueID INT NOT NULL AUTO_INCREMENT,
  text TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  model_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(uniqueID),
  FOREIGN KEY (model_id) REFERENCES Model(uniqueID),
  PRIMARY KEY (uniqueID)
);


CREATE TABLE Comment_likes (
  user_id INT NOT NULL,
  comment_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User(uniqueID),
  FOREIGN KEY (comment_id) REFERENCES Comment(uniqueID),
  PRIMARY KEY (user_id, comment_id)
);






