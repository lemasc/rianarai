import Image from 'next/image'

interface HeaderProps {
  className?: string
}

export default function HeaderComponent({ className }: HeaderProps): JSX.Element {
  return (
    <header className={'pt-10 w-full font-light text-sm flex flex-col items-center ' + className}>
      <div title="RianArai" className="flex flex-row items-center">
        <img src="/logo.png" width={60} height={60} />
        <h1 className={'px-4 text-4xl header-font select-none'}>
          <span className={'text-red-500'}>เรียน</span>
          <span className={'text-purple-500'}>อะไร</span>
        </h1>
      </div>
      <span className="p-4 text-center">เข้าเรียนทุกวิชาได้จากทีนี่ที่เดียว</span>
    </header>
  )
}
