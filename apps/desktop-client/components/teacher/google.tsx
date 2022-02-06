import { Teacher } from '@rianarai/classroom'

export default function GoogleBadge({ teacher }: { teacher?: Teacher }) {
  return teacher && teacher.displayName && teacher.source === 'google' ? (
    <span className="text-gray-500" title={`เชื่อมต่อกับบัญชี Google แล้ว (${teacher.name})`}>
      <img alt="Classroom" className="-mt-1 mr-2 inline" src="/google.svg" width={15} height={15} />
      {teacher.name}
    </span>
  ) : null
}
