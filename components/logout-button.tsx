import { logout } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface LogoutButtonProps {
  collapsed?: boolean
}

export function LogoutButton({ collapsed = false }: LogoutButtonProps) {
  return (
    <form action={logout}>
      <Button
        variant="ghost"
        size="sm"
        className={`hover:bg-white/10 ${collapsed ? "w-full justify-center px-0" : ""}`}
        title={collapsed ? "Logout" : undefined}
      >
        <LogOut className={`h-4 w-4 ${!collapsed ? "mr-2" : ""}`} />
        {!collapsed && "Logout"}
      </Button>
    </form>
  )
}
