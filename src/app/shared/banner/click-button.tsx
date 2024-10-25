'use client'
import { useMainBanner } from '@/app/store'
import Button from '../Button'
import { countClick } from './action/count-click'

const ClickButton = () => {
  const { setShowBanner, isDisabledMainBtn } = useMainBanner()
  const handleCounter = () => {
    setShowBanner(false)
    countClick('main')
  }

  return (
    <div className="w-1/3">
      <Button onClick={handleCounter} disabled={isDisabledMainBtn}>
        Закрыть
      </Button>
    </div>
  )
}
export default ClickButton
