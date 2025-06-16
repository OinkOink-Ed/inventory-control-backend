import type { User } from '@Modules/user/entities/User';

export type CreatorType = { creator: Pick<User, 'id'> };
