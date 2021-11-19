module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.UUID,
            primaryKey: true,
            defaultValue: type.UUIDV4,
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: type.STRING,
            allowNull: false,
        },
        role: {
            type: type.ENUM,
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            defaultValue: 'USER_ROLE',
        },
        img: {
            type: type.STRING,
            defaultValue: null,
        },
        google: {
            type: type.BOOLEAN,
            defaultValue: false,
        },
        facebook: {
            type: type.BOOLEAN,
            defaultValue: false,
        },

        active: {
            type: type.BOOLEAN,
            defaultValue: true,
        },
    })
}
