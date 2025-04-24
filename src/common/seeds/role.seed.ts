import { Role } from '@Modules/role/entities/Role';
import { DataSource } from 'typeorm';

export async function seedRoles(dataSourse: DataSource) {
  const roleRepo = dataSourse.getRepository(Role);

  // Я не буду давать проверку на существование ролей

  const roles = [
    { roleName: 'admin' },
    { roleName: 'user' },
    { roleName: 'system' },
  ];

  await roleRepo.save(roles);
  console.log('Роли успешно созданы');
}
