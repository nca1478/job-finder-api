// Queries
import { querySkillsList, querySkillById } from './querys'

class SkillService {
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

    async findSkills(paginationData) {
        const query = querySkillsList(paginationData)
        return await this.skill.findAndCountAll(query)
    }

    async findSkillById(id) {
        const query = querySkillById(id)
        return this.skill.findOne(query)
    }

    async updateSkill(id, dataSkill) {
        try {
            const skillResponse = await this.skill.update({ ...dataSkill }, { where: { id } })
            return skillResponse
        } catch (err) {
            throw err
        }
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

export default SkillService
