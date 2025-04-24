import { Division } from 'src/Modules/division/entities/Division';
import { User } from 'src/Modules/user/entities/User';
import { Warehouse } from 'src/Modules/warehouse/entities/Warehouse';
import { DataSource } from 'typeorm';
import { WarehouseStatus } from '../enums/WarehouseStatus';

export async function seedRoles(dataSourse: DataSource) {
  const warehouseRepo = dataSourse.getRepository(Warehouse);
  const divisionRepo = dataSourse.getRepository(Division);
  const userRepo = dataSourse.getRepository(User);

  const systemUser = await userRepo.findOneBy({ username: 'system' });
  const divisions = await divisionRepo.find();

  const warehouses = divisions.map((division) => ({
    name: `Склад ${division.name}`,
    state: WarehouseStatus.ISOPEN,
    creator: systemUser,
    division: { id: division.id },
  }));

  // Я не буду давать проверку на существование Склада

  await warehouseRepo.save(warehouses);
  console.log('Склады успешно созданы и связаны с подразделениями');
}
