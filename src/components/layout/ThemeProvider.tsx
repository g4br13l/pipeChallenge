import { ReactNode } from "react"


type ThemeT = 'dark' | 'light' | 'system'

type ThemeProviderPropsT = {
  children: ReactNode
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderPropsT) {

  const root = window.document.documentElement
  root.classList.remove('light', 'dark', 'system')
  const systemTheme: ThemeT = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
  root.classList.add(systemTheme)


  return (
    <div className="h-svh" {...props}>
      {children}
    </div>
  )
}
