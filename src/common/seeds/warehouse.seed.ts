import { WarehouseStatus } from '@common/enums/WarehouseStatus';
import { Division } from '@Modules/division/entities/Division';
import { User } from '@Modules/user/entities/User';
import { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import { DataSource } from 'typeorm';

export async function seedWarehouse(dataSourse: DataSource) {
  const warehouseRepo = dataSourse.getRepository(Warehouse);
  const divisionRepo = dataSourse.getRepository(Division);
  const userRepo = dataSourse.getRepository(User);

  const systemUser = await userRepo.findOneBy({ username: 'system' });
  const divisions = await divisionRepo.find();

  const warehouses = divisions.map((division) => ({
    //Нужно сменить на номер
    name: `Склад ${division.name}`,
    state: WarehouseStatus.ISOPEN,
    creator: { id: systemUser?.id },
    division: { id: division.id },
  }));

  // Я не буду давать проверку на существование Склада

  await warehouseRepo.save(warehouses);
  console.log('Склады успешно созданы и связаны с подразделениями');
}
