import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { SvgIconComponent } from '@mui/icons-material'
import HomeIcon from '@mui/icons-material/Home'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import EditNoteIcon from '@mui/icons-material/EditNote'
import PersonIcon from '@mui/icons-material/Person'
import ArticleIcon from '@mui/icons-material/Article'
import DescriptionIcon from '@mui/icons-material/Description'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import EmailIcon from '@mui/icons-material/Email'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import TagIcon from '@mui/icons-material/Tag'
import resumePdf from '../assets/raymond-perez-software-engineer-resume.pdf'
import { posts } from '../constants/posts'
import { caseStudies } from '../constants/caseStudies'
import { PROFILE } from '../constants/profile'
import { ABOUT_PATH, FEED_PATH, HOME_SECTIONS } from '../constants/paths'
import { useTheme } from '../contexts/useTheme'
import { formatIsoDate } from '../utils/formatIsoDate'
import { newestFirst } from '../utils/newestFirst'
import { scrollToHeading } from '../utils/articleHeadings'
import type { ArticleSection } from '../utils/articleHeadings'

/** Results are listed in this group order. */
export const PALETTE_GROUPS = [
  'On this page',
  'Pages',
  'Articles',
  'Case studies',
  'Actions',
] as const

export type PaletteGroup = (typeof PALETTE_GROUPS)[number]

export interface PaletteCommand {
  id: string
  group: PaletteGroup
  label: string
  /** Short trailing detail such as a date; also searchable. */
  hint?: string
  /** Extra words people might type that are not in the label. */
  keywords?: string
  Icon: SvgIconComponent
  run: () => void
  /** Run only once the dialog has closed, for commands that scroll the page the dialog still locks. */
  waitForClose?: boolean
}

const openInNewWindow = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Every page, article, case study, and quick action the command palette can run, in group order,
 * led by the sections of the article being read.
 */
export const usePaletteCommands = (sections: ArticleSection[]): PaletteCommand[] => {
  const navigate = useNavigate()
  const { themeMode, setThemeMode } = useTheme()

  return useMemo(() => {
    const nextTheme = themeMode === 'light' ? 'dark' : 'light'
    const toHomeSection = (id: string) => () => navigate({ pathname: '/', hash: id })

    const onThisPage: PaletteCommand[] = sections.map(({ id, text }) => ({
      id: `section-${id}`,
      group: 'On this page',
      label: text,
      keywords: 'section heading jump',
      Icon: TagIcon,
      run: () => scrollToHeading(id),
      waitForClose: true,
    }))

    const pages: PaletteCommand[] = [
      {
        id: 'page-home',
        group: 'Pages',
        label: 'Home',
        keywords: 'start introduction',
        Icon: HomeIcon,
        run: () => navigate('/'),
      },
      {
        id: 'page-experience',
        group: 'Pages',
        label: HOME_SECTIONS.experience.title,
        keywords: 'jobs work history career',
        Icon: WorkOutlineIcon,
        run: toHomeSection(HOME_SECTIONS.experience.id),
      },
      {
        id: 'page-projects',
        group: 'Pages',
        label: HOME_SECTIONS.projects.title,
        keywords: 'portfolio side projects apps',
        Icon: FolderOpenIcon,
        run: toHomeSection(HOME_SECTIONS.projects.id),
      },
      {
        id: 'page-writing',
        group: 'Pages',
        label: HOME_SECTIONS.writing.title,
        keywords: 'blog articles posts',
        Icon: EditNoteIcon,
        run: toHomeSection(HOME_SECTIONS.writing.id),
      },
      {
        id: 'page-about',
        group: 'Pages',
        label: 'About',
        keywords: 'bio skills achievements education',
        Icon: PersonIcon,
        run: () => navigate(ABOUT_PATH),
      },
    ]

    const articles: PaletteCommand[] = [...posts].sort(newestFirst).map((post) => ({
      id: `article-${post.path}`,
      group: 'Articles',
      label: post.title,
      hint: formatIsoDate(post.date),
      keywords: 'article blog post',
      Icon: ArticleIcon,
      run: () => navigate(post.path),
    }))

    const studies: PaletteCommand[] = [...caseStudies].sort(newestFirst).map((study) => ({
      id: `case-study-${study.path}`,
      group: 'Case studies',
      label: study.title,
      keywords: `${study.project} ${study.role} project`,
      Icon: DescriptionIcon,
      run: () => navigate(study.path),
    }))

    const actions: PaletteCommand[] = [
      {
        id: 'action-theme',
        group: 'Actions',
        label: `Switch to ${nextTheme} theme`,
        keywords: 'dark light mode appearance color',
        Icon: nextTheme === 'light' ? LightModeIcon : DarkModeIcon,
        run: () => setThemeMode(nextTheme),
      },
      {
        id: 'action-resume',
        group: 'Actions',
        label: 'Open resume',
        hint: 'PDF',
        keywords: 'cv download',
        Icon: DescriptionIcon,
        run: () => openInNewWindow(resumePdf),
      },
      {
        id: 'action-email',
        group: 'Actions',
        label: `Email ${PROFILE.name.split(' ')[0]}`,
        keywords: 'contact mail message hire',
        Icon: EmailIcon,
        run: () => window.open(`mailto:${PROFILE.email}`, '_self'),
      },
      {
        id: 'action-linkedin',
        group: 'Actions',
        label: 'LinkedIn profile',
        keywords: 'social connect',
        Icon: LinkedInIcon,
        run: () => openInNewWindow(PROFILE.linkedinUrl),
      },
      {
        id: 'action-github',
        group: 'Actions',
        label: 'GitHub profile',
        keywords: 'code repositories source',
        Icon: GitHubIcon,
        run: () => openInNewWindow(PROFILE.githubUrl),
      },
      {
        id: 'action-rss',
        group: 'Actions',
        label: 'RSS feed',
        keywords: 'subscribe updates xml',
        Icon: RssFeedIcon,
        run: () => openInNewWindow(FEED_PATH),
      },
    ]

    return [...onThisPage, ...pages, ...articles, ...studies, ...actions]
  }, [sections, navigate, themeMode, setThemeMode])
}
