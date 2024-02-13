'use client'
import { useEffect, useState } from 'react'
import Button from '../Button'
import { useMainBanner } from '@/app/store'
import countClick from './action/count-click'

const ClickButton = () => {
  const { setShowBanner, isDisabledMainBtn } = useMainBanner()
  const handleCounter = () => {
    setShowBanner(false)
    countClick('main')
  }

  return (
    <div className="w-1/3">
      <Button onClick={handleCounter} disabled={isDisabledMainBtn}>
        Нажми меня
      </Button>
    </div>
  )
}
export default ClickButton
