import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '@Modules/role/entities/Role';
import { User } from '@Modules/user/entities/User';
import { UserStatus } from '@common/enums/UserStatus';

export async function seedUsers(dataSourse: DataSource) {
  const roleRepo = dataSourse.getRepository(Role);
  const userRepo = dataSourse.getRepository(User);
  const salt = await bcrypt.genSalt(10);
  // Я не буду давать проверку на существование пользователей

  const systemRole = await roleRepo.findOneBy({ roleName: 'system' });

  const systemUser = await userRepo.save({
    username: 'system',
    password: await bcrypt.hash('system', salt),
    name: 'system',
    lastname: 'system',
    patronimyc: 'system',
    telephone: '+77777777777',
    state: UserStatus.INACTIVE,
    role: { id: systemRole.id },
  });

  const adminRole = await roleRepo.findOneBy({ roleName: 'admin' });
  const userRole = await roleRepo.findOneBy({ roleName: 'user' });

  const users = [
    {
      username: 'OinkOink',
      password: await bcrypt.hash('K4bJ99cK8', salt),
      name: 'Эдуард',
      lastname: 'Селедцов',
      patronimyc: 'Игоревич',
      telephone: '+79528360642',
      state: UserStatus.ACTIVE,
      role: { id: adminRole.id },
      division: null,
      creator: { id: systemUser.id },
    },
    {
      username: 'Palich',
      password: await bcrypt.hash('q1w2e3r4t5y6', salt),
      name: 'Олег',
      lastname: 'Сидоренко',
      patronimyc: 'Павлович',
      telephone: '+79649403535',
      state: UserStatus.ACTIVE,
      role: { id: adminRole.id },
      division: null,
      creator: { id: systemUser.id },
    },
    {
      username: 'Punker',
      password: await bcrypt.hash('q1w2e3r4t5y6', salt),
      name: 'Максим',
      lastname: 'Корытин',
      patronimyc: 'Сергеевич',
      telephone: '+79628885162',
      state: UserStatus.ACTIVE,
      role: { id: adminRole.id },
      division: null,
      creator: { id: systemUser.id },
    },
    {
      username: 'Nachalnik',
      password: await bcrypt.hash('q1w2e3r4t5y6', salt),
      name: 'Егор',
      lastname: 'Аленин',
      patronimyc: 'Сергеевич',
      telephone: '+79180999888',
      state: UserStatus.ACTIVE,
      role: { id: adminRole.id },
      division: null,
      creator: { id: systemUser.id },
    },
    {
      username: 'pdr4',
      password: await bcrypt.hash('q1w2e3r4t5y6', salt),
      name: 'Пользователь_1',
      lastname: 'Пользователь_1',
      patronimyc: 'Пользователь_1',
      telephone: '+11111111111',
      state: UserStatus.ACTIVE,
      role: { id: userRole.id },
      division: null,
      creator: { id: systemUser.id },
    },
    {
      username: 'pdr2',
      password: await bcrypt.hash('q1w2e3r4t5y6', salt),
      name: 'Пользователь_2',
      lastname: 'Пользователь_2',
      patronimyc: 'Пользователь_2',
      telephone: '+22222222222',
      state: UserStatus.ACTIVE,
      role: { id: userRole.id },
      division: null,
      creator: { id: systemUser.id },
    },
    {
      username: 'pdr3',
      password: await bcrypt.hash('q1w2e3r4t5y6', salt),
      name: 'Пользователь_3',
      lastname: 'Пользователь_3',
      patronimyc: 'Пользователь_3',
      telephone: '+333333333333',
      state: UserStatus.ACTIVE,
      role: { id: userRole.id },
      division: null,
      creator: { id: systemUser.id },
    },
  ];

  await userRepo.save(users);
  console.log('Пользователи успешно созданы');

  await roleRepo.update({}, { creator: { id: systemUser.id } });
  console.log('Ролям добавлен создатель system');
}
