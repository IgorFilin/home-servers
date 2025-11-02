import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserKeyResetPass } from './userKeyResetPass.entity';
import { IUserRoles } from '@home-servers/shared';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  ip: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAcceptKey: boolean;

  @Column()
  acceptKey: string;

  @Column({ nullable: true, default: null })
  userPhoto: string | null;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  date: Date;

  @OneToOne(() => UserKeyResetPass)
  @JoinColumn()
  resetPasswordKey: UserKeyResetPass;
}
