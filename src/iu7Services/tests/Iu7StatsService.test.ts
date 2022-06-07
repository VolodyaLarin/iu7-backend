import "reflect-metadata";

import EventRepository from "../../repositories/event";
import UserRepository from "../../repositories/user";
import { UserModel } from "../../services/AuthService";
import { EventFilterModel, EventModel } from "../../services/EventService";
import Iu7StatsService from "../Iu7StatsService";

jest.useFakeTimers().setSystemTime(new Date("2022-02-05"));

describe("Stats Service", () => {
  const GROUP = "GROUP";
  const USERID = "USERID";
  const TYPES = ["Type1", "Type2", "Type3"];
  const USER: UserModel = {
    id: USERID,
    token: "",
    login: "",
    contingentLogin: "",
    contingent: {
      login: "",
      surname: "",
      name: "",
      secname: "",
      birthday: undefined,
      group: GROUP,
    },
  };

  const VISIT_EVENTS: EventModel[] = [
    {
      date: new Date("2022-02-02T15:30:00"),
      group: GROUP,
      subject: "LOL",
      type: TYPES[0],
      visits: ["234", USERID, "23", "224"].map((id) => {
        return {
          userId: id,
          eventId: "233",
        };
      }),
    },
    {
      date: new Date("2022-02-02T16:30:00"),
      group: GROUP,
      subject: "LOL",
      type: TYPES[1],
      visits: ["234", USERID, "23", "224"].map((id) => {
        return {
          userId: id,
          eventId: "234",
        };
      }),
    },
    {
      date: new Date("2022-02-02T16:30:00"),
      group: GROUP,
      subject: "LOL",
      type: TYPES[1],
      visits: ["234", "224"].map((id) => {
        return {
          userId: id,
          eventId: "235",
        };
      }),
    },
  ];
  const userRepository: UserRepository = {
    getById: jest.fn(async () => {
      return USER;
    }),
    getByGroup: function (): Promise<UserModel[]> {
      throw new Error("Function not implemented.");
    },
    getByLogin: function (): Promise<UserModel> {
      throw new Error("Function not implemented.");
    },
    getByToken: function (): Promise<UserModel> {
      throw new Error("Function not implemented.");
    },

    updateById: function (): Promise<UserModel> {
      throw new Error("Function not implemented.");
    },
    deleteById: function (): Promise<boolean> {
      throw new Error("Function not implemented.");
    },
    create: function (): Promise<UserModel> {
      throw new Error("Function not implemented.");
    },
  };

  const eventRepository: EventRepository = {
    getByFilterWithVisits: jest.fn(async (filters: EventFilterModel) => {
      if (filters.type)
        return VISIT_EVENTS.filter((t) => t.type == filters.type);

      return VISIT_EVENTS;
    }),
    getTypes: jest.fn(async () => TYPES),
    getByFilter: function (): Promise<EventModel[]> {
      throw new Error("Function not implemented.");
    },
    syncVisits: function (): Promise<EventModel> {
      throw new Error("Function not implemented.");
    },
    visit: function (): Promise<EventModel> {
      throw new Error("Function not implemented.");
    },
    getSubjects: function (): Promise<string[]> {
      throw new Error("Function not implemented.");
    },
    getSpeakers: function (): Promise<string[]> {
      throw new Error("Function not implemented.");
    },
    getById: function (): Promise<EventModel> {
      throw new Error("Function not implemented.");
    },
    updateById: function (): Promise<EventModel> {
      throw new Error("Function not implemented.");
    },
    deleteById: function (): Promise<boolean> {
      throw new Error("Function not implemented.");
    },
    create: function (): Promise<EventModel> {
      throw new Error("Function not implemented.");
    },
  };

  const service = new Iu7StatsService(eventRepository, userRepository);

  it("test score", async () => {
    const res = await service.visitScore(USERID);

    expect(res).toEqual({
        total: 3,
        visited: 2
    });
  });

  it("test group stats score", async () => {
    const res = await service.visitsByGroup(GROUP, {});

    expect(res.map(t=>t.type)).toContain(TYPES[0]);
    expect(res.map(t=>t.type)).toContain(TYPES[1]);
    expect(res.map(t=>t.type)).toContain(TYPES[2]);
  });
});
