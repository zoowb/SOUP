import React from 'react'

type Fill = {
  color: string
}

export default function FilterIcon({ color }: Fill) {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.22222 10H9.77778V8.33333H6.22222V10ZM0 0V1.66667H16V0H0ZM2.66667 5.83333H13.3333V4.16667H2.66667V5.83333Z"
        fill={color}
      />
    </svg>
  )
}
