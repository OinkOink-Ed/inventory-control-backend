import { CartridgeModel } from '@Modules/cartridgeModel/entities/CartridgeModel';
import { User } from '@Modules/user/entities/User';
import { DataSource } from 'typeorm';

export async function seedCartridgeModel(dataSourse: DataSource) {
  const cartrdgeModelRepo = dataSourse.getRepository(CartridgeModel);
  const userRepo = dataSourse.getRepository(User);

  const systemUser = await userRepo.findOneBy({ username: 'system' });

  // Я не буду давать проверку на существование ролей

  const models = [
    { name: 'C285', creator: { id: systemUser.id } },
    { name: 'C725', creator: { id: systemUser.id } },
    { name: '259A', creator: { id: systemUser.id } },
    { name: '259X', creator: { id: systemUser.id } },
    { name: '1075', creator: { id: systemUser.id } },
  ];

  await cartrdgeModelRepo.save(models);
  console.log('Модели картриджей успешно созданы');
}
