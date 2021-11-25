// DB Connection
import sequelize from '../../db/connection'

// Define Model
const UserSkill = sequelize.define('user_skill', {}, { timestamps: false })

export default UserSkill
