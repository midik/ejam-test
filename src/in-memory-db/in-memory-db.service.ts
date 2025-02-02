import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryDbService<T extends { id?: number }> {
  private dataStore = new Map<number, T>();
  private currentId = 1;

  create(entity: T): T {
    if (!entity.id) {
      entity.id = this.currentId++;
    }
    this.dataStore.set(entity.id, entity);
    return entity;
  }

  findAll(): T[] {
    return Array.from(this.dataStore.values());
  }

  truncate() {
    this.dataStore.clear();
  }
}
