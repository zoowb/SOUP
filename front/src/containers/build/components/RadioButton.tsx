'use client'

import { getSpringBootVersionsAPI } from '@/apis/build'
import * as styles from '@/containers/build/styles/radioButton.css'
import { RadioProps } from '@/types/radio'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useEffect, useState } from 'react'
import { useMutation, useStorage } from '../../../../liveblocks.config'
import { Versions } from '../types/buildFile'

export function RadioButton({ checked, label }: RadioProps) {
  return (
    <label className={styles.default}>
      <Radio
        checked={checked}
        value={label}
        name="radio-buttons"
        inputProps={{ 'aria-label': `${label}` }}
      />
      {label}
    </label>
  )
}

export function RadioButtonGroup() {
  const [versions, setVersions] = useState<Versions>([])
  const data = useStorage((root) => root.build)

  const handleChange = useMutation(({ storage }, e) => {
    storage.get('build')?.set('version', e.target.value)
  }, [])

  const getVersions = async () => {
    const res = await getSpringBootVersionsAPI()
    setVersions(res.result)
  }

  useEffect(() => {
    getVersions()
  }, [])

  return (
    <RadioGroup
      row
      value={data?.version}
      defaultValue="3.3.0-SNAPSHOT"
      name="radio-buttons-group"
      onChange={handleChange}
    >
      {versions.length > 0
        ? versions.map((item) => (
            <FormControlLabel
              key={crypto.randomUUID()}
              value={item.version}
              control={<Radio />}
              label={item.version}
            />
          ))
        : null}
    </RadioGroup>
  )
}
