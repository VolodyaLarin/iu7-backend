import "reflect-metadata";

import * as bodyParser from "body-parser";
import morgan from 'morgan';

import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import "./controllers_v1/AuthController";
import "./controllers_v1/EventController";
import "./controllers_v1/GroupController";
import "./controllers_v1/StudentController";
import "./controllers_v1/StatsController";
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
import { AuthMiddleware } from "./controllers_v1/AuthMiddleware";
import { ContingentMiddleware } from "./controllers_v1/ContingentMiddleware";
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

import timeout from 'connect-timeout'

const main = async () => {
  const container = new Container();

  container.bind<GroupService>("GroupService").to(Iu7GroupService);
  container
    .bind<EventSyncService>("EventSyncService")
    .to(BitopEventSyncService);
  container.bind<CasService>("CasService").to(BmstuCasService);
  container.bind<CasHttpClient>("CasHttpClient").to(AxiosCasHttpClient);
  container.bind<AuthService>("AuthService").to(Iu7AuthService);
  container.bind<StudentService>("StudentService").to(Iu7StudentService);
  container.bind<EventService>("EventService").to(Iu7EventService);
  container.bind<StatsService>("StatsService").to(Iu7StatsService);
  container.bind<TokenCreator>("TokenCreator").toConstantValue(Iu7TokenCreator);
  container.bind<UserRepository>("UserRepository").to(SqlUserRepository);
  container
    .bind<ContingentRepository>("ContingentRepository")
    .to(SqlContingentRepository);
  container.bind<EventRepository>("EventRepository").to(SqlEventRepository);
  container.bind<CasXmlParser>("CasXmlParser").toConstantValue(FastXmlParser);
  container.bind<AuthMiddleware>("AuthMiddleware").to(AuthMiddleware);
  container
    .bind<ContingentMiddleware>("ContingentMiddleware")
    .to(ContingentMiddleware);
  container
    .bind<StudentRepository>("StudentRepository")
    .to(MongoStudentRepository);

  try {
    const knexInstance = knex(config.get("knex"));
    container.bind<Knex>("knex").toConstantValue(knexInstance);
  } catch (e) {
    console.error("Can't connect to DB", e);
  }

  try {
    const mongoClient = new MongoClient(config.get("mongodb.url"));
    await mongoClient.connect();
    const mongoDb = mongoClient.db(config.get("mongodb.database"));
    container.bind<Db>("mongoDb").toConstantValue(mongoDb);
  } catch (e) {
    console.error("Can't connect to mongoDB", e);
  }


  const haltOnTimedout = (req, res, next) => {
    if (!req.timedout) next()
  }

  // create server
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    // app.use(timeout('2s'))
    app.use(morgan('combined'))
    app.use("/api/v1/", express.static("swagger"));
    app.use("/api/v1/assets", express.static("node_modules/swagger-ui-dist"));

    // app.use(haltOnTimedout)
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      next();
    });
    // app.use(haltOnTimedout)

    //
    // add body parser
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    // app.use(haltOnTimedout)

    app.use(bodyParser.json());
    // app.use(haltOnTimedout)

    app.use(
      swagger.express({
        path: '/api/v1/swagger.json',
        definition: {
          info: {
            title: "IU7RF api",
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
    // app.use(haltOnTimedout)

  });

  const app = server.build();
  app.listen(config.get("port"));
  console.info("Server is listening on port : " + config.get("port"));
};

main();
