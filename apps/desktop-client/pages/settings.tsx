import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'

import MetadataComponent from '@/components/auth/meta'
import Title from '@/components/layout/title'
import { useAuth } from '@rianarai/ui-shared/context/auth'
import Brand from '@/components/layout/brand'

type Screen = 'account' | 'classroom' | 'program' | 'about' | 'signout'

type Navigation = {
  title: string
  render?: JSX.Element
  onClick?: () => void
}

export default function SettingsPage(): JSX.Element {
  const { signOut } = useAuth()
  const [currentScreen, setScreen] = useState<Screen>('account')
  const [success, setSuccess] = useState<boolean>(false)
  useEffect(() => {
    if (success) setTimeout(() => setSuccess(false), 3000)
  }, [success])

  function getOs() {
    const ua = navigator?.userAgent ?? ''
    return ua.slice(ua.indexOf('(') + 1, ua.indexOf(')'))
  }
  function getMode() {
    return window && window.location.protocol === 'https:' ? 'Online' : 'Bundle'
  }
  const navigation: Record<string, Navigation> = {
    account: {
      title: 'บัญชี',
      render: (
        <div className="flex flex-col gap-4">
          <h2 className="font-medium text-2xl">ข้อมูลส่วนตัว</h2>
          <MetadataComponent onSubmit={() => console.log('Saved')} />
        </div>
      ),
    },
    /*   classroom: {
      title: 'ข้อมูล Classroom',
      render: <></>,
    },
    program: {
      title: 'ตั้งค่าโปรแกรม',
    },*/
    about: {
      title: 'เกี่ยวกับ RianArai',
      render: (
        <>
          <div className="flex flex-row gap-6 items-center">
            <img src="/logo.svg" draggable={false} width={75} height={75} alt="Logo" />
            <div className="flex flex-col gap-2">
              <Brand className="text-3xl" />
              <span className="text-sm font-light text-gray-500">
                เครื่องมือเดียวสำหรับการเรียนออนไลน์
              </span>
            </div>
          </div>
          <div className="form-container">
            <span>เวอร์ชั่น:</span>
            <span>3.0.0-beta.2</span>
            <span>เวอร์ชั่นไคลเอนท์:</span>
            <span>{process.env.CLIENT_VERSION}</span>
            <span>เวอร์ชั่น Electron:</span>
            <span>{process.versions['electron']}</span>
            <span>แชนแนลของบิวด์:</span>
            <span>Insider</span>
            <span>ซอร์สของบิวด์:</span>
            <span>{getMode()}</span>
            <span>ระบบปฎิบัติการ:</span>
            <span>{getOs()}</span>
          </div>
        </>
      ),
    },
    signout: { title: 'ออกจากระบบ', onClick: () => signOut() },
  }
  return (
    <>
      <Title>
        <h2>การตั้งค่า</h2>
      </Title>
      <div className="flex flex-row py-4 divide-x">
        <div className="flex flex-col w-2/5 max-w-xs" style={{ maxWidth: '15rem' }}>
          {Object.entries(navigation).map(([screen, n]) => (
            <button
              title={n.title}
              onClick={() => (n.onClick ? n.onClick() : setScreen(screen as Screen))}
              key={screen}
              className={`hover:opacity-75 px-2 py-3 ${
                screen === currentScreen ? 'font-medium' : 'opacity-60'
              } text-left`}
            >
              {n.title}
            </button>
          ))}
        </div>
        <div className="px-8 py-4 font-light flex flex-col gap-8">
          {navigation[currentScreen].render}
        </div>
      </div>
      <Transition
        show={success}
        enter="ease-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-500"
        leaveFrom="opactity-100"
        leaveTo="opacity-0"
      >
        <div className="px-4 py-3 rounded-lg bg-green-200 text-green-700">
          บันทึกการตั้งค่าเสร็จสิ้น
        </div>
      </Transition>
    </>
  )
}
