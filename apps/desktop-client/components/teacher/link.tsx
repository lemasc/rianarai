import { Teacher } from '@rianarai/classroom'
import { Map } from 'immutable'
import { useForm } from 'react-hook-form'

export default function TeacherNotFound({
  notAssigned,
  onSubmit,
}: {
  notAssigned: Map<string, Teacher>
  onSubmit: (userId: string) => void
}) {
  const { handleSubmit, register } = useForm<Teacher>()
  return (
    <>
      <p className="font-light">
        กรุณาเลือกครูผู้สอนที่ต้องการเชื่อมต่อกับบัญชี Google นี้
        คุณสามารถแก้ไขข้อมูลเหล่านี้ได้ในภายหลัง
      </p>
      <form
        onSubmit={handleSubmit((d) => onSubmit(d.userId.toString()))}
        className="sarabun-font flex flex-col gap-4"
      >
        <select
          className="rounded focus:ring-purple-500"
          {...register('userId', {
            required: true,
          })}
        >
          <option value="">กรุณาเลือก...</option>
          {notAssigned
            ?.map((c) => (
              <option value={c.id} key={c.id}>
                {c.subject} - {c.name}
              </option>
            ))
            .toList()
            .toArray()}
        </select>
        <button
          type="submit"
          className="kanit-font rounded-lg text-sm btn bg-apple-500 from-apple-600 to-apple-600 ring-apple-500 px-4 py-3 text-white"
        >
          บันทึก
        </button>
      </form>
    </>
  )
}
