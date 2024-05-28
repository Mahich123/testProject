
"use client"
import { createGoogleAuthorizationURL } from "@/lib/authentication";

export default function Component() {
  const googleAuth = async () => {
    const res = await createGoogleAuthorizationURL();

    if (res.error) {
      return res.error;
    } else if (res.success) {
      window.location.href = res.data.toString();
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Sign in to weshrink
          </h2>
        </div>
        <button
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
          type="button"
          onClick={googleAuth}
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-600 dark:group-hover:text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
            </svg>
          </span>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
