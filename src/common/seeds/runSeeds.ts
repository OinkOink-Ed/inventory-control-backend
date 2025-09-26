import { seedConfig } from '@common/config/seedConfig';
import { UserStatus } from '@common/enums/UserStatus';
import { seedCartridge } from '@common/seeds/cartridge.seed';
import { seedCartridgeModel } from '@common/seeds/cartridgeModel.seed';
import { seedDivision } from '@common/seeds/division.seed';
import { seedKabinet } from '@common/seeds/kabinet.seed';
import { seedRoles } from '@common/seeds/role.seed';
import { seedUsers } from '@common/seeds/user.seed';
import { seedWarehouse } from '@common/seeds/warehouse.seed';
import { Role } from '@Modules/role/entities/Role';
import { User } from '@Modules/user/entities/User';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

async function runSeeds() {
  const dataSourse = new DataSource(seedConfig);
  await dataSourse.initialize();

  try {
    await seedRoles(dataSourse);

    const salt = await bcrypt.genSalt(10);

    const roleRepo = dataSourse.getRepository(Role);
    const userRepo = dataSourse.getRepository(User);

    const systemRole = await roleRepo.findOneBy({ roleName: 'system' });

    await userRepo.save({
      username: 'system',
      password: await bcrypt.hash('system', salt),
      name: 'system',
      lastname: 'system',
      patronimyc: 'system',
      telephone: '+77777777777',
      state: UserStatus.ACTIVE,
      role: { id: systemRole?.id },
    });

    await seedDivision(dataSourse);
    await seedKabinet(dataSourse);
    await seedUsers(dataSourse);
    await seedWarehouse(dataSourse);
    await seedCartridgeModel(dataSourse);
    await seedCartridge(dataSourse);
  } catch (error) {
    console.log(error);
  } finally {
    await dataSourse.destroy();
  }
}

runSeeds();
