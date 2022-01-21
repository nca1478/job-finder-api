// Dependencies
import { Model, DataTypes } from 'sequelize'

// DB Connection
import sequelize from '../../db/connection'

class Offer extends Model {}
Offer.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contract: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        period: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'offer',
    },
)

export default Offer
