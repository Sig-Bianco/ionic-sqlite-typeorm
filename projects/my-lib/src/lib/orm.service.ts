import {Injectable} from '@angular/core';
import {SQLiteService} from './sqlite.service';
import {DataSource} from "typeorm";

@Injectable()
export class OrmService {
  isOrmService: Boolean = false;

  private sqliteService: SQLiteService = new SQLiteService();

  // Private functions
  /**
   * Initialize the TypeOrm Service
   */
  async initialize(dataSource: DataSource): Promise<void> {
    try {
      await this.sqliteService.checkConnectionConsistency();
      const database = String(dataSource.options.database);
      if (!dataSource.isInitialized) {
        // initialize the DataSource
        await dataSource.initialize();
        console.log(`*** dataSource has been initialized ***`)

        // load the data for this datasource
        if (this.sqliteService.getPlatform() === 'web') {
          // save the databases from memory to store
          await this.sqliteService.getSqliteConnection().saveToStore(database);
          console.log(`*** inORMService saveToStore ***`)
        }
      }
      console.log(`DataSource: ${database} initialized`);
      this.isOrmService = true;
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
}
