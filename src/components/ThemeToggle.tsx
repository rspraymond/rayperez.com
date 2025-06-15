import { IconButton, Tooltip } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useTheme } from '../contexts/useTheme'

const ThemeToggle: React.FC = () => {
  const { themeMode, setThemeMode } = useTheme()

  const handleToggle = () => {
    const nextMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(nextMode)
  }

  const getIcon = () => {
    return themeMode === 'light' ? <LightModeIcon /> : <DarkModeIcon />
  }

  const getTooltip = () => {
    return themeMode === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
  }

  return (
    <Tooltip title={getTooltip()}>
      <IconButton
        onClick={handleToggle}
        color='inherit'
        aria-label={`Current theme: ${themeMode}. ${getTooltip()}`}
      >
        {getIcon()}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
