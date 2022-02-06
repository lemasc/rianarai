import { useAuth } from '@rianarai/ui-shared/context/auth'
import { useState } from 'react'
export default function GoogleSignInComponent() {
  const [error, setError] = useState(false)
  const { signInWithGoogle } = useAuth()

  return (
    <div className="flex flex-col gap-4 font-light items-center justify-center text-center">
      <button
        onClick={() => {
          setError(false)
          signInWithGoogle().catch(() => setError(true))
        }}
        className="text-gray-600 login-btn w-full border shadow px-4 py-3 rounded hover:bg-gray-100 bg-gray-50"
      >
        <img
          alt="Google"
          width={20}
          height={20}
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        />
        <span className="ml-4 -pt-1">Sign in with Google</span>
      </button>
      <span className="text-gray-500 dark:text-gray-200">
        ใช้บัญชีหลักที่เชื่อมต่อกับ Google Classroom
      </span>

      <span className="text-center text-sm text-gray-400">
        ระบบอาจแสดงหน้าจอคำยินยอมในการเข้าถึงข้อมูล (Consent) <br />
        <a
          className="underline text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-600"
          href="https://rianarai.netlify.app/docs/classroom"
          target="_blank"
          rel="noreferrer noopener"
        >
          เรียนรู้เพิ่มเติมเกี่ยวกับสิทธิต่าง ๆ ที่ใช้
        </a>
      </span>
      {error && (
        <span className="font-normal text-red-600 mt-4">
          การเข้าสู่ระบบล้มเหลว กรุณาเข้าสู่ระบบใหม่อีกครั้ง
        </span>
      )}
    </div>
  )
}
