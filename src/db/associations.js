// Models
import User from '../api/user/model'
import Skill from '../api/skill/model'
import Sector from '../api/sector/model'
import Offer from '../api/offer/model'

// ----------------------- DB Relationships ---------------------------

// ---------------- hasMany (1:M) & belongsTo (1:1) -------------------

// User-Offer / Offer-User
User.hasMany(Offer, { as: 'offers', foreignKey: 'userId' })
Offer.belongsTo(User, { as: 'user', foreignKey: 'userId' })
