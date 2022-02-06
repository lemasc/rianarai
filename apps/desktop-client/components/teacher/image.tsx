import { Teacher } from '@rianarai/classroom'
import { useAuth } from '@rianarai/ui-shared/context/auth'
import { ComponentProps, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

export default function TeacherImage({
  teacher,
  alt,
  className,
  ...rest
}: { teacher?: Teacher } & Exclude<ComponentProps<'img'>, 'src'>) {
  const [__error, setError] = useState(false)
  const error = (teacher && !teacher.photoUrl) || __error
  const skeleton = teacher === undefined
  return (
    <>
      {(error || skeleton) && (
        <div className={`${error ? 'bg-gray-200' : ''} rounded-full ${className}`}>
          {skeleton && <Skeleton width={rest.width} height={rest.height} circle={true} />}
        </div>
      )}
      {!error && teacher?.photoUrl && (
        <img
          draggable={false}
          alt={alt}
          onLoad={() => setError(false)}
          onError={() => setError(true)}
          src={teacher ? teacher.photoUrl : undefined}
          referrerPolicy="no-referrer"
          {...rest}
          className={`${skeleton ? 'hidden' : ''} bg-gray-100 rounded-full ${className}`}
        />
      )}
    </>
  )
}
