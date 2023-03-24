use soma;

INSERT INTO User (name, bio, profile_picture_url, wallpaper_url)
VALUES ('Malha Tunir','Professional Archer', 'https://example.com/profile_picture.jpg', 'https://example.com/wallpaper.jpg');


INSERT INTO Model (name, weights, user_id, group_id, learning_rate, regularization_rate, optimizer)
VALUES ('Model1', '0.1,0.2,0.3', 1, NULL, 0.01, 0.001, 'Adam');

INSERT INTO Layer (type, num_channels, model_id, activation_function)
VALUES ('convolutional', 32, 1, 'relu');


INSERT INTO UserGroup (name, description)
VALUES ('FYP', 'sir yasir <3');

INSERT INTO GroupMember (group_id, user_id)
VALUES (1, 1);

INSERT INTO Messages (text, user_id, group_id)
VALUES ('Hello, world!', 1, 1);

INSERT INTO Model_likes (user_id, model_id)
VALUES (1, 1);

INSERT INTO Comment (text, user_id, model_id)
VALUES ('This model is trash', 1, 1);

INSERT INTO Comment_likes (user_id, comment_id)
VALUES (1, 1);




