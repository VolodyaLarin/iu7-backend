import "reflect-metadata";

import * as bodyParser from "body-parser";

import { Container } from "inversify";
import {
  interfaces,
  InversifyExpressServer,
  TYPE,
} from "inversify-express-utils";

import "./controllers/AuthController";
import "./controllers/EventController";
import "./controllers/GroupController";
import "./controllers/StudentController";
import "./controllers/StatsController";
import express from "express";

import * as swagger from "swagger-express-ts";
import config from "config";
import CasService from "./services/CasService";
import BmstuCasService, {
  CasHttpClient,
  CasXmlParser,
} from "./iu7Services/BmstuCasService";
import AxiosCasHttpClient from "./iu7Services/AxiosCasHttpClient";
import Iu7AuthService, { TokenCreator } from "./iu7Services/Iu7AuthService";
import AuthService from "./services/AuthService";
import Iu7TokenCreator from "./iu7Services/Iu7TokenGenerator";
import UserRepository from "./repositories/user";
import { SqlUserRepository } from "./sqlRepositories/SqlUserRepository";
import knex, { Knex } from "knex";
import EventRepository from "./repositories/event";
import SqlEventRepository from "./sqlRepositories/SqlEventRepository";
import EventService from "./services/EventService";
import Iu7EventService from "./iu7Services/Iu7EventService";
import FastXmlParser from "./iu7Services/FastXmlParser";
import { AuthMiddleware } from "./controllers/AuthMiddleware";
import { ContingentMiddleware } from "./controllers/ContingentMiddleware";
import GroupService from "./services/GroupService";
import Iu7GroupService from "./iu7Services/Iu7GroupService";
import StudentRepository from "./repositories/student";
import { MongoStudentRepository } from "./sqlRepositories/MongoStudentRepository";
import { Db, MongoClient } from "mongodb";
import EventSyncService from "./services/EventSyncService";
import BitopEventSyncService from "./iu7Services/BitopEventSyncService";
import { SqlContingentRepository } from "./sqlRepositories/SqlContingentRepository";
import ContingentRepository from "./repositories/contingent";
import StudentService from "./services/StudentService";
import { Iu7StudentService } from "./iu7Services/Iu7StudentsService";
import StatsService from "./services/StatsService";
import Iu7StatsService from "./iu7Services/Iu7StatsService";

const main = async () => {
  const container = new Container();

  container.bind<GroupService>("GroupService").to(Iu7GroupService);
  container.bind<EventSyncService>("EventSyncService").to(BitopEventSyncService);
  container.bind<CasService>("CasService").to(BmstuCasService);
  container.bind<CasHttpClient>("CasHttpClient").to(AxiosCasHttpClient);
  container.bind<AuthService>("AuthService").to(Iu7AuthService);
  container.bind<StudentService>("StudentService").to(Iu7StudentService);
  container.bind<EventService>("EventService").to(Iu7EventService);
  container.bind<StatsService>("StatsService").to(Iu7StatsService);
  container.bind<TokenCreator>("TokenCreator").toConstantValue(Iu7TokenCreator);
  container.bind<UserRepository>("UserRepository").to(SqlUserRepository);
  container.bind<ContingentRepository>("ContingentRepository").to(SqlContingentRepository);
  container.bind<EventRepository>("EventRepository").to(SqlEventRepository);
  container.bind<CasXmlParser>("CasXmlParser").toConstantValue(FastXmlParser);
  container.bind<AuthMiddleware>("AuthMiddleware").to(AuthMiddleware);
  container
    .bind<ContingentMiddleware>("ContingentMiddleware")
    .to(ContingentMiddleware);
  container
    .bind<StudentRepository>("StudentRepository")
    .to(MongoStudentRepository);

  const knexInstance = knex(config.get("knex"));
  container.bind<Knex>("knex").toConstantValue(knexInstance);

  const mongoClient = new MongoClient(config.get("mongodb.url"));

  await mongoClient.connect();

  const mongoDb = mongoClient.db(config.get("mongodb.database"));
  container.bind<Db>("mongoDb").toConstantValue(mongoDb);


  // create server
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use("/api-docs/swagger", express.static("swagger"));
    app.use(
      "/api-docs/swagger/assets",
      express.static("node_modules/swagger-ui-dist")
    );
    //
    // add body parser
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());

    app.use(
      swagger.express({
        definition: {
          info: {
            title: "My api",
            version: "1.0",
          },
          securityDefinitions: {
            apiKeyHeader: {
              type: "apiKey",
              in: "header",
              name: "Authorization",
            },
          },
        },
      })
    );
  });

  const app = server.build();
  app.listen(config.get("port"));
  console.info("Server is listening on port : " + config.get("port"));
};


main();