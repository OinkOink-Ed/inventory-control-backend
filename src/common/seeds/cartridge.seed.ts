import { CartridgeStatus } from '@common/enums/CartridgeStatus';
import { Cartridge } from '@Modules/cartridge/entities/Cartridge';
import { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';
import { Role } from '@Modules/role/entities/Role';
import { User } from '@Modules/user/entities/User';
import { Warehouse } from '@Modules/warehouse/entities/Warehouse';
import { DataSource } from 'typeorm';

export async function seedCartridge(dataSourse: DataSource) {
  const cartrdgeModelRepo = dataSourse.getRepository(CartridgeModel);
  const userRepo = dataSourse.getRepository(User);
  const cartridgeRepo = dataSourse.getRepository(Cartridge);
  const warehouseRepo = dataSourse.getRepository(Warehouse);
  const roleRepo = dataSourse.getRepository(Role);

  const systemUser = await userRepo.findOneBy({ username: 'system' });

  const warehouses = await warehouseRepo.find();
  const warehouseIds = warehouses.map((warehouse) => warehouse.id);

  const cartrdigeModels = await cartrdgeModelRepo.find();
  const cartrdigeModelIds = cartrdigeModels.map(
    (cartrdigeModel) => cartrdigeModel.id,
  );

  // Я не буду давать проверку на существование ролей

  const cartridges = warehouseIds.flatMap((warehouseId) =>
    cartrdigeModelIds.flatMap((modelId) => {
      if (warehouseId === 1)
        return Array.from({ length: 5 }, () => ({
          state: CartridgeStatus.RECEIVED,
          model: { id: modelId },
          warehouse: { id: warehouseId },
          creator: { id: systemUser?.id },
        }));
      else
        return Array.from({ length: 5 }, () => ({
          state: CartridgeStatus.MOVED,
          model: { id: modelId },
          warehouse: { id: warehouseId },
          creator: { id: systemUser?.id },
        }));
    }),
  );

  await cartridgeRepo.save(cartridges);
  console.log('Картриджи успешно добавлены на склады');

  await userRepo.update({ username: 'system' }, { deletedAt: new Date() });
  await roleRepo.update({ roleName: 'system' }, { deletedAt: new Date() });
  console.log('Системная сущность и роль soft-deleted');
}
