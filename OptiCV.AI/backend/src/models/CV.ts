import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

export class CV extends Model {
  public id!: number;
  public userId!: number;
  public data!: object;
  public style!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CV.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    style: {
      type: DataTypes.STRING,
      defaultValue: 'default',
    },
  },
  {
    sequelize,
    tableName: 'cvs',
    timestamps: true,
  }
);

// Relations
CV.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(CV, { foreignKey: 'userId' });