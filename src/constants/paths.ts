export const ABOUT_PATH = '/about' as const

/** Profile sections shown on About; also listed in the About page's crawlable outline. */
export const ABOUT_PROFILE_SECTIONS = {
  skills: 'Skills',
  achievements: 'Achievements',
  education: 'Education',
} as const

/**
 * Home sections in page order. The ids are the menu's jump targets from any page,
 * and the titles are also the home page's crawlable outline.
 */
export const HOME_SECTIONS = {
  experience: { id: 'experience', title: 'Experience' },
  projects: { id: 'projects', title: 'Projects' },
  writing: { id: 'writing', title: 'Writing' },
} as const
