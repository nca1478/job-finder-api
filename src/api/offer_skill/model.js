// DB Connection
import sequelize from '../../db/connection'

// Define Model
const OfferSkill = sequelize.define('offer_skill', {}, { timestamps: false })

export default OfferSkill
