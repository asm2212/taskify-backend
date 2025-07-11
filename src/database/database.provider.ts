import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    try {
      if (!this.connection || !this.connection.db) {
        throw new Error('MongoDB connection not established');
      }

      await this.connection.db.admin().ping();
      this.logger.log('Successfully connected to MongoDB');

      this.logger.debug(`Database name: ${this.connection.db.databaseName}`);
      this.logger.debug(`Host: ${this.connection.host}`);
    } catch (error: unknown) {

    let errorMessage = 'Database connection failed';

      if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
        this.logger.error(errorMessage, { stack: error.stack });
      } else {
        this.logger.error(errorMessage, { error });
      }
      process.exit(1);
    }
  }
}
