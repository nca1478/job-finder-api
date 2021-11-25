// Models
import sequelize from '../../db/connection'

// Associative Model
const UserSkill = sequelize.define('user_skill', {}, { timestamps: false })

export default UserSkill
