import { DataSource } from 'typeorm';
import { UserEntity } from './user/infrastructure/entities/user.entity';
import { UserKeyResetPass } from './user/infrastructure/entities/userKeyResetPass.entity';
import { join } from 'path';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.BD_HOST,
  port: Number(process.env.BD_PORT),
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_DATABASE,
  entities: [UserEntity, UserKeyResetPass],
  migrations: [join(__dirname, 'migrations/*.ts')],
  synchronize: false,
  migrationsRun: true,
});
