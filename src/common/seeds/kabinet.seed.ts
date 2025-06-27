import { Division } from '@Modules/division/entities/Division';
import { Kabinet } from '@Modules/kabinet/entities/Kabinet';
import { User } from '@Modules/user/entities/User';
import { DataSource } from 'typeorm';

export async function seedKabinet(dataSourse: DataSource) {
  const kabinetRepo = dataSourse.getRepository(Kabinet);
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
      division: { id: division1?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '102',
      division: { id: division1?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '103',
      division: { id: division1?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '104',
      division: { id: division1?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '105',
      division: { id: division1?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '106',
      division: { id: division2?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '107',
      division: { id: division2?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '108',
      division: { id: division2?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '109',
      division: { id: division2?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '110',
      division: { id: division2?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '111',
      division: { id: division3?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '112',
      division: { id: division3?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '113',
      division: { id: division3?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '114',
      division: { id: division3?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '115',
      division: { id: division3?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '116',
      division: { id: division4?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '107',
      division: { id: division4?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '117',
      division: { id: division4?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '118',
      division: { id: division4?.id },
      creator: { id: systemUser?.id },
    },
    {
      number: '119',
      division: { id: division4?.id },
      creator: { id: systemUser?.id },
    },
  ];

  await kabinetRepo.save(kabinets);

  console.log('Кабинеты успешно созданы и связаны с подразделениями');
}
