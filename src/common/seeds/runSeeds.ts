import { seedConfig } from '@common/config/seedConfig';
import { seedCartridge } from '@common/seeds/cartridge.seed';
import { seedCartridgeModel } from '@common/seeds/cartridgeModel.seed';
import { seedDivision } from '@common/seeds/division.seed';
import { seedKabinet } from '@common/seeds/kabinet.seed';
import { seedRoles } from '@common/seeds/role.seed';
import { seedUsers } from '@common/seeds/user.seed';
import { seedWarehouse } from '@common/seeds/warehouse.seed';
import { DataSource } from 'typeorm';

async function runSeeds() {
  const dataSourse = new DataSource(seedConfig);
  await dataSourse.initialize();

  try {
    await seedRoles(dataSourse);
    await seedUsers(dataSourse);
    await seedDivision(dataSourse);
    await seedWarehouse(dataSourse);
    await seedKabinet(dataSourse);
    await seedCartridgeModel(dataSourse);
    await seedCartridge(dataSourse);
  } catch (error) {
    console.log(error);
  } finally {
    await dataSourse.destroy();
  }
}

runSeeds();
