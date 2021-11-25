// DB Connection
import sequelize from '../../db/connection'

// Define Model
const OfferSector = sequelize.define('offer_sector', {}, { timestamps: false })

export default OfferSector
