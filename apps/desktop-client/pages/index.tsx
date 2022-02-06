import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import Title from '@/components/layout/brand'
import { useAuth } from '@rianarai/ui-shared/context/auth'

const Dashboard = dynamic(() => import('@/components/dashboard'))
const MetaDataComponent = dynamic(() => import('@/components/auth/meta'))
const SignInComponent = dynamic(() => import('@/components/auth/gSignIn'))

interface SPAProps {
  children: ReactNode
  title?: string
  desc?: string
}

function MultiComponent(props: SPAProps): JSX.Element {
  return (
    <>
      <div className="py-6 px-10 w-full border-b dark:border-gray-600">
        {props.title && (
          <h2 className="text-2xl md:text-3xl font-bold py-4 creative-font">{props.title}</h2>
        )}
        {props.desc && <span className="py-4 font-light">{props.desc}</span>}
      </div>
      <div className="w-full py-6 px-10">{props.children}</div>
    </>
  )
}

function MainPage(): JSX.Element {
  const { ready, user, metadata } = useAuth()
  return (
    <>
      {ready &&
        (user && metadata ? (
          <Dashboard />
        ) : (
          <div
            className={
              'h-full ' +
              (ready ? (metadata ? 'justify-center' : 'flex flex-col justify-end items-end ') : '')
            }
          >
            <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white text-black border shadow-xl w-full md:max-w-2/5 dark:border-gray-600">
              <div className="flex-grow flex flex-col justify-end md:justify-between">
                <div className="bg-white rounded-t-md md:rounded-t-none flex flex-col pt-8 md:flex-grow md:justify-center">
                  <div className="flex flex-row gap-4 items-center px-10">
                    <div className="w-14 h-14 md:w-auto md:h-auto">
                      <img alt="Logo" src="/logo.svg" width={60} height={60} draggable={false} />
                    </div>
                    <Title className="text-3xl" />
                  </div>
                  {user ? (
                    <>
                      <MultiComponent
                        title={`สวัสดี ${user.displayName}`}
                        desc="กรอกข้อมูลอีกเล็กน้อยเพือลงทะเบียนให้เสร็จสิ้น"
                      >
                        <MetaDataComponent minUI={true} />
                      </MultiComponent>
                    </>
                  ) : (
                    <MultiComponent
                      title="ยินดีต้อนรับ"
                      desc="เข้าสู่ระบบเพื่อแสดงข้อมูลในรายวิชา จัดการงานที่ได้รับมอบหมาย และอื่น ๆ "
                    >
                      <SignInComponent />
                    </MultiComponent>
                  )}
                </div>

                <div className="bg-white text-center sarabun-font py-4 text-sm">
                  Version 3.0.0-beta.2
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default MainPage
