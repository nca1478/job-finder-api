// Dependencies
import { Model, DataTypes } from 'sequelize'

// DB Connection
import sequelize from '../../db/connection'

class User extends Model {}
User.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            defaultValue: 'USER_ROLE',
        },
        img: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        google: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        facebook: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        tokenRecovery: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        education: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cvUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        linkedinUser: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        twitterUser: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        instagramUser: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        facebookUser: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'user',
    },
)

export default User
