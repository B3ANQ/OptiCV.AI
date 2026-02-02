import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

export class Payment extends Model {
  public id!: number;
  public userId!: number;
  public amount!: number;
  public currency!: string;
  public status!: string;
  public stripePaymentIntentId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'EUR',
    },
    status: {
      type: DataTypes.ENUM('pending', 'succeeded', 'failed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    stripePaymentIntentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'payments',
    timestamps: true,
  }
);

// Relations
Payment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Payment, { foreignKey: 'userId' });