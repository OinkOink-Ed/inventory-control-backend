import { DataSource, IsNull } from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "@Modules/role/entities/Role";
import { User } from "@Modules/user/entities/User";
import { UserStatus } from "@common/enums/UserStatus";
import { Division } from "@Modules/division/entities/Division";
import { Kabinet } from "@Modules/kabinet/entities/Kabinet";

//Обязательно номер телефонов уникальные сделать
export async function seedUsers(dataSource: DataSource) {
  const roleRepo = dataSource.getRepository(Role);
  const userRepo = dataSource.getRepository(User);
  const divisionRepo = dataSource.getRepository(Division);
  const kabinetsRepo = dataSource.getRepository(Kabinet);
  const salt = await bcrypt.genSalt(10);
  // Я не буду давать проверку на существование пользователей

  const systemUser = await userRepo.findOneBy({ role: { roleName: "system" } });

  const adminRole = await roleRepo.findOneBy({ roleName: "admin" });

  //нужно уточнить как зовут сестер хоязек
  const userRole = await roleRepo.findOneBy({ roleName: "user" });
  const staffRole = await roleRepo.findOneBy({ roleName: "staff" });
  const divisionsId = await divisionRepo.find({ select: { id: true } });

  const kabinetsPdr1 = await kabinetsRepo.find({
    select: { id: true, number: true },
    where: { division: { name: "Подразделение № 1" } },
  });

  //Не забыть реализовать кабинеты по подразделениям!!!
  // Это нужно будет делать перед первой заливкой после встпуления проекта в работоспособный режим

  // const kabinetsPdr2 = await kabinetsRepo.find({
  //   select: { id: true, number: true },
  //   where: { division: { name: 'Подразделение № 2' } },
  // });
  // const kabinetsPdr3 = await kabinetsRepo.find({
  //   select: { id: true, number: true },
  //   where: { division: { name: 'Подразделение № 3' } },
  // });
  // const kabinetsPdr4 = await kabinetsRepo.find({
  //   select: { id: true, number: true },
  //   where: { division: { name: 'Подразделение № 4' } },
  // });

  divisionsId.map((item) => (item.id === 1 ? item.id : null));

  const users = [
    {
      username: "OinkOink",
      password: await bcrypt.hash("K4bJ99cK8", salt),
      name: "Эдуард",
      lastname: "Селедцов",
      patronymic: "Игоревич",
      telephone: "+79528360642",
      state: UserStatus.ACTIVE,
      role: { id: adminRole?.id },
      division: divisionsId,
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "Palich",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Олег",
      lastname: "Сидоренко",
      patronymic: "Павлович",
      telephone: "+79649403535",
      state: UserStatus.ACTIVE,
      role: { id: adminRole?.id },
      division: divisionsId,
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "Punker",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Максим",
      lastname: "Корытин",
      patronymic: "Сергеевич",
      telephone: "+79628885162",
      state: UserStatus.ACTIVE,
      role: { id: adminRole?.id },
      division: divisionsId,
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "Nachalnik",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Егор",
      lastname: "Аленин",
      patronymic: "Сергеевич",
      telephone: "+79180999888",
      state: UserStatus.ACTIVE,
      role: { id: adminRole?.id },
      division: divisionsId,
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "avdasevai",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ирина",
      lastname: "Авдасьева",
      patronymic: "Витальевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "avramenkol",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Любовь",
      lastname: "Авраменко",
      patronymic: "Алексеевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "ayrapetyant",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Тамара",
      lastname: "Айрапетян",
      patronymic: "Айказовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "aladinao",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Олеся",
      lastname: "Аладина",
      patronymic: "Геннадьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "aleksanyans",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Саркис",
      lastname: "Алексанян",
      patronymic: "Жораевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "alekshashina",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Антон",
      lastname: "Алексашин",
      patronymic: "Дмитриевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "amirovak",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Карина",
      lastname: "Амирова",
      patronymic: "Сергеевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "ananevao",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Оксана",
      lastname: "Ананьева",
      patronymic: "Сергеевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "aparinae",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Елена",
      lastname: "Апарина",
      patronymic: "Владимировна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "aparinai",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ирина",
      lastname: "Апарина",
      patronymic: "Александровна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "artemenkon",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Наталия",
      lastname: "Артеменко",
      patronymic: "Юрьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: userRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "akhmedovaa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Аида",
      lastname: "Ахмедова",
      patronymic: "Дамир Кызы",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "ashnokovai",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Инесса",
      lastname: "Ашнокова",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "baytikova",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Улан",
      lastname: "Байтиков",
      patronymic: "Турдакунович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "baloyana",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Алина",
      lastname: "Балоян",
      patronymic: "Валиковна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "baranovao",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ольга",
      lastname: "Баранова",
      patronymic: "Владимировна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "basavinai",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ирина",
      lastname: "Басавина",
      patronymic: "Анатольевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "bobrovs",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Сергей",
      lastname: "Бобров",
      patronymic: "Иванович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "bogatyrevam",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Мариам",
      lastname: "Богатырева",
      patronymic: "Махмудовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "bogosyanv",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Валентина",
      lastname: "Богосян",
      patronymic: "Павловна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "boykovai",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ирина",
      lastname: "Бойкова",
      patronymic: "Сергеевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "brusenskim",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Михаил",
      lastname: "Брусенский",
      patronymic: "Валерьевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "brusnikinan",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Нина",
      lastname: "Брусникина",
      patronymic: "Владимировна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "bulimovae",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Елена",
      lastname: "Булимова",
      patronymic: "Владимировна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "butaevaa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Альбина",
      lastname: "Бутаева",
      patronymic: "Валерьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "bykovan",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Наталья",
      lastname: "Быкова",
      patronymic: "Борисовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "valentovae",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Екатерина",
      lastname: "Валентова",
      patronymic: "Игоревна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "varzarevaa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Анастасия",
      lastname: "Варзарева",
      patronymic: "Евгеньевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "vilkinat",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Татьяна",
      lastname: "Вилкина",
      patronymic: "",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "vinokuroval",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Лариса",
      lastname: "Винокурова",
      patronymic: "Луновна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "virchenkos",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Станислав",
      lastname: "Вирченко",
      patronymic: "Валерьевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "vishnevetskayal",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Людмила",
      lastname: "Вишневецкая",
      patronymic: "Сергеевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "vlondisi",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Игорь",
      lastname: "Влондис",
      patronymic: "Олегович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "vlondiso",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ольга",
      lastname: "Влондис",
      patronymic: "Олеговна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "voronetskayas",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Светлана",
      lastname: "Воронецкая",
      patronymic: "Васильевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "voroninal",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Лариса",
      lastname: "Воронина",
      patronymic: "Геннадьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "vorotyntseva",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Алексей",
      lastname: "Воротынцев",
      patronymic: "Сергеевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "voskresenskayal",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Лариса",
      lastname: "Воскресенская",
      patronymic: "Евгеньевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 1 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "gabeliyag",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Георгий",
      lastname: "Габелия",
      patronymic: "Рубенович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "galchenkom",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Максим",
      lastname: "Гальченко",
      patronymic: "Юрьевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "garichkinam",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Марина",
      lastname: "Гаричкина",
      patronymic: "Николаевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "gogilovp",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Петр",
      lastname: "Гогилов",
      patronymic: "Николаевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "golyandrt",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Татьяна",
      lastname: "Голяндр",
      patronymic: "Ивановна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "gomzyakm",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Марина",
      lastname: "Гомзяк",
      patronymic: "Евгеньевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "goncharovao",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Оксана",
      lastname: "Гончарова",
      patronymic: "Сергеевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "gordonk",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Кирилл",
      lastname: "Гордон",
      patronymic: "Владиславович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "goryainovaa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Анастасия",
      lastname: "Горяинова",
      patronymic: "Михайловна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "grinevao",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ольга",
      lastname: "Гринева",
      patronymic: "Владимировна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: userRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "gugulyane",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Эмма",
      lastname: "Гугулян",
      patronymic: "Акоповна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "guptam",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Майанк",
      lastname: "Гупта",
      patronymic: "",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "danelyanl",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Лида",
      lastname: "Данелян",
      patronymic: "Ованесовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "danilevskayai",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Инна",
      lastname: "Данилевская",
      patronymic: "Владимировна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "danilyuke",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Елена",
      lastname: "Данилюк",
      patronymic: "Павловна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "darsaniyaz",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Зураб",
      lastname: "Дарсания",
      patronymic: "Вахтангиевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "denisenkot",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Татьяна",
      lastname: "Денисенко",
      patronymic: "Михайловна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "denshchiki",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Иван",
      lastname: "Денщик",
      patronymic: "Васильевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "doletskayai",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Индеана",
      lastname: "Долецкая",
      patronymic: "Георгиевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "dorokhovan",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Надежда",
      lastname: "Дорохова",
      patronymic: "Петровна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "dunaevi",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Илья",
      lastname: "Дунаев",
      patronymic: "Алексеевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "dunkoa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Антон",
      lastname: "Дунько",
      patronymic: "Анатольевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "dunkog",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Глеб",
      lastname: "Дунько",
      patronymic: "Анатольевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "dyudinae",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Елизавета",
      lastname: "Дюдина",
      patronymic: "Сергеевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "evdokimova",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ольга",
      lastname: "Евдокимова",
      patronymic: "Константиновна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "emelyanovai",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ирина",
      lastname: "Емельянова",
      patronymic: "Алексеевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "eremenkoe",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Эрика",
      lastname: "Еременко",
      patronymic: "Яковлевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "zh damirovai",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Инна",
      lastname: "Ждамирова",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "zhuline",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Екатерина",
      lastname: "Жулина",
      patronymic: "Юрьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "zantariyaa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Астанда",
      lastname: "Зантария",
      patronymic: "Степановна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "zakharyanr",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Рубен",
      lastname: "Захарьян",
      patronymic: "Арменакович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "ilmenevg",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Генрих",
      lastname: "Ильменев",
      patronymic: "Олегович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kazyulenkoa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Алексей",
      lastname: "Казюленко",
      patronymic: "Александрович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kalendzhyana",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Анна",
      lastname: "Календжян",
      patronymic: "Овагимовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "karlinao",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Оксана",
      lastname: "Карлина",
      patronymic: "Васильевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "karsanoval",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Лилия",
      lastname: "Карсанова",
      patronymic: "Артемовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "katenevat",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Татьяна",
      lastname: "Катенева",
      patronymic: "Васильевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kerefovad",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Дарина",
      lastname: "Керефова",
      patronymic: "Руслановна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kirichenkoo",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ольга",
      lastname: "Кириченко",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "knysho",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ольга",
      lastname: "Кныш",
      patronymic: "Николаевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kovalevae",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Эльза",
      lastname: "Ковалева",
      patronymic: "Гайнановна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kovankinan",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Наталья",
      lastname: "Кованкина",
      patronymic: "Александровна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kolmychenkol",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Лариса",
      lastname: "Колмыченко",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "korenevi",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Игорь",
      lastname: "Коренев",
      patronymic: "Иванович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "korolo",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ольга",
      lastname: "Король",
      patronymic: "Анатольевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kostinav",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Валентина",
      lastname: "Костина",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 2 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kravtsovp",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Павел",
      lastname: "Кравцов",
      patronymic: "Викторович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "krasilinam",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Марина",
      lastname: "Крашилина",
      patronymic: "Александровна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kuzinak",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ксения",
      lastname: "Кузина",
      patronymic: "Алексеевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kuznetsovaa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Анна",
      lastname: "Кузнецова",
      patronymic: "Александровна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kulumbegovat",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Татьяна",
      lastname: "Кулумбегова",
      patronymic: "Арамовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kupchenkor",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Розия",
      lastname: "Купченко",
      patronymic: "Габдулбариевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kucherovae",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Елена",
      lastname: "Кучерова",
      patronymic: "Григорьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "larionovd",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Денис",
      lastname: "Ларионов",
      patronymic: "Владиславович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "leusenkoe",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Елена",
      lastname: "Леусенко",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "lisanskayam",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Мария",
      lastname: "Лисанская",
      patronymic: "Романовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "lisochenkoy",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Юлия",
      lastname: "Лисоченко",
      patronymic: "Ивановна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "lysogorl",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Лариса",
      lastname: "Лысогор",
      patronymic: "Евгеньевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: userRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "lyubimovak",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ксения",
      lastname: "Любимова",
      patronymic: "Владимировна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "magamadovae",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Элиза",
      lastname: "Магамадова",
      patronymic: "Алимхановна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "magomedovav",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Виктория",
      lastname: "Магомедова",
      patronymic: "Вячеславовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "mayorovav",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Виктория",
      lastname: "Майорова",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "maksimenkoz",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Зоя",
      lastname: "Максименко",
      patronymic: "Сергеевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "malikn",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Надежда",
      lastname: "Малик",
      patronymic: "Леонидовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "matveevm",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Марк",
      lastname: "Матвеев",
      patronymic: "Валериевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "makhaurim",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Макка",
      lastname: "Махаури",
      patronymic: "Хамзатовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "matsenkob",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Борис",
      lastname: "Маценко",
      patronymic: "Михайлович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "melekhinai",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Инесса",
      lastname: "Мелехина",
      patronymic: "Андреевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "melik-stepanyang",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Жанна",
      lastname: "Мелик-Степанян",
      patronymic: "Григорьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "moiseenkoe",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Евгения",
      lastname: "Моисеенко",
      patronymic: "Игоревна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "moiseyshinan",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Наталья",
      lastname: "Моисейшина",
      patronymic: "Сергеевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "mukhamedyanovg",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Гайсар",
      lastname: "Мухамедьянов",
      patronymic: "Саматович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "myshlanovv",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Валентин",
      lastname: "Мышланов",
      patronymic: "Иванович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "nalivaykoa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Александр",
      lastname: "Наливайко",
      patronymic: "Вадимович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "nechaevm",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Михаил",
      lastname: "Нечаев",
      patronymic: "Николаевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "nechaevae",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Елена",
      lastname: "Нечаева",
      patronymic: "Сергеевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "ovsepyant",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Татьяна",
      lastname: "Овсепьян",
      patronymic: "Саркисовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "ovcherenkoe",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Елена",
      lastname: "Овчаренко",
      patronymic: "Михайловна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "oranskayat",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Татьяна",
      lastname: "Оранская",
      patronymic: "Юрьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "orekhovae",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Елена",
      lastname: "Орехова",
      patronymic: "Ивановна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "osipyany",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Яна",
      lastname: "Осипян",
      patronymic: "Семёновна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "pavlenkoa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Алла",
      lastname: "Павленко",
      patronymic: "Арсеньевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "pavlenkoan",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Анна",
      lastname: "Павленко",
      patronymic: "Андреевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "pavlovn",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Нази",
      lastname: "Павлова",
      patronymic: "Камбизовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "petrova",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Александр",
      lastname: "Петров",
      patronymic: "Семенович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "polishchukv",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Валерия",
      lastname: "Полищук",
      patronymic: "Ивановна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "poluninab",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Бэлла",
      lastname: "Полунина",
      patronymic: "Семеновна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "popova",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Антон",
      lastname: "Попов",
      patronymic: "Викторович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "rudakovao",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Оксана",
      lastname: "Рудакова",
      patronymic: "Васильевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "rumyantsevak",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ксения",
      lastname: "Румянцева",
      patronymic: "Олеговна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "ryzhovas",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Сусанна",
      lastname: "Рыжова",
      patronymic: "Хачиковна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "savins",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Сергей",
      lastname: "Савин",
      patronymic: "Анатольевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "samarina",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ирина",
      lastname: "Самарина",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "sarievaa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Анна",
      lastname: "Сариева",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "serdyukovv",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Василий",
      lastname: "Сердюков",
      patronymic: "Васильевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "serzhanovae",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Елена",
      lastname: "Сержанова",
      patronymic: "Николаевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "skorikovao",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ольга",
      lastname: "Скорикова",
      patronymic: "Александровна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "snegirevy",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Юрий",
      lastname: "Снегирёв",
      patronymic: "Николаевич",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "snesarevav",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Виктория",
      lastname: "Снесарева",
      patronymic: "Владимировна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 3 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "solovyeval",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Любовь",
      lastname: "Соловьева",
      patronymic: "Николаевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "sopkovav",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Валентина",
      lastname: "Сопкова",
      patronymic: "Геннадьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "stepanovaa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Альбина",
      lastname: "Степанова",
      patronymic: "Герасимовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "suprunovaa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Анна",
      lastname: "Супрунова",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "surovikinai",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ирина",
      lastname: "Суровикина",
      patronymic: "Владимировна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "sukhanovam",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Марина",
      lastname: "Суханова",
      patronymic: "Валерьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: userRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "talalaevs",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Сергей",
      lastname: "Талалаев",
      patronymic: "Федорович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "tarasoval",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Лиззет",
      lastname: "Тарасова",
      patronymic: "Уменовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "tatarinovai",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Ирина",
      lastname: "Татаринова",
      patronymic: "Венгисовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "tkachenkon",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Наталья",
      lastname: "Ткаченко",
      patronymic: "Владимировна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "tkachenkoo",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Олеся",
      lastname: "Ткаченко",
      patronymic: "Александровна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "tovmasyann",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Наталья",
      lastname: "Товмасян",
      patronymic: "Анатольевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "tukhvatshinr",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Рустэм",
      lastname: "Тухватшин",
      patronymic: "Фаритович",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "usovat",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Татьяна",
      lastname: "Усова",
      patronymic: "Юрьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "fedorovat",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Татьяна",
      lastname: "Федорова",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "khamalyana",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Анна",
      lastname: "Хамалян",
      patronymic: "Карапетовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "kharitonovas",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Светлана",
      lastname: "Харитонова",
      patronymic: "Васильевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "khasanovar",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Рената",
      lastname: "Хасанова",
      patronymic: "Радиковна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "khrapalevaa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Анна",
      lastname: "Храпалева",
      patronymic: "Вячеславовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "tsaturyang",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Гаяне",
      lastname: "Цатурян",
      patronymic: "Грачьяевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "chepigan",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Наталья",
      lastname: "Чепига",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "chernyavskayam",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Марина",
      lastname: "Чернявская",
      patronymic: "Валерьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "shaydullinal",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Лилия",
      lastname: "Шайдуллина",
      patronymic: "Равильевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "shalaginaa",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Анна",
      lastname: "Шалагина",
      patronymic: "Валерьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "shestakovae",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Елена",
      lastname: "Шестакова",
      patronymic: "Валерьевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "shmaliya",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Анна",
      lastname: "Шмалий",
      patronymic: "Васильевна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "yudinae",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Елена",
      lastname: "Юдина",
      patronymic: "Викторовна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
    {
      username: "yusupovay",
      password: await bcrypt.hash("q1w2e3r4t5y6", salt),
      name: "Юлия",
      lastname: "Юсупова",
      patronymic: "Радиковна",
      telephone: "+333333333333",
      state: UserStatus.ACTIVE,
      role: { id: staffRole?.id },
      division: [{ id: 4 }],
      kabinets: kabinetsPdr1
        .filter((item) => ["101", "102"].includes(item.number))
        .map((item) => ({ id: item.id })),
      creator: { id: systemUser?.id },
    },
  ];

  await userRepo.save(users);
  console.log("Пользователи успешно созданы");

  await roleRepo.update(
    { creator: IsNull() },
    { creator: { id: systemUser?.id } },
  );
  console.log("Ролям добавлен создатель system");
}
