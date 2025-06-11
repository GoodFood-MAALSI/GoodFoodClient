import 'dotenv/config';
import { runSeeders } from 'typeorm-extension';
import AppDataSource from './data-source';
import { UserSeeder } from './seeders/user.seeder';
import { UserAddressSeeder } from './seeders/user_adresses.seeder';

async function seed() {
  try {
    await AppDataSource.initialize();
    await runSeeders(AppDataSource, {
      seeds: [
        UserSeeder,
        UserAddressSeeder
      ],
    });
    await AppDataSource.destroy();
  } catch (err) {
    process.exit(1);
  }
}

seed();