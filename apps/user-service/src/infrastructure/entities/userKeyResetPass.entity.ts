import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UsersKeyResetPass')
export class UserKeyResetPass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  dateRemoved: Date;

  @BeforeInsert()
  setExpirationDate() {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);
    this.dateRemoved = expirationDate;
  }
}
