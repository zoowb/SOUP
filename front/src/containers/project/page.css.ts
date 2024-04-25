import { style } from '@vanilla-extract/css'
import vars from '@/styles/variables.css'

export const container = style({
  width: '100%',
  height: '100%',
  overflow: 'auto',
  '::-webkit-scrollbar':{
    width: vars.space.tiny,
  },
  '::-webkit-scrollbar-thumb':{
    height: '5%',
    background: '#D3D3D3',
  },
})

export const content = style({
  padding: `calc( ${vars.space.xLarge} + ${vars.space.base} ) ${vars.space.base} 0 calc( ${vars.space.xxLarge} + ${vars.space.base} )`,
})
