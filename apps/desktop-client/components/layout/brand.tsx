export default function Brand({ className }: { className: string }) {
  return (
    <h1 className={`${className} header-font select-none`}>
      <span className={'text-red-500'}>เรียน</span>
      <span className={'text-purple-500'}>อะไร</span>
    </h1>
  )
}
