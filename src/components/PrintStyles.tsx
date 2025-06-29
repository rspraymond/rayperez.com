import React from 'react'
import { GlobalStyles } from '@mui/material'

const PrintStyles: React.FC = () => {
  return (
    <GlobalStyles
      styles={{
        '@media print': {
          '@page': {
            margin: '0.4in',
            size: 'letter',
          },

          '*': {
            WebkitPrintColorAdjust: 'exact !important',
            colorAdjust: 'exact !important',
          },

          body: {
            margin: 0,
            padding: 0,
            backgroundColor: 'white !important',
            color: '#333 !important',
            fontSize: '9pt',
            lineHeight: '1.1',
            fontFamily: 'Arial, sans-serif !important',
          },

          '#root': {
            maxWidth: 'none !important',
            margin: '0 !important',
            padding: '0 !important',
            textAlign: 'left !important',
          },

          // Hide web-specific content that doesn't belong on resume
          '[data-testid="recent-posts"], [data-testid="bookmarked-posts"], [data-testid="achievements"]':
            {
              display: 'none !important',
            },

          // Hide interactive elements except links
          '.MuiIconButton-root, .MuiToggleButton-root, .MuiFab-root, [role="button"]:not([role="link"]):not(.MuiButton-root)':
            {
              display: 'none !important',
            },

          // Style link buttons for print
          '.MuiButton-root': {
            backgroundColor: 'transparent !important',
            border: 'none !important',
            boxShadow: 'none !important',
            textTransform: 'none !important',
            fontSize: '8pt !important',
            padding: '0 !important',
            margin: '0 2pt !important',
            minWidth: 'auto !important',
            display: 'inline !important',
          },

          // Hide decorative elements
          '.MuiChip-root, [aria-label="toggle"], .MuiDivider-root': {
            display: 'none !important',
          },

          // Ultra-compact typography
          h1: {
            fontSize: '14pt !important',
            fontWeight: 'bold !important',
            color: '#2c3e50 !important',
            marginBottom: '2pt !important',
            marginTop: '0 !important',
            borderBottom: '0.5pt solid #2c3e50 !important',
            paddingBottom: '1pt !important',
            pageBreakAfter: 'avoid',
          },

          h2: {
            fontSize: '11pt !important',
            fontWeight: 'bold !important',
            color: '#34495e !important',
            marginTop: '4pt !important',
            marginBottom: '1pt !important',
            pageBreakAfter: 'avoid',
            textTransform: 'uppercase',
            letterSpacing: '0.2pt',
          },

          h3: {
            fontSize: '10pt !important',
            fontWeight: 'bold !important',
            color: '#2c3e50 !important',
            marginTop: '2pt !important',
            marginBottom: '0pt !important',
            pageBreakAfter: 'avoid',
          },

          'h4, h5, h6': {
            fontSize: '10pt !important',
            fontWeight: 'bold !important',
            color: '#2c3e50 !important',
            marginTop: '2pt !important',
            marginBottom: '1pt !important',
            pageBreakAfter: 'avoid',
          },

          // Minimal text styling
          'p, li': {
            color: '#333 !important',
            fontSize: '9pt !important',
            lineHeight: '1.1 !important',
            marginBottom: '0pt !important',
            marginTop: '0 !important',
            orphans: 3,
            widows: 3,
          },

          // Ultra-compact layout
          '.MuiContainer-root': {
            maxWidth: 'none !important',
            padding: '0 !important',
            margin: '0 !important',
          },

          '.MuiGrid-container': {
            display: 'flex !important',
            flexDirection: 'column !important',
            width: '100% !important',
          },

          // Main content area - show first
          '.MuiGrid-item:last-of-type': {
            order: 1,
            width: '100% !important',
            maxWidth: '100% !important',
            marginBottom: '6pt !important',
          },

          // Sidebar/contact section - show at bottom
          '.MuiGrid-item:first-of-type': {
            order: 2,
            width: '100% !important',
            maxWidth: '100% !important',
            marginBottom: '4pt !important',
            borderTop: '0.25pt solid #ddd !important',
            paddingTop: '4pt !important',
          },

          // Minimal profile card
          '[data-testid="profile-card-component"]': {
            display: 'flex !important',
            flexDirection: 'row !important',
            alignItems: 'center !important',
            justifyContent: 'flex-start !important',
            margin: '0 !important',
            padding: '0 !important',
            pageBreakInside: 'avoid',
          },

          // Tiny profile image
          '.MuiAvatar-root': {
            width: '30pt !important',
            height: '30pt !important',
            marginRight: '6pt !important',
          },

          // Remove all paper styling
          '.MuiPaper-root': {
            backgroundColor: 'transparent !important',
            boxShadow: 'none !important',
            border: 'none !important',
            marginBottom: '3pt !important',
            padding: '0 !important',
            pageBreakInside: 'avoid',
          },

          // Minimal links
          a: {
            color: '#2980b9 !important',
            textDecoration: 'none !important',
            fontSize: '8pt !important',
          },

          'a[href^="mailto:"]:after, a[href^="tel:"]:after': {
            content: '""',
          },

          // Hide URLs to save space
          'a[href^="http"]:after': {
            content: '""',
          },

          // Minimal lists
          ul: {
            paddingLeft: '8pt !important',
            marginBottom: '1pt !important',
            marginTop: '0pt !important',
          },

          li: {
            marginBottom: '0pt !important',
            pageBreakInside: 'avoid',
          },

          // Ultra-compact experience entries
          '[data-testid*="experience"]': {
            marginBottom: '3pt !important',
            pageBreakInside: 'avoid',
          },

          // Limit experience bullet points to save space
          '[data-testid*="experience"] ul li:nth-child(n+3)': {
            display: 'none !important',
          },

          // Skills in horizontal layout
          '[data-testid*="skills"]': {
            marginBottom: '3pt !important',
          },

          '[data-testid*="skills"] ul': {
            display: 'flex !important',
            flexWrap: 'wrap !important',
            gap: '4pt !important',
            paddingLeft: '0 !important',
          },

          '[data-testid*="skills"] li': {
            listStyle: 'none !important',
            display: 'inline-block !important',
            marginRight: '4pt !important',
            marginBottom: '0 !important',
            fontSize: '8pt !important',
          },

          // Compact links section - horizontal layout
          '[data-testid*="links"] ul': {
            display: 'flex !important',
            flexWrap: 'wrap !important',
            gap: '6pt !important',
            paddingLeft: '0 !important',
          },

          '[data-testid*="links"] li': {
            listStyle: 'none !important',
            display: 'inline-block !important',
            marginRight: '6pt !important',
            marginBottom: '0 !important',
          },

          // Minimal code styling
          code: {
            backgroundColor: '#f8f9fa !important',
            padding: '0.25pt 0.5pt !important',
            fontSize: '8pt !important',
            border: 'none !important',
            borderRadius: '0pt !important',
          },

          // Minimal header
          header: {
            marginBottom: '2pt !important',
            pageBreakInside: 'avoid',
          },

          // Minimal contact info
          '.contact-info': {
            fontSize: '8pt !important',
            lineHeight: '1.1 !important',
          },

          // Minimal date styling
          '.duration, .date': {
            fontSize: '8pt !important',
            color: '#666 !important',
            fontStyle: 'italic !important',
          },

          // Company names
          '.company, .school': {
            fontWeight: 'bold !important',
            color: '#2c3e50 !important',
          },

          // Style Typography variants for print
          '.MuiTypography-root': {
            marginBottom: '0pt !important',
            marginTop: '0 !important',
          },

          // Style subtitle variants (company names, durations)
          '.MuiTypography-subtitle1': {
            fontSize: '9pt !important',
            fontWeight: 'normal !important',
            color: '#666 !important',
            fontStyle: 'italic !important',
            marginBottom: '1pt !important',
          },

          // Style h5 variant (job titles)
          '.MuiTypography-h5': {
            fontSize: '10pt !important',
            fontWeight: 'bold !important',
            color: '#2c3e50 !important',
            marginBottom: '1pt !important',
          },

          // Force minimal Box components
          '.MuiBox-root': {
            marginBottom: '1pt !important',
          },

          // Compact summary - limit to 2 lines
          '[data-testid*="summary"]': {
            marginBottom: '4pt !important',
          },

          '[data-testid*="summary"] p': {
            lineHeight: '1.2 !important',
            overflow: 'hidden !important',
            textOverflow: 'ellipsis !important',
            display: '-webkit-box !important',
            WebkitLineClamp: '3 !important',
            WebkitBoxOrient: 'vertical !important',
          },

          // Two-column layout for experience to save space
          '.experience-grid': {
            display: 'grid !important',
            gridTemplateColumns: '1fr 1fr !important',
            gap: '6pt !important',
            marginBottom: '4pt !important',
          },

          // Make education super compact
          '[data-testid*="education"]': {
            marginBottom: '2pt !important',
          },

          // Hide education details to save space
          '[data-testid*="education"] p:not(:first-child)': {
            display: 'none !important',
          },
        },
      }}
    />
  )
}

export default PrintStyles
