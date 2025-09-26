import { Division } from '@Modules/division/entities/Division';
// import { Role } from '@Modules/role/entities/Role';
import { User } from '@Modules/user/entities/User';
import { DataSource } from 'typeorm';

export async function seedDivision(dataSourse: DataSource) {
  const divisionRepo = dataSourse.getRepository(Division);
  const userRepo = dataSourse.getRepository(User);
  // const roleRepo = dataSourse.getRepository(Role);

  const systemUser = await userRepo.findOneBy({ username: 'system' });

  // Я не буду давать проверку на существование подразделений

  const divisions = [
    {
      name: 'Подразделение № 1',
      location: 'ул. Конституции СССР 24',
      creator: { id: systemUser?.id },
    },
    {
      name: 'Подразделение № 2',
      location: 'ул. Пирогова 10',
      creator: { id: systemUser?.id },
    },
    {
      name: 'Подразделение № 3',
      location: 'ул. Донская 62',
      creator: { id: systemUser?.id },
    },
    {
      name: 'Подразделение № 4',
      location: 'ул. Абрикосовая 21А',
      creator: { id: systemUser?.id },
    },
  ];

  await divisionRepo.save(divisions);

  console.log('Подразделения успешно созданы');
}
