const infoService = {
  insertInterests(db, newInterests) {
    return db
      .insert(newInterests)
      .into("user_interests")
      .returning("*")
      .then(([user]) => user);
  },

  getInterestById(db, user_id) {
    return db
      .select("cooking", "exercise", "food_nutrition", "metabolism")
      .from("user_interests")
      .where({ user_id })
      .first();
  },
};

module.exports = infoService;
