BEGIN;

TRUNCATE
    nutred_users,
    user_biometrics,
    user_interests
    RESTART IDENTITY CASCADE;

INSERT INTO nutred_users (full_name, user_name, "password", age)
VALUES
    ('brannen', 'branp', '$2a$10$YFB9kgs2Veo80GuPm9RLB.qOwX4Vny6DPapt6bEBQ/9d0cwp7KCwi', 26);

INSERT INTO user_biometrics (height, user_weight, activity, bodytype, user_id)
VALUES 
    (70, 150, 3, 'meso', 1);

INSERT INTO user_interests (cooking, exercise, food_nutrition, user_id) 
VALUES
    ('1', '0', '1', 1);

END;