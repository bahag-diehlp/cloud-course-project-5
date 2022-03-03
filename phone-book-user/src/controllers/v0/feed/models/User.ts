import {Table, Column, Model, PrimaryKey} from 'sequelize-typescript';


@Table
export class User extends Model<User> {

  @Column
  public firstName: string;

  @Column
  public lastName: string;

  @Column
  public email: string;
}
