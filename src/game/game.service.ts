import { Injectable } from '@nestjs/common';
import { Game } from './entities/game.entity';

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

  create(data: Game) {
    return data;
  }

  update(id: string, data: Game) {
    return data;
  }

  delete(id: string) {
    return 'delete';
  }
}
