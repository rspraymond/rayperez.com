export interface Location {
  city: string
  state: string
  country: string
}

export interface Profile {
  name: string
  role: string
  image: string
  email: string
  location: Location
  description: string
  twitterCreator: string
}

export interface ProfessionalSummary {
  text: string
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  liveUrl: string
  githubUrl?: string
  featured: boolean
}

export interface Achievement {
  text: string
}

export interface Experience {
  title: string
  company: string
  duration: string
  bullets: string[]
}

export interface Education {
  degree: string
  school: string
  duration: string
  details: string
}
