// Dependencies
import Sequelize from 'sequelize'

// DB Models
import UserModel from '../user/model'

export const setModels = sequelize => {
    // DB Tables
    const User = UserModel(sequelize, Sequelize)

    // Asociatives Tables

    // ----------------------- DB Relationships ---------------------------

    // ---------------- hasOne (1:1) & belongsTo (1:1) -------------------

    // ---------------- hasMany (1:M) & belongsTo (1:1) -------------------

    // --------------------- belongsToMany (N:M) -------------------------

    return {
        User,
        sequelize,
    }
}
