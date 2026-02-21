"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch by waiting for mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-5" /> // Placeholder to avoid layout shift
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch
        id="theme-mode"
        checked={isDark}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light")
        }}
        aria-label="Toggle theme"
      />
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}