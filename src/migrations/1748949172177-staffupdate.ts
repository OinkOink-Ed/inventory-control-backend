import { MigrationInterface, QueryRunner } from 'typeorm';

export class Staffupdate1748949172177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Starting Staffupdate migration');
    const result = await queryRunner.query(`
      UPDATE staff s
      SET s.financiallyResponsiblePerson = true
      WHERE (s.lastname = 'Супрунова' AND s.name = 'Анна' AND s.patronimyc = 'Викторовна') OR 
      (s.lastname = 'Храпалева' AND s.name = 'Анна' AND s.patronimyc = 'Ивановна') OR 
      (s.lastname = 'Шмалий' AND s.name = 'Анна' AND s.patronimyc = 'Викторовна');
    `);
    console.log(`Updated ${result[1]} rows`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Reverting UpdateAdminDivision migration');
    await queryRunner.query(`
      UPDATE staff s
      SET s.financiallyResponsiblePerson = false
      WHERE (s.lastname = 'Супрунова' AND s.name = 'Анна' AND s.patronimyc = 'Викторовна') OR 
      (s.lastname = 'Храпалева' AND s.name = 'Анна' AND s.patronimyc = 'Ивановна') OR 
      (s.lastname = 'Шмалий' AND s.name = 'Анна' AND s.patronimyc = 'Викторовна');
    `);
  }
}
