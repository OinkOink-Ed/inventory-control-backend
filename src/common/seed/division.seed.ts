import { Division } from 'src/Modules/division/entities/Division';
import { User } from 'src/Modules/user/entities/User';
import { DataSource } from 'typeorm';

export async function seedRoles(dataSourse: DataSource) {
  const divisionRepo = dataSourse.getRepository(Division);
  const userRepo = dataSourse.getRepository(User);

  const systemUser = await userRepo.findOneBy({ username: 'system' });

  // Я не буду давать проверку на существование подразделений

  const divisions = [
    {
      name: 'Подразделение № 1',
      location: 'ул. Конституции СССР 24',
      creator: systemUser,
    },
    {
      name: 'Подразделение № 2',
      location: 'ул. Пирогова 10',
      creator: systemUser,
    },
    {
      name: 'Подразделение № 3',
      location: 'ул. Донская 62',
      creator: systemUser,
    },
    {
      name: 'Подразделение № 4',
      location: 'ул. Абрикосовая 21А',
      creator: systemUser,
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
    if (!division) {
      throw new Error(`Division "${pair.divisionName}" not found`);
    }

    await userRepo.update(
      { username: pair.username },
      { division: { id: division.id } },
    );
  }

  console.log('Пользователи роли user успешно связаны с подразделениями');
}
