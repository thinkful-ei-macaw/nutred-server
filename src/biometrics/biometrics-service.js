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
      .select("user_weight", "height", "activity")
      .from("user_biometrics")
      .where({ user_id })
      .first();
  },
};

module.exports = biometricsService;
