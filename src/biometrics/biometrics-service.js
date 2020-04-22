const biometricsService = {
  insertBiometrics(db, newBiometrics) {
    return db
      .insert(newBiometrics)
      .into("user_biometrics")
      .returning("*")
      .then(([user]) => user);
  },

  getBiometricsById(db, user_id) {
    return db
      .select("user_weight", "height", "activity", "gender", "age")
      .from("user_biometrics")
      .where({ user_id })
      .orderBy("date_created", "desc")
      .first();
  },
  getWeightsById(db, user_id) {
    return db
      .select("user_weight", "date_created")
      .from("user_biometrics")
      .where({ user_id })
      .orderBy("date_created", "desc");
  },
};

module.exports = biometricsService;
