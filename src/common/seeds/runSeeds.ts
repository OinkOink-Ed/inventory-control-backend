import { seedConfig } from "@common/config/seedConfig";
import { UserStatus } from "@common/enums/UserStatus";
import { seedCartridge } from "@common/seeds/cartridge.seed";
import { seedCartridgeModel } from "@common/seeds/cartridgeModel.seed";
import { seedDivision } from "@common/seeds/division.seed";
import { seedKabinet } from "@common/seeds/kabinet.seed";
import { seedRoles } from "@common/seeds/role.seed";
import { seedUsers } from "@common/seeds/user.seed";
import { seedWarehouse } from "@common/seeds/warehouse.seed";
import { Role } from "@Modules/role/entities/Role";
import { User } from "@Modules/user/entities/User";
import * as bcrypt from "bcrypt";
import { DataSource } from "typeorm";

async function runSeeds() {
  const dataSource = new DataSource(seedConfig);
  await dataSource.initialize();

  try {
    await seedRoles(dataSource);

    const salt = await bcrypt.genSalt(10);

    const roleRepo = dataSource.getRepository(Role);
    const userRepo = dataSource.getRepository(User);

    const systemRole = await roleRepo.findOneBy({ roleName: "system" });

    await userRepo.save({
      username: "system",
      password: await bcrypt.hash("system", salt),
      name: "system",
      lastname: "system",
      patronymic: "system",
      telephone: "+77777777777",
      state: UserStatus.ACTIVE,
      role: { id: systemRole?.id },
    });

    await seedDivision(dataSource);
    await seedKabinet(dataSource);
    await seedUsers(dataSource);
    await seedWarehouse(dataSource);
    await seedCartridgeModel(dataSource);
    await seedCartridge(dataSource);
  } catch (error) {
    console.log(error);
  } finally {
    await dataSource.destroy();
  }
}

runSeeds();
