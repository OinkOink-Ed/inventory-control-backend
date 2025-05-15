import { Division } from '@Modules/division/entities/Division';
import { Role } from '@Modules/role/entities/Role';
import { User } from '@Modules/user/entities/User';
import { DataSource } from 'typeorm';

export async function seedDivision(dataSourse: DataSource) {
  const divisionRepo = dataSourse.getRepository(Division);
  const userRepo = dataSourse.getRepository(User);
  const roleRepo = dataSourse.getRepository(Role);

  const systemUser = await userRepo.findOneBy({ username: 'system' });

  // Я не буду давать проверку на существование подразделений

  const divisions = [
    {
      name: 'Подразделение № 1',
      location: 'ул. Конституции СССР 24',
      creator: { id: systemUser.id },
    },
    {
      name: 'Подразделение № 2',
      location: 'ул. Пирогова 10',
      creator: { id: systemUser.id },
    },
    {
      name: 'Подразделение № 3',
      location: 'ул. Донская 62',
      creator: { id: systemUser.id },
    },
    {
      name: 'Подразделение № 4',
      location: 'ул. Абрикосовая 21А',
      creator: { id: systemUser.id },
    },
  ];

  await divisionRepo.save(divisions);

  console.log('Подразделения успешно созданы');

  const divisionsForUser = await divisionRepo.find();

  const userDivisionPairs = [
    { username: 'pdr1', divisionName: 'Подразделение № 1' },
    { username: 'pdr2', divisionName: 'Подразделение № 2' },
    { username: 'pdr3', divisionName: 'Подразделение № 3' },
    { username: 'pdr4', divisionName: 'Подразделение № 4' },
  ];

  for (const pair of userDivisionPairs) {
    const division = divisionsForUser.find(
      (division) => division.name === pair.divisionName,
    );

    await userRepo.update(
      { username: pair.username },
      { division: { id: division.id } },
    );
  }
  const role = await roleRepo.findOne({ where: { roleName: 'admin' } });

  await userRepo.update({ role: { id: role.id } }, { division: { id: 1 } });

  console.log('Пользователи успешно связаны с подразделениями');
}
