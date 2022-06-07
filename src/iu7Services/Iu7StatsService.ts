import { inject, injectable } from "inversify";
import EventRepository from "../repositories/event";
import UserRepository from "../repositories/user";
import { EventFilterModel } from "../services/EventService";
import StatsService, { StatsModel } from "../services/StatsService";

@injectable()
export default class Iu7StatsService implements StatsService {
  repo: EventRepository;
  userRepo: UserRepository;

  constructor(
    @inject("EventRepository") repo: EventRepository,
    @inject("UserRepository") userRepo: UserRepository
  ) {
    this.repo = repo;
    this.userRepo = userRepo;
  }
  async visitsByGroup(
    group: string,
    filters: EventFilterModel
  ): Promise<StatsModel[]> {
    filters.group = group;

    const types = await this.repo.getTypes({ group });

    return await Promise.all<Promise<StatsModel>[]>(
      types.map(async (type): Promise<StatsModel> => {
        const users = new Map<
          string,
          { name: string; userId: string; visited: number }
        >();

        const events = await this.repo.getByFilterWithVisits(
          Object.assign({}, filters, {
            type,
          })
        );

        events.forEach((event) =>
          event.visits.forEach((visit) => {
            if (!users.has(visit.userId)) {
              users[visit.userId] = {
                userId: visit.userId,
                name: visit.userId,
                visited: 0,
              };

              users[visit.userId].visited++;
            }
          })
        );

        return {
          type,
          total: events.length,
          students: [...users.entries()].map((x) => x[1]),
        };
      })
    );
  }
  async visitScore(userId: string, days = 30) {
    const user = await this.userRepo.getById(userId);
    const events = await this.repo.getByFilterWithVisits({
      group: user?.contingent?.group,
      date: {
        gt: new Date(new Date().getTime() - days * (24 * 60 * 60 * 1000)),
      },
    });

    return {
      total: events.length,
      visited: events.reduce(
        (acc, value) =>
          !value.visits.find((visit) => visit.userId == userId) ? acc : acc + 1,
        0
      ),
    };
  }
}
