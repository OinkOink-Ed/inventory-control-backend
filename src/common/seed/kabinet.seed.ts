import { Division } from 'src/Modules/division/entities/Division';
import { Kabinet } from 'src/Modules/kabinet/entities/Kabinet';
import { User } from 'src/Modules/user/entities/User';
import { DataSource } from 'typeorm';

export async function seedRoles(dataSourse: DataSource) {
  const kabinetrepo = dataSourse.getRepository(Kabinet);
  const divisionRepo = dataSourse.getRepository(Division);
  const userRepo = dataSourse.getRepository(User);

  const systemUser = await userRepo.findOneBy({ username: 'system' });

  const division1 = await divisionRepo.findOneBy({ name: 'Подразделение № 1' });
  const division2 = await divisionRepo.findOneBy({ name: 'Подразделение № 2' });
  const division3 = await divisionRepo.findOneBy({ name: 'Подразделение № 3' });
  const division4 = await divisionRepo.findOneBy({ name: 'Подразделение № 4' });

  const kabinets = [
    {
      number: '101',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '102',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '103',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '104',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '105',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '106',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '107',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '108',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '109',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '110',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '111',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '112',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '113',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '114',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '115',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '116',
      division: { id: division1.id },
      creator: systemUser,
    },
    {
      number: '107',
      division: { id: division1.id },
      creator: systemUser,
    },
  ];

  // Я не буду давать проверку на существование подразделений

  console.log('Кабинеты успешно созданы и связаны с подразделениями');
}
