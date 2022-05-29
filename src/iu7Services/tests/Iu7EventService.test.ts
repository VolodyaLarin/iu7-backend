import EventRepository from "../../repositories/event";
import EventService, {
  EventFilterModel,
  EventModel,
} from "../../services/EventService";
import Iu7EventService from "../Iu7EventService";

describe("Event Service", () => {
  const EVENT: EventModel = {
    id: "1",
    date: new Date(),
    group: "ИУ7-64Б",
    subject: "Проектирование программного обеспечения",
    theme: "Принципы SOLID",
  };

  const EVENTS = [EVENT, EVENT];
  const FILTER: EventFilterModel = {
    group: "ИУ7-64Б",
  };

  const mockReturnOne = () => {
    return jest.fn(async (): Promise<EventModel> => EVENT);
  };
  const mockReturnMany = () => {
    return jest.fn(async (): Promise<EventModel[]> => EVENTS);
  };

  const repo: EventRepository = {
    getByFilter: mockReturnMany(),
    syncVisits: mockReturnOne(),
    visit: mockReturnOne(),
    getSubjects: function (): Promise<string[]> {
      throw new Error("Function not implemented.");
    },
    getTypes: function (): Promise<string[]> {
      throw new Error("Function not implemented.");
    },
    getSpeakers: function (): Promise<string[]> {
      throw new Error("Function not implemented.");
    },
    getById: mockReturnOne(),
    updateById: mockReturnOne(),
    deleteById: jest.fn(async () => true),
    create: mockReturnOne(),
  };


  const service: EventService = new Iu7EventService(repo);

  it("create", async () => {
    const event = await service.create(EVENT);
    expect(event).toEqual(event);
    expect(repo.create).lastCalledWith(EVENT);
  });
  it("update", async () => {
    const event = await service.update(EVENT);
    expect(event).toEqual(event);
    expect(repo.updateById).lastCalledWith(EVENT.id, EVENT);
  });
  it("delete", async () => {
    await service.delete(EVENT.id);
    expect(repo.deleteById).lastCalledWith(EVENT.id);
  });
  it("filter", async () => {
    const events = await service.filter(FILTER);

    expect(events).toEqual(EVENTS);
    expect(repo.getByFilter).lastCalledWith(FILTER);
  });
  it("syncVisits", async () => {
    await service.syncVisits(EVENT.id, ["1", "2", "3"]);

    expect(repo.syncVisits).lastCalledWith(EVENT.id, ["1", "2", "3"]);
  });
  it("addVisit", async () => {
    await service.addVisit(EVENT.id, "1");

    expect(repo.visit).lastCalledWith(EVENT.id, "1");
  });

});
