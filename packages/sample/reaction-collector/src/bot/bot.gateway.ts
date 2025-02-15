import { On, Once, UseCollectors, UseGuards } from '@discord-nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Message } from 'discord.js';

import { AppreciatedReactionCollector } from './appreciated-reaction-collector';
import { MessageFromUserGuard } from './guards/message-from-user.guard';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  @Once('ready')
  onReady(): void {
    this.logger.log('Bot was started!');
  }

  @On('messageCreate')
  @UseGuards(MessageFromUserGuard)
  @UseCollectors(AppreciatedReactionCollector)
  async onMessage(message: Message): Promise<void> {
    await message.reply('Start collector');
  }
}
