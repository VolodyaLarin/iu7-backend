import "reflect-metadata";

import BitopEventSyncService from "../BitopEventSyncService";

describe("Event Sync Service", () => {
  const service = new BitopEventSyncService();

  it("load schedule", async () => {
    await service.getTimetable("ИУ7-64Б");
  });
  it("select day", async () => {
    service.getTimetable = async () => {
      return {
        firstDayOfSemester: new Date("2022-02-07"),
        oddWeekEvents: [],
        evenWeekEvents: [
          [
            {
              date: undefined,
              group: "ИУ7-64Б",
              place: "218л",
              speaker: "Власов П. А.",
              startAt: [17, 0],
              subject: "Математическая статистика",
              theme: "",
              type: "лек",
            },
            {
              date: undefined,
              group: "ИУ7-64Б",
              place: "",
              speaker: "",
              startAt: [12, 0],
              subject: "Элективный курс по физической культуре и спорту",
              theme: "",
              type: "сем",
            },
            {
              date: undefined,
              group: "ИУ7-64Б",
              place: "218л",
              speaker: "Бекасов Д. Е.",
              startAt: [15, 0],
              subject: "Проектирование программного обеспечения",
              theme: "",
              type: "лек",
            },
          ],
        ],
      };
    };
    const res = await service.getEvents("ИУ7-64Б", new Date("2022-02-07"));

    expect(res.length).toEqual(3);
    expect(res.map(x=>x.date.getTime())).toContain(new Date("2022-02-07T15:00:00").getTime());
  });
});
