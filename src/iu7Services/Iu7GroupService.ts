import { inject, injectable } from "inversify";
import EventRepository from "../repositories/event";
import StudentRepository from "../repositories/student";
import UserRepository from "../repositories/user";
import { UserModel } from "../services/AuthService";
import { EventModel } from "../services/EventService";
import EventSyncService from "../services/EventSyncService";
import GroupService, { GroupMetaModel } from "../services/GroupService";
import { FieldModel } from "../services/StudentService";

@injectable()
export default class Iu7GroupService implements GroupService {
  protected eventRepository: EventRepository;
  protected userRepository: UserRepository;
  protected studentRepository: StudentRepository;
  protected syncService: EventSyncService;

  constructor(
    @inject("EventRepository") eventRepository: EventRepository,
    @inject("UserRepository") userRepository: UserRepository,
    @inject("StudentRepository") studentRepository: StudentRepository,
    @inject("EventSyncService") syncService: EventSyncService
  ) {
    this.eventRepository = eventRepository;
    this.userRepository = userRepository;
    this.studentRepository = studentRepository;
    this.syncService = syncService;
  }
  async getEvents(group: string, date: Date): Promise<EventModel[]> {
    const dateStr = date.toISOString().split("T")[0];
    return await this.eventRepository.getByFilter({
      group,
      date: {
        gt: new Date(`${dateStr}T00:00:00`),
        lt: new Date(`${dateStr}T23:59:59`),
      },
    });
  }
  async getVisits(group: string, date: Date): Promise<EventModel[]> {
    const dateStr = date.toISOString().split("T")[0];
    return await this.eventRepository.getByFilterWithVisits({
      group,
      date: {
        gt: new Date(`${dateStr}T00:00:00`),
        lt: new Date(`${dateStr}T23:59:59`),
      },
    });
  }
  
  async getAllVisits(group: string): Promise<EventModel[]> {
    return await this.eventRepository.getByFilterWithVisits({
      group
    });
  }
  async getStudents(group: string): Promise<UserModel[]> {
    const users = await this.userRepository.getByGroup(group);

    return await Promise.all(users.map(async (user) => {
      const student = await this.studentRepository.getByUserId(user.id);
      return Object.assign({}, user, {
        student,
      });
    }));
  }
  async getStudentFields(group: string): Promise<FieldModel[]> {
    return await this.studentRepository.getFieldsByGroup(group);
  }
  async syncDay(group: string, date: Date): Promise<EventModel[]> {
    const events = await this.syncService.getEvents(group, date);

    const createdEvents = await Promise.all<Promise<EventModel>[]>(
      events.map((event) => this.eventRepository.create(event))
    );

    return createdEvents;
  }

  async getMeta(group: string): Promise<GroupMetaModel> {
    const eventFilter = {
      group,
    };
    const values = await Promise.all([
      this.eventRepository.getTypes(eventFilter),
      this.eventRepository.getSpeakers(eventFilter),
      this.eventRepository.getSubjects(eventFilter),
    ]);

    return {
      types: values[0],
      speakers: values[1],
      subjects: values[2],
    };
  }
}
