import { describe, it, expect } from 'vitest'
import type {
  Profile,
  ProfessionalSummary,
  Project,
  Achievement,
  Experience,
  Education,
} from './contentData'
import profileData from '../data/content/profile.json'
import summaryData from '../data/content/summary.json'
import projectsData from '../data/content/projects.json'
import achievementsData from '../data/content/achievements.json'
import experiencesData from '../data/content/experiences.json'
import educationData from '../data/content/education.json'

describe('Content Data Schema Validation', () => {
  describe('Profile Data', () => {
    it('should match Profile interface structure', () => {
      const profile: Profile = profileData

      expect(profile.name).toBeDefined()
      expect(profile.role).toBeDefined()
      expect(profile.image).toBeDefined()
      expect(profile.email).toBeDefined()
      expect(profile.location).toBeDefined()
      expect(profile.location.city).toBeDefined()
      expect(profile.location.state).toBeDefined()
      expect(profile.location.country).toBeDefined()
      expect(profile.description).toBeDefined()
      expect(profile.twitterCreator).toBeDefined()
    })

    it('should have valid profile data', () => {
      const profile: Profile = profileData

      expect(typeof profile.name).toBe('string')
      expect(typeof profile.role).toBe('string')
      expect(typeof profile.image).toBe('string')
      expect(typeof profile.email).toBe('string')
      expect(typeof profile.description).toBe('string')
      expect(typeof profile.twitterCreator).toBe('string')
    })
  })

  describe('Professional Summary Data', () => {
    it('should match ProfessionalSummary interface structure', () => {
      const summary: ProfessionalSummary = summaryData

      expect(summary.text).toBeDefined()
      expect(typeof summary.text).toBe('string')
      expect(summary.text.length).toBeGreaterThan(0)
    })
  })

  describe('Projects Data', () => {
    it('should match Project interface structure', () => {
      const projects: Project[] = projectsData

      expect(Array.isArray(projects)).toBe(true)
      expect(projects.length).toBeGreaterThan(0)

      projects.forEach((project) => {
        expect(project.title).toBeDefined()
        expect(project.description).toBeDefined()
        expect(project.technologies).toBeDefined()
        expect(project.liveUrl).toBeDefined()
        expect(project.featured).toBeDefined()

        expect(typeof project.title).toBe('string')
        expect(typeof project.description).toBe('string')
        expect(Array.isArray(project.technologies)).toBe(true)
        expect(typeof project.liveUrl).toBe('string')
        expect(typeof project.featured).toBe('boolean')
      })
    })
  })

  describe('Achievements Data', () => {
    it('should match Achievement interface structure', () => {
      const achievements: Achievement[] = achievementsData

      expect(Array.isArray(achievements)).toBe(true)
      expect(achievements.length).toBeGreaterThan(0)

      achievements.forEach((achievement) => {
        expect(achievement.text).toBeDefined()
        expect(typeof achievement.text).toBe('string')
        expect(achievement.text.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Experiences Data', () => {
    it('should match Experience interface structure', () => {
      const experiences: Experience[] = experiencesData

      expect(Array.isArray(experiences)).toBe(true)
      expect(experiences.length).toBeGreaterThan(0)

      experiences.forEach((experience) => {
        expect(experience.title).toBeDefined()
        expect(experience.company).toBeDefined()
        expect(experience.duration).toBeDefined()
        expect(experience.bullets).toBeDefined()

        expect(typeof experience.title).toBe('string')
        expect(typeof experience.company).toBe('string')
        expect(typeof experience.duration).toBe('string')
        expect(Array.isArray(experience.bullets)).toBe(true)
        expect(experience.bullets.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Education Data', () => {
    it('should match Education interface structure', () => {
      const education: Education[] = educationData

      expect(Array.isArray(education)).toBe(true)
      expect(education.length).toBeGreaterThan(0)

      education.forEach((edu) => {
        expect(edu.degree).toBeDefined()
        expect(edu.school).toBeDefined()
        expect(edu.duration).toBeDefined()
        expect(edu.details).toBeDefined()

        expect(typeof edu.degree).toBe('string')
        expect(typeof edu.school).toBe('string')
        expect(typeof edu.duration).toBe('string')
        expect(typeof edu.details).toBe('string')
      })
    })
  })
})
