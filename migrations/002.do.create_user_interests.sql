CREATE TABLE user_interests (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    cooking bit,
    exercise bit,
    food_nutrition bit,
    metabolism bit,
    user_id INTEGER REFERENCES nutred_users(id) NOT NULL UNIQUE
    );