import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

export class Subscription extends Model {
  public id!: number;
  public userId!: number;
  public plan!: string;
  public status!: string;
  public stripeSubscriptionId!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subscription.init(
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
    plan: {
      type: DataTypes.ENUM('free', 'premium_monthly', 'premium_yearly'),
      allowNull: false,
      defaultValue: 'free',
    },
    status: {
      type: DataTypes.ENUM('active', 'cancelled', 'expired'),
      allowNull: false,
      defaultValue: 'active',
    },
    stripeSubscriptionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'subscriptions',
    timestamps: true,
  }
);

// Relations
Subscription.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Subscription, { foreignKey: 'userId' });