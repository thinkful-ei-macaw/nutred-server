const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: "test-user-1",
      full_name: "Test user 1",
      password: "password",
    },
    {
      id: 2,
      user_name: "test-user-2",
      full_name: "Test user 2",
      password: "password",
    },
    {
      id: 3,
      user_name: "test-user-3",
      full_name: "Test user 3",
      password: "password",
    },
    {
      id: 4,
      user_name: "test-user-4",
      full_name: "Test user 4",
      password: "password",
    },
  ];
}

function makeBiometricsArray() {
  return [
    {
      id: 1,
      height: "150",
      user_weight: "89",
      activity: "3",
      gender: "male",
      age: "24",
      date_created: "",
      user_id: 1,
    },
    {
      id: 1,
      height: "150",
      user_weight: "70",
      activity: "3",
      gender: "male",
      age: "24",
      date_created: "1",
      user_id: 1,
    },
  ];
}

function makeNutredFixtures() {
  const testUsers = makeUsersArray();
  const testBiometrics = makeBiometricsArray();
  return { testUsers, testBiometrics };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      nutred_users,
      user_biometrics,
      user_interests
      RESTART IDENTITY CASCADE`
  );
}
function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db
    .into("nutred_users")
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('nutred_users_id_seq', ?)`, [
        users[users.length - 1].id,
      ])
    );
}
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeNutredFixtures,
  makeAuthHeader,
  seedUsers,
  cleanTables,
};
