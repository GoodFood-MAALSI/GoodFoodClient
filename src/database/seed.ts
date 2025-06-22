import 'dotenv/config';
import { runSeeders } from 'typeorm-extension';
import AppDataSource from './data-source';
import { UserSeeder } from './seeders/user.seeder';
import { UserAddressSeeder } from './seeders/user-adresses.seeder';
import { UserSearchHistorySeeder } from './seeders/user-search-history.seeder';

async function seed() {
  try {
    await AppDataSource.initialize();
    await runSeeders(AppDataSource, {
      seeds: [
        UserSeeder,
        UserAddressSeeder,
        UserSearchHistorySeeder
      ],
    });
    await AppDataSource.destroy();
  } catch (err) {
    process.exit(1);
  }
}

seed();