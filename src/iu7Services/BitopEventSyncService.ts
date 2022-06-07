import { EventModel } from "../services/EventService";
import EventSyncService from "../services/EventSyncService";

import config from "config";

type EventRes = EventModel & {
  startAt: number[];
};
export interface EventSyncModel {
  firstDayOfSemester: Date;
  oddWeekEvents: EventRes[][];
  evenWeekEvents: EventRes[][];
}

interface BitopSheduleAnswer {
  semester_start: string;
  lessons: {
    day: number;
    start_at: `${number}:${number}:${number}`;
    name: string;
    teachers: {
      name: string;
      uuid: string;
    }[];
    cabinet?: string;
    type: "сем" | "лаб" | "лек";
    is_numerator: boolean;
  }[];
}

import axios, { AxiosInstance } from "axios";
import { injectable } from "inversify";
import TranslitService from "./TranslitService";

export type TranslitFun = (s: string) => string;

@injectable()
export default class BitopEventSyncService implements EventSyncService {
  axios: AxiosInstance;
  translit: TranslitFun;

  constructor() {
    this.translit = TranslitService;

    this.axios = axios.create();
    this.axios.defaults.baseURL = config.get("bitop.api_url");
    this.axios.interceptors.request.use(
      (conf) => {
        conf.headers["x-bb-token"] = config.get("bitop.api_token");
        return conf;
      },
      null,
      { synchronous: true }
    );
  }

  async getEvents(group: string, date: Date): Promise<EventModel[]> {
    const sh = await this.getTimetable(group);
    const weekN =
      (date.getTime() - sh.firstDayOfSemester.getTime()) /
        (1000 * 60 * 60 * 24 * 7) +
      1;
    const dayN = (date.getDay() + 6) % 7;

    const weekT = weekN % 2 == 0 ? "oddWeekEvents" : "evenWeekEvents";

    return sh[weekT][dayN].map((x) => {
      const dateTime = new Date(
        date.getTime() + (x.startAt[0] * 60 + x.startAt[1]) * 60 * 1000
      );
      return {
        date: dateTime,
        group: x.group,
        subject: x.subject,
        place: x.place,
        speaker: x.speaker,
        type: x.type,
      };
    });
  }
  async getTimetable(group: string): Promise<EventSyncModel> {
    const translitGroup = this.translit(group);

    const groupRes = await this.axios.post("/search/unit", {
      type: "group",
      query: translitGroup,
    });

    const groupUuid = groupRes.data.items[0].uuid;

    const scheduleRes = await this.axios.get<BitopSheduleAnswer>(
      `/schedule/${groupUuid}`
    );

    const result: EventSyncModel = {
      firstDayOfSemester: new Date(scheduleRes.data.semester_start),
      oddWeekEvents: [[], [], [], [], [], [], []],
      evenWeekEvents: [[], [], [], [], [], [], []],
    };

    scheduleRes.data.lessons.forEach((lesson) => {
      const week = lesson.is_numerator ? "oddWeekEvents" : "evenWeekEvents";

      const event: EventRes = {
        date: undefined,
        startAt: lesson.start_at
          .split(":")
          .slice(0, 2)
          .map((n) => Number(n)),
        group,
        subject: lesson.name,
        theme: "",
        speaker: lesson.teachers.map((x) => x.name).join(" и "),
        place: lesson.cabinet,
        type: lesson.type,
      };
      result[week][lesson.day - 1].push(event);
    });

    return result;
  }
}
