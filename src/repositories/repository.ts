export default interface Repository<T, M = string> {
  getById: (id: M) => Promise<T | null>;
  updateById: (id: M, e: Omit<T, 'id'>) => Promise<T>;
  deleteById: (id: M) => Promise<boolean>;
  create: (e: Omit<T, 'id'>) => Promise<T>;
}
