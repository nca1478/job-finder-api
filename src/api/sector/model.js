// Dependencies
import { Model, DataTypes } from 'sequelize'

// DB Connection
import sequelize from '../../db/connection'

class Sector extends Model {}
Sector.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'sector',
    },
)

export default Sector
