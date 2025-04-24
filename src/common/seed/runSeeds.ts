import { DataSource } from 'typeorm';
import { typeOrmConfig } from '../config/ormconfig';
import { seedRoles } from './role.seed';

async function runSeeds() {
  const dataSourse = new DataSource(typeOrmConfig);
  await dataSourse.initialize();

  try {
    await seedRoles(dataSourse);
  } catch (error) {
    console.log(error);
  } finally {
    await dataSourse.destroy();
  }
}

runSeeds();
