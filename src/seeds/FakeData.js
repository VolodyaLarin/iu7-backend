const range = (i) => {
  return new Array(i).fill(0);
};

const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  faker.seed(123);

  const bulkSize = 500;

  const UsersCount = 1000;
  const EventsCount = 100000;
  const VisitCount = 1000000;

  const prefix = [...range(UsersCount / 200).map((x, i) => `ИУ${i + 1}`)];

  const users = range(UsersCount).map((x, i) => {
    const name = faker.name.fullName().split(" ");
    return {
      id: i+1,
      contingentLogin: "19У" + i,
      surname: name[0],
      name: name[1],
      secname: name[1],
      group:
        faker.helpers.arrayElement(prefix) +
        "-" +
        faker.random.numeric(2, { bannedDigits: ["0"] }),
      login: "aaa19u" + i,
      token: faker.random.alphaNumeric(32),
      birthday: new Date(faker.date.birthdate()),
      photo: faker.image.avatar(),
    };
  });

  users[1].token = "test_token_yandex_tank"

  await knex("users").del();
  await Promise.all(
    range(Math.ceil(users.length / bulkSize)).map(async (a, i) => {
      await knex("users").insert(
        users.slice(i * bulkSize, (i + 1) * bulkSize).map((u, i) => {
          return {
            id: u.id,
            contingentLogin: u.contingentLogin,
            login: u.login,
            token: u.token,
            photo: u.photo,
          };
        })
      );
    })
  );

  console.log("Insert users");

  await knex("contingent").del();

  await Promise.all(
    range(Math.ceil(users.length / bulkSize)).map(async (a, i) => {
      await knex("contingent").insert(
        users.slice(i * bulkSize, (i + 1) * bulkSize).map((u, i) => {
          return {
            id: u.id,
            login: u.contingentLogin,
            surname: u.surname,
            name: u.name,
            secname: u.secname,
            group: u.group,
            birthday: u.birthday,
          };
        })
      );
    })
  );

  console.log("Insert contingent");

  const subjects = range(100).map(() => faker.commerce.productName());
  const type = ["сем", "лек", "лаб"];


  await knex("events").del();
  await Promise.all(
    range(Math.ceil(EventsCount / bulkSize)).map(async (m, z) => {
      await knex("events").insert(
        range(bulkSize).map((x, i) => {
          return {
            id: i + 1 + z*bulkSize,
            group:
              faker.helpers.arrayElement(prefix) +
              "-" +
              faker.random.numeric(2, { bannedDigits: ["0"] }),
            subject: faker.helpers.arrayElement(subjects),
            type: faker.helpers.arrayElement(type),
            date: faker.date.between(
              "2022-01-01T00:00:00.000Z",
              "2022-05-01T00:00:00.000Z"
            ),
            speaker: faker.name.fullName(),
          };
        })
      );
    })
  );

  console.log("Insert events");


  await knex("visits").del();

  await Promise.all(
    range(Math.ceil(VisitCount / bulkSize)).map(async () => {
      await knex("visits").insert(
        range(bulkSize).map(() => {
          return {
            event_id: faker.datatype.number({ min: 1, max: EventsCount, precision: 1 }),
            user_id:  faker.datatype.number({ min: 1, max: UsersCount, precision: 1 }),
          };
        })
      );
    })
  );

  console.log("Insert visits");
};
