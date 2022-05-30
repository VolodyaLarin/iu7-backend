import BitopEventSyncService from "../BitopEventSyncService";
import TranslitService from "../TranslitService";

const config = {
    BITOP_API: "https://api.bitop.bmstu.ru",
    BITOP_TOKEN: "NOT To COMMIT",
}

describe("Event Sync Service", () => {
  const service = new BitopEventSyncService(
    config.BITOP_API,
    config.BITOP_TOKEN,
    TranslitService
  );

//   it("load schedule", async () => {
//     await service.getTimetable("ИУ7-64Б");
//   });
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
