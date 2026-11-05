import React from 'react'
import { Box, Typography } from '@mui/material'
import { DATES_SX, ITEM_TITLE_SX, META_SX } from '../styles/sectionStyles'

interface ItemHeaderProps {
  title: string
  detail: string
  dates: string
}

/** Title and detail on the left, dates on the right; flex wrap drops the dates below on narrow screens. */
const ItemHeader: React.FC<ItemHeaderProps> = ({ title, detail, dates }) => (
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      columnGap: 2,
      rowGap: 0.5,
    }}
  >
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 1.5 }}>
      <Typography component='h3' sx={ITEM_TITLE_SX}>
        {title}
      </Typography>
      <Typography component='span' sx={META_SX}>
        {detail}
      </Typography>
    </Box>
    <Typography component='span' sx={DATES_SX}>
      {dates}
    </Typography>
  </Box>
)

export default ItemHeader
