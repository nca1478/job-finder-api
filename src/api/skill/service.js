// Queries
import { querySkillsList } from './querys'

class UserService {
    constructor(dependenciesData) {
        this.error = new Error()

        if (!dependenciesData.skill) {
            this.error.dependencyError = 'Skill Model is undefined'
            throw this.error.dependencyError
        } else {
            this.skill = dependenciesData.skill
        }
    }

    async createSkill(data) {
        try {
            const result = await this.skill.create(data)
            return result
        } catch (err) {
            throw err
        }
    }

    async findSkills() {
        const query = querySkillsList()
        return await this.skill.findAll(query)
    }

    async deleteSkill(id) {
        try {
            let result = await this.skill.update({ active: false }, { where: { id } })
            return result
        } catch (err) {
            throw err
        }
    }
}

export default UserService
