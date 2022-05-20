import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  findAll() {
    return 'findall service';
  }

  findById(id: string) {
    return id;
  }

  findOne(id: string) {
    return this.findById(id);
  }

  create() {
    return 'create method';
  }

  update(id: string, data: any) {
    return 'update';
  }

  delete(id: string) {
    return 'delete';
  }
}
