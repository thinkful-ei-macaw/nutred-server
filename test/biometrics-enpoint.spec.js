const knex = require("knex");
const bcrypt = require("bcryptjs");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("biometrics Endpoints", function () {
  let db;

  const { testUsers, testBiometrics } = helpers.makeNutredFixtures();
  const testUser = testUsers[0];
  const testBiometric = testBiometrics[0];

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe.only(`POST /api/biometrics`, () => {
    context(`Happy path`, () => {
      it(`responds 201, storing biometrics`, () => {
        const newBiometrics = {
          height: "150",
          user_weight: "89",
          activity: "3",
          gender: "male",
          age: "24",
        };
        const agent = supertest
          .agent(app)
          .post("/api/auth/login")
          .send(testUser)
          .end(console.log);
        return agent
          .post("/api/biometrics")
          .send(newBiometrics)
          .expect(201)
          .expect((res) => {
            expect(res.body).to.have.property("id");
            expect(res.body.height).to.eql(newBiometrics.height);
            expect(res.body.user_weight).to.eql(newBiometrics.user_weight);
            expect(res.body.activity).to.eql(newBiometrics.activity);
            expect(res.body).to.not.have.property("password");
            expect(res.headers.location).to.eql(
              `/api/biometrics/${res.body.id}`
            );
            // const expectedDate = new Date().toLocaleString();
            // const actualDate = new Date(res.body.date_created).toLocaleString();
            // expect(actualDate).to.eql(expectedDate);
          })
          .expect((res) => {
            db.from("user_biometrics")
              .select("*")
              .where({ id: res.body.id })
              .first()
              .then((row) => {
                expect(row.height).to.eql(newBiometrics.height);
                expect(row.user_weight).to.eql(newBiometrics.user_weight);
                expect(row.activity).to.eql(newBiometrics.activity);
                expect(row.gender).to.eql(newBiometrics.gender);
                expect(row.age).to.eql(newBiometrics.age);

                // const expectedDate = new Date().toLocaleString();
                // const actualDate = new Date(row.date_created).toLocaleString();
                // expect(actualDate).to.eql(expectedDate);
              });
          });
      });
    });
  });
});
