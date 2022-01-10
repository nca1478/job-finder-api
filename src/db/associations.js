// Main Models
import User from '../api/user/model'
import Skill from '../api/skill/model'
import Sector from '../api/sector/model'
import Offer from '../api/offer/model'

// Associative Models
import OfferSector from '../api/offer_sector/model'
import OfferSkill from '../api/offer_skill/model'

// ----------------------- DB Relationships ---------------------------

// ---------------- hasMany (1:M) & belongsTo (1:1) -------------------

// User-Offer / Offer-User
User.hasMany(Offer, { as: 'offers', foreignKey: 'userId' })
Offer.belongsTo(User, { as: 'user', foreignKey: 'userId' })

// --------------------- belongsToMany (N:M) -------------------------

// Offer-Sector / Sector-Offer
Offer.belongsToMany(Sector, { through: OfferSector })
Sector.belongsToMany(Offer, { through: OfferSector })

// Offer-Skill / Skill-Offer
Offer.belongsToMany(Skill, { through: OfferSkill })
Skill.belongsToMany(Offer, { through: OfferSkill })
