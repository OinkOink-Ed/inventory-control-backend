import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminDivivisionUp1747034821540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Starting UpdateAdminDivision migration');
    const result = await queryRunner.query(`
      UPDATE user u
      JOIN role r ON u.roleId = r.id
      SET u.divisionId = 1
      WHERE r.roleName = 'admin';
    `);
    console.log(`Updated ${result[1]} rows`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Reverting UpdateAdminDivision migration');
    await queryRunner.query(`
      UPDATE user u
      JOIN role r ON u.roleId = r.id
      SET u.divisionId = NULL
      WHERE r.roleName = 'admin';
    `);
  }
}
