// Models
import sequelize from '../../db/connection'

// Associative Model
const OfferSector = sequelize.define('offer_sector', {}, { timestamps: false })

export default OfferSector
