"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/contexts/themeContext"
import { useSidebar } from "@/components/dashboard-layout-controller"
import {
  Users, UserPlus, Mail, Crown, Shield, Eye,
  Copy, Check, Trash2,
  Search, X, Clock, Zap, Key, Lock, Send, AlertTriangle,
  ChevronDown, MoreVertical, RefreshCw,
} from "lucide-react"
import type { DashboardUser } from "@/types/dashboard-user"

interface TeamPageProps { user: DashboardUser }

type Role = "owner" | "admin" | "developer" | "viewer"
type MemberStatus = "active" | "pending" | "suspended"

interface Member {
  id: string; name: string; email: string; role: Role
  status: MemberStatus; joinedAt: string; lastActive: string
  avatarColor: string; apiAccess: boolean
}
interface Invite {
  id: string; email: string; role: Role; sentAt: string; expiresAt: string
}

const ROLE_CFG: Record<Role, { label: string; color: string; bg: string; icon: any; perms: string[] }> = {
  owner:     { label:"Owner",     color:"#f59e0b", bg:"rgba(245,158,11,0.1)",  icon:Crown,  perms:["Full access","Billing","Delete team","All API keys"] },
  admin:     { label:"Admin",     color:"#6366f1", bg:"rgba(99,102,241,0.1)",  icon:Shield, perms:["Manage members","API keys","Models","Settings"] },
  developer: { label:"Developer", color:"#10b981", bg:"rgba(16,185,129,0.1)",  icon:Zap,    perms:["API keys (read)","Models","Usage stats"] },
  viewer:    { label:"Viewer",    color:"#71717a", bg:"rgba(113,113,122,0.1)", icon:Eye,    perms:["Usage stats (read-only)","Model list"] },
}

const MEMBERS: Member[] = [
  { id:"1", name:"Alex Thornton", email:"alex@company.io",   role:"owner",     status:"active",    joinedAt:"Jan 12, 2024", lastActive:"Just now",   avatarColor:"#6366f1", apiAccess:true  },
  { id:"2", name:"Priya Nambiar", email:"priya@company.io",  role:"admin",     status:"active",    joinedAt:"Feb 3, 2024",  lastActive:"2 hrs ago",  avatarColor:"#ec4899", apiAccess:true  },
  { id:"3", name:"James Wu",      email:"james@company.io",  role:"developer", status:"active",    joinedAt:"Mar 18, 2024", lastActive:"Yesterday",  avatarColor:"#10b981", apiAccess:true  },
  { id:"4", name:"Sofia Reyes",   email:"sofia@company.io",  role:"developer", status:"active",    joinedAt:"Apr 5, 2024",  lastActive:"3 days ago", avatarColor:"#f59e0b", apiAccess:false },
  { id:"5", name:"Marcus Bell",   email:"marcus@company.io", role:"viewer",    status:"active",    joinedAt:"May 22, 2024", lastActive:"1 week ago", avatarColor:"#06b6d4", apiAccess:false },
  { id:"6", name:"Dana Kristoff", email:"dana@company.io",   role:"developer", status:"suspended", joinedAt:"Jun 1, 2024",  lastActive:"2 wks ago",  avatarColor:"#8b5cf6", apiAccess:false },
]
const INVITES: Invite[] = [
  { id:"i1", email:"noah@startup.com", role:"developer", sentAt:"2 days ago", expiresAt:"5 days" },
  { id:"i2", email:"chen@agency.io",   role:"admin",     sentAt:"1 day ago",  expiresAt:"6 days" },
]

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, color, size = 40 }: { name: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, flexShrink: 0, borderRadius: "50%",
      background: `color-mix(in srgb,${color} 18%,transparent)`,
      border: `1.5px solid color-mix(in srgb,${color} 35%,transparent)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, fontWeight: 900, color,
      letterSpacing: "-0.02em",
    }}>
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

// ─── Role badge ───────────────────────────────────────────────────────────────
function RoleBadge({ role, small }: { role: Role; small?: boolean }) {
  const c = ROLE_CFG[role]
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: small ? "2px 7px" : "4px 10px",
      background: c.bg, color: c.color, borderRadius: 4,
      fontSize: small ? 10 : 11, fontWeight: 700, letterSpacing: "0.04em",
      border: `1px solid color-mix(in srgb,${c.color} 22%,transparent)`,
    }}>
      <c.icon size={small ? 9 : 10} />
      {c.label}
    </span>
  )
}

// ─── Role dropdown ────────────────────────────────────────────────────────────
function RoleSelect({ current, onChange, disabled, surface, border, isDark, muted }: {
  current: Role; onChange: (r: Role) => void; disabled?: boolean
  surface: string; border: string; isDark: boolean; muted: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => !disabled && setOpen(o => !o)}
        disabled={disabled}
        style={{
          display: "flex", alignItems: "center", gap: 5,
          padding: "4px 8px 4px 6px",
          background: "transparent",
          border: `1px solid ${border}`, borderRadius: 6,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <RoleBadge role={current} small />
        {!disabled && <ChevronDown size={10} style={{ color: muted }} />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 100 }} onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.13 }}
              style={{
                position: "absolute", top: "calc(100% + 5px)", left: 0, zIndex: 101,
                background: surface, border: `1px solid ${border}`, borderRadius: 10,
                boxShadow: isDark ? "0 16px 48px rgba(0,0,0,0.75)" : "0 16px 48px rgba(0,0,0,0.14)",
                minWidth: 205, overflow: "hidden",
              }}
            >
              {(["admin", "developer", "viewer"] as Role[]).map(r => {
                const rc = ROLE_CFG[r]
                const isActive = current === r
                return (
                  <button
                    key={r}
                    onClick={() => { onChange(r); setOpen(false) }}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 10,
                      padding: "11px 14px",
                      background: isActive ? rc.bg : "transparent",
                      border: "none", cursor: "pointer", textAlign: "left",
                      borderLeft: `2px solid ${isActive ? rc.color : "transparent"}`,
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent" }}
                  >
                    <div style={{
                      width: 28, height: 28, flexShrink: 0, borderRadius: 6,
                      background: rc.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <rc.icon size={13} style={{ color: rc.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: rc.color }}>{rc.label}</div>
                      <div style={{ fontSize: 11, color: muted }}>{rc.perms[0]}</div>
                    </div>
                  </button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Invite modal (bottom sheet) ──────────────────────────────────────────────
function InviteModal({ onClose, surface, border, text, muted, isDark }: {
  onClose: () => void; surface: string; border: string
  text: string; muted: string; isDark: boolean
}) {
  const [email, setEmail]     = useState("")
  const [role, setRole]       = useState<Role>("developer")
  const [message, setMessage] = useState("")
  const [sent, setSent]       = useState(false)

  const handleSend = () => {
    if (!email.trim()) return
    setSent(true)
    setTimeout(onClose, 1800)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 300 }}
        style={{ width: "100%", maxWidth: 560, background: surface, borderRadius: "14px 14px 0 0", overflow: "hidden" }}
      >
        {/* drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
          <div style={{ width: 36, height: 4, background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" }} />
        </div>

        {/* header */}
        <div style={{ padding: "16px 24px 14px", display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: `1px solid ${border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36,
              background: "color-mix(in srgb,var(--color-primary) 14%,transparent)",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <UserPlus size={16} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: text, letterSpacing: "-0.03em" }}>Invite teammate</div>
              <div style={{ fontSize: 12, color: muted }}>They'll get an email with a join link</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: muted, padding: 4 }}>
            <X size={15} />
          </button>
        </div>

        <div style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* email */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: muted, marginBottom: 8 }}>
              Email address
            </div>
            <div style={{ display: "flex", border: `1px solid ${border}`, overflow: "hidden" }}>
              <div style={{ padding: "0 12px", height: 44, display: "flex", alignItems: "center",
                borderRight: `1px solid ${border}`,
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}>
                <Mail size={14} style={{ color: muted }} />
              </div>
              <input
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="colleague@company.com"
                style={{ flex: 1, height: 44, padding: "0 14px", background: "transparent",
                  border: "none", outline: "none", fontSize: 14, color: text, fontFamily: "inherit" }}
              />
            </div>
          </div>

          {/* role grid */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: muted, marginBottom: 10 }}>
              Role
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {(["admin", "developer", "viewer"] as Role[]).map(r => {
                const c = ROLE_CFG[r]; const active = role === r
                return (
                  <button key={r} onClick={() => setRole(r)}
                    style={{
                      padding: "13px 10px",
                      background: active ? c.bg : (isDark ? "#0f0f12" : "#f8f8f8"),
                      border: "none", cursor: "pointer", textAlign: "left",
                      borderTop: `2px solid ${active ? c.color : "transparent"}`,
                      transition: "all 0.14s",
                    }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: active ? c.color : muted,
                      marginBottom: 3, display: "flex", alignItems: "center", gap: 5 }}>
                      <c.icon size={11} /> {c.label}
                    </div>
                    <div style={{ fontSize: 10, color: muted, lineHeight: 1.4 }}>{c.perms[0]}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* message */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: muted, marginBottom: 8 }}>
              Message <span style={{ fontWeight: 400, opacity: 0.6, textTransform: "none" }}>(optional)</span>
            </div>
            <textarea
              value={message} onChange={e => setMessage(e.target.value)} rows={3}
              placeholder="Hey! Join our team to access shared API keys..."
              style={{ width: "100%", padding: "10px 14px", background: "transparent",
                border: `1px solid ${border}`, borderRadius: 8, outline: "none", resize: "none",
                fontSize: 13, color: text, fontFamily: "inherit", lineHeight: 1.6, boxSizing: "border-box" }}
            />
          </div>

          <motion.button
            onClick={handleSend} whileTap={{ scale: 0.97 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "13px 20px",
              background: sent ? "#10b981" : "var(--color-primary)",
              border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
              borderRadius: 8, transition: "background 0.2s" }}
          >
            {sent ? <><Check size={14} /> Invite sent!</> : <><Send size={14} /> Send invite</>}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Member Card ──────────────────────────────────────────────────────────────
function MemberCard({ member, onRoleChange, onRemove, onToggleAccess, onToggleSuspend, isDark, card, border, text, muted, subtle }: {
  member: Member
  onRoleChange: (id: string, r: Role) => void
  onRemove: (id: string) => void
  onToggleAccess: (id: string) => void
  onToggleSuspend: (id: string) => void
  isDark: boolean; card: string; border: string; text: string; muted: string; subtle: string
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isOwner = member.role === "owner"
  const isSusp  = member.status === "suspended"

  return (
    <div style={{
      background: isSusp ? (isDark ? "rgba(239,68,68,0.04)" : "rgba(239,68,68,0.02)") : card,
      border: `1px solid ${border}`, borderRadius: 10,
    }}>
      {/* top */}
      <div style={{ padding: "14px 16px 12px", display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <Avatar name={member.name} color={member.avatarColor} size={42} />
          {member.status === "active" && (
            <div style={{ position: "absolute", bottom: -1, right: -1, width: 10, height: 10,
              borderRadius: "50%", background: "#10b981", border: `2px solid ${card}` }} />
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: text, letterSpacing: "-0.02em",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {member.name}
            </div>
            {isOwner && <Crown size={12} style={{ color: "#f59e0b", flexShrink: 0 }} />}
          </div>
          <div style={{ fontSize: 12, color: muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {member.email}
          </div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <RoleSelect
              current={member.role}
              onChange={r => onRoleChange(member.id, r)}
              disabled={isOwner}
              surface={card} border={border} isDark={isDark} muted={muted}
            />
            <span style={{
              fontSize: 10, fontWeight: 700, padding: "2px 8px", letterSpacing: "0.05em", borderRadius: 4,
              background: isSusp ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
              color: isSusp ? "#ef4444" : "#10b981",
              border: `1px solid ${isSusp ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)"}`,
            }}>
              {isSusp ? "Suspended" : "Active"}
            </span>
          </div>
        </div>

        {/* action menu */}
        {!isOwner && (
          <div style={{ position: "relative", flexShrink: 0 }}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent", border: `1px solid ${border}`, borderRadius: 6, cursor: "pointer", color: muted }}
            >
              <MoreVertical size={13} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 100 }} onClick={() => setMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    style={{ position: "absolute", right: 0, top: "calc(100% + 5px)", zIndex: 101,
                      background: card, border: `1px solid ${border}`, borderRadius: 10,
                      boxShadow: isDark ? "0 16px 48px rgba(0,0,0,0.75)" : "0 12px 36px rgba(0,0,0,0.14)",
                      minWidth: 190, overflow: "hidden" }}
                  >
                    {[
                      { label: isSusp ? "Unsuspend" : "Suspend", icon: AlertTriangle, color: "#f59e0b", action: () => { onToggleSuspend(member.id); setMenuOpen(false) } },
                      { label: member.apiAccess ? "Revoke API access" : "Grant API access", icon: Key, color: "#06b6d4", action: () => { onToggleAccess(member.id); setMenuOpen(false) } },
                      { label: "Remove member", icon: Trash2, color: "#ef4444", action: () => { onRemove(member.id) } },
                    ].map(opt => (
                      <button key={opt.label} onClick={opt.action}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "10px 14px",
                          background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
                          fontSize: 12, fontWeight: 600, color: opt.color, transition: "background 0.1s" }}
                        onMouseEnter={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <opt.icon size={13} /> {opt.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* bottom */}
      <div style={{ padding: "10px 16px 13px", display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: `1px solid ${border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => !isOwner && onToggleAccess(member.id)}
            disabled={isOwner}
            style={{ width: 38, height: 20, border: "none", cursor: isOwner ? "not-allowed" : "pointer",
              background: member.apiAccess ? "#10b981" : (isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"),
              position: "relative", transition: "background 0.2s", flexShrink: 0, opacity: isOwner ? 0.5 : 1, borderRadius: 10 }}
          >
            <motion.div
              animate={{ x: member.apiAccess ? 19 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              style={{ position: "absolute", top: 2, width: 16, height: 16, background: "#fff",
                borderRadius: "50%", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
            />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {member.apiAccess
              ? <Key size={11} style={{ color: "#10b981" }} />
              : <Lock size={11} style={{ color: muted }} />}
            <span style={{ fontSize: 12, fontWeight: 600, color: member.apiAccess ? "#10b981" : muted }}>
              API {member.apiAccess ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 6, height: 6, background: member.status === "active" ? "#10b981" : subtle }} />
          <span style={{ fontSize: 11, color: subtle }}>{member.lastActive}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function TeamPage({ user }: TeamPageProps) {
  const { isDark } = useTheme()
  const { sidebarWidth, isMobile } = useSidebar()

  const bg     = isDark ? "#0D0D0F" : "#f4f4f2"
  const card   = isDark ? "#18181c" : "#ffffff"
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)"
  const text   = isDark ? "#f4f4f5" : "#0a0a0b"
  const muted  = isDark ? "#71717a" : "#71717a"
  const subtle = isDark ? "#52525b" : "#a1a1aa"

  const headerLeft = isMobile ? 0 : sidebarWidth

  const [members, setMembers]       = useState<Member[]>(MEMBERS)
  const [invites, setInvites]       = useState<Invite[]>(INVITES)
  const [search, setSearch]         = useState("")
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all")
  const [tab, setTab]               = useState<"members" | "invites" | "permissions">("members")
  const [showInvite, setShowInvite] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
    const matchRole   = roleFilter === "all" || m.role === roleFilter
    return matchSearch && matchRole
  })

  const handleRoleChange    = (id: string, role: Role) => setMembers(ms => ms.map(m => m.id === id ? { ...m, role } : m))
  const handleRemove        = (id: string) => setMembers(ms => ms.filter(m => m.id !== id))
  const handleToggleAccess  = (id: string) => setMembers(ms => ms.map(m => m.id === id ? { ...m, apiAccess: !m.apiAccess } : m))
  const handleToggleSuspend = (id: string) => setMembers(ms => ms.map(m => m.id === id ? { ...m, status: m.status === "suspended" ? "active" : "suspended" } : m))
  const revokeInvite        = (id: string) => setInvites(is => is.filter(i => i.id !== id))

  const copyInviteLink = () => {
    navigator.clipboard.writeText("https://modelsnest.com/invite/tk_abc123xyz")
    setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000)
  }

  const TABS = [
    { id: "members",     label: "Members",    count: members.length },
    { id: "invites",     label: "Pending",    count: invites.length },
    { id: "permissions", label: "Permissions", count: null },
  ]

  return (
    <div style={{ minHeight: "100svh", background: bg }}>

      {/* ── FIXED HEADER ── */}
      <div style={{
        position: "fixed", top: 0, left: headerLeft, right: 0, zIndex: 30, height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: `1px solid ${border}`,
        background: isDark ? "rgba(13,13,15,0.94)" : "rgba(255,255,255,0.94)",
        backdropFilter: "blur(14px)",
        transition: "left 0.28s cubic-bezier(0.25,0.25,0,1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
            <Users size={15} style={{ color: "var(--color-primary)" }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: text, letterSpacing: "-0.03em", lineHeight: 1.1 }}>Team</div>
            <div style={{ fontSize: 11, color: muted }}>
              {members.filter(m => m.status === "active").length} active · {invites.length} pending
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!isMobile && (
            <button
              onClick={copyInviteLink}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px",
                fontSize: 12, fontWeight: 600, background: "transparent",
                border: `1px solid ${border}`, borderRadius: 6, color: muted, cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.color = text; e.currentTarget.style.borderColor = "var(--color-primary)" }}
              onMouseLeave={e => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = border }}
            >
              {copiedLink ? <Check size={13} style={{ color: "#10b981" }} /> : <Copy size={13} />}
              {copiedLink ? "Copied!" : "Copy link"}
            </button>
          )}
          <button
            onClick={() => setShowInvite(true)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
              fontSize: 13, fontWeight: 700, background: "var(--color-primary)", color: "#fff",
              border: "none", cursor: "pointer", borderRadius: 8, boxShadow: "0 4px 14px color-mix(in srgb,var(--color-primary) 40%,transparent)" }}
          >
            <UserPlus size={13} />
            {isMobile ? "Invite" : "Invite member"}
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ paddingTop: 56 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: isMobile ? "20px 12px" : "28px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Stats strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[
              { n: members.filter(m => m.status === "active").length, l: "Active",     icon: Users, color: "#10b981" },
              { n: invites.length,                                      l: "Pending",    icon: Clock, color: "#f59e0b" },
              { n: members.filter(m => m.apiAccess).length,            l: "API Access", icon: Key,   color: "#6366f1" },
            ].map(s => (
              <div key={s.l} style={{ padding: "14px 16px", background: card, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, flexShrink: 0,
                  background: `color-mix(in srgb,${s.color} 12%,transparent)`,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon size={14} style={{ color: s.color }} />
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: text, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: muted, marginTop: 2 }}>{s.l}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── TABS ── */}
          <div style={{ display: "flex", borderBottom: `1px solid ${border}`, overflowX: "auto" }}>
            {TABS.map(t => {
              const active = tab === t.id
              return (
                <button key={t.id} onClick={() => setTab(t.id as any)}
                  style={{ padding: "0 18px", height: 42, border: "none", cursor: "pointer", flexShrink: 0,
                    background: "transparent", fontSize: 13, fontWeight: 600,
                    color: active ? text : muted,
                    borderBottom: `2px solid ${active ? "var(--color-primary)" : "transparent"}`,
                    transition: "all 0.15s",
                    display: "flex", alignItems: "center", gap: 7,
                  }}>
                  {t.label}
                  {t.count !== null && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 4,
                      background: active ? "color-mix(in srgb,var(--color-primary) 14%,transparent)" : (isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"),
                      color: active ? "var(--color-primary)" : muted,
                    }}>{t.count}</span>
                  )}
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.14 }}>

              {/* ─── MEMBERS ─── */}
              {tab === "members" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {/* search */}
                    <div style={{ display: "flex", border: `1px solid ${border}`, background: card, overflow: "hidden" }}>
                      <div style={{ padding: "0 12px", height: 42, display: "flex", alignItems: "center",
                        borderRight: `1px solid ${border}`,
                        background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}>
                        <Search size={13} style={{ color: muted }} />
                      </div>
                      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members…"
                        style={{ flex: 1, height: 42, padding: "0 12px", background: "transparent",
                          border: "none", outline: "none", fontSize: 13, color: text, fontFamily: "inherit" }} />
                      {search && (
                        <button onClick={() => setSearch("")}
                          style={{ padding: "0 12px", background: "transparent", border: "none", cursor: "pointer", color: muted }}>
                          <X size={13} />
                        </button>
                      )}
                    </div>

                    {/* role filter */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {(["all", "owner", "admin", "developer", "viewer"] as const).map(r => {
                        const active = roleFilter === r
                        const color  = r !== "all" ? ROLE_CFG[r].color : "var(--color-primary)"
                        const bgCol  = r !== "all" ? ROLE_CFG[r].bg : "color-mix(in srgb,var(--color-primary) 12%,transparent)"
                        return (
                          <button key={r} onClick={() => setRoleFilter(r)}
                            style={{ padding: "4px 12px", border: `1px solid ${active ? color : border}`,
                              cursor: "pointer", background: active ? bgCol : "transparent",
                              color: active ? color : muted,
                              fontSize: 12, fontWeight: 600, transition: "all 0.14s" }}>
                            {r === "all" ? "All" : ROLE_CFG[r].label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "48px 0", background: card, border: `1px solid ${border}` }}>
                      <Users size={26} style={{ color: subtle, margin: "0 auto 10px", display: "block" }} />
                      <p style={{ fontSize: 13, color: muted }}>No members match your search</p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {filtered.map((m, i) => (
                        <motion.div key={m.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}>
                          <MemberCard
                            member={m}
                            onRoleChange={handleRoleChange}
                            onRemove={handleRemove}
                            onToggleAccess={handleToggleAccess}
                            onToggleSuspend={handleToggleSuspend}
                            isDark={isDark} card={card} border={border} text={text} muted={muted} subtle={subtle}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ─── INVITES ─── */}
              {tab === "invites" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ padding: "12px 16px", background: card, border: `1px solid ${border}`,
                    display: "flex", alignItems: "center", gap: 10 }}>
                    <Clock size={13} style={{ color: "#f59e0b", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: muted, flex: 1 }}>Invites expire after 7 days.</span>
                    <button onClick={() => setShowInvite(true)}
                      style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px",
                        background: "var(--color-primary)", border: "none", color: "#fff", fontSize: 12, fontWeight: 700,
                        cursor: "pointer", borderRadius: 6, flexShrink: 0 }}>
                      <UserPlus size={12} /> New invite
                    </button>
                  </div>

                  {invites.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "56px 0", background: card, border: `1px solid ${border}` }}>
                      <Mail size={28} style={{ color: subtle, margin: "0 auto 12px", display: "block" }} />
                      <p style={{ fontSize: 15, fontWeight: 700, color: text, marginBottom: 4 }}>No pending invites</p>
                      <p style={{ fontSize: 13, color: muted }}>Invite teammates to collaborate</p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {invites.map((inv, i) => {
                        const rc = ROLE_CFG[inv.role]
                        return (
                          <motion.div key={inv.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            style={{ background: card, border: `1px solid ${border}`, borderRadius: 10, padding: "14px 16px" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                              <div style={{ width: 38, height: 38, background: rc.bg, flexShrink: 0,
                                display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Mail size={15} style={{ color: rc.color }} />
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: text, overflow: "hidden",
                                  textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 5 }}>
                                  {inv.email}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                  <RoleBadge role={inv.role} small />
                                  <span style={{ fontSize: 11, color: muted }}>Sent {inv.sentAt}</span>
                                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <Clock size={10} style={{ color: "#f59e0b" }} />
                                    <span style={{ fontSize: 11, color: "#f59e0b", fontWeight: 600 }}>Expires in {inv.expiresAt}</span>
                                  </div>
                                </div>
                              </div>
                              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                <button title="Resend"
                                  style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
                                    background: "transparent", border: `1px solid ${border}`, borderRadius: 5,
                                    cursor: "pointer", color: muted, transition: "color 0.15s" }}
                                  onMouseEnter={e => e.currentTarget.style.color = "var(--color-primary)"}
                                  onMouseLeave={e => e.currentTarget.style.color = muted}>
                                  <RefreshCw size={12} />
                                </button>
                                <button onClick={() => revokeInvite(inv.id)} title="Revoke"
                                  style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
                                    background: "transparent", border: `1px solid ${border}`, borderRadius: 5,
                                    cursor: "pointer", color: muted, transition: "color 0.15s" }}
                                  onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                                  onMouseLeave={e => e.currentTarget.style.color = muted}>
                                  <X size={12} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  )}

                  <button onClick={copyInviteLink}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px",
                      background: "transparent", border: `1px dashed ${border}`, borderRadius: 8,
                      color: muted, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", width: "100%" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.color = "#f59e0b" }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = muted }}>
                    {copiedLink ? <><Check size={13} style={{ color: "#10b981" }} /> Copied link!</> : <><Copy size={13} /> Copy invite link</>}
                  </button>
                </div>
              )}

              {/* ─── PERMISSIONS ─── */}
              {tab === "permissions" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ fontSize: 13, color: muted, lineHeight: 1.7, margin: 0 }}>
                    Roles define what members can do. Assign roles from the Members tab.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {(["owner", "admin", "developer", "viewer"] as Role[]).map((r, idx) => {
                      const c = ROLE_CFG[r]
                      const count = members.filter(m => m.role === r).length
                      return (
                        <motion.div key={r} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.06 }}
                          style={{ background: card, border: `1px solid ${border}`, borderRadius: 10, padding: "16px" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 34, height: 34, background: c.bg, flexShrink: 0,
                                display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <c.icon size={15} style={{ color: c.color }} />
                              </div>
                              <div>
                                <div style={{ fontSize: 14, fontWeight: 800, color: text }}>{c.label}</div>
                                <div style={{ fontSize: 11, color: muted }}>{count} member{count !== 1 ? "s" : ""}</div>
                              </div>
                            </div>
                            <span style={{ fontSize: 11, padding: "2px 8px", background: c.bg, color: c.color, fontWeight: 700 }}>
                              {count}
                            </span>
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {c.perms.map(p => (
                              <span key={p} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: muted,
                                padding: "4px 10px",
                                background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
                                <div style={{ width: 4, height: 4, background: c.color, flexShrink: 0 }} />
                                {p}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  <div style={{ padding: "14px 16px", background: "rgba(6,182,212,0.07)", borderRadius: 10,
                    border: "1px solid rgba(6,182,212,0.18)", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <Key size={15} style={{ color: "#06b6d4", flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: text, marginBottom: 4 }}>API access is controlled separately</div>
                      <p style={{ fontSize: 12, color: muted, lineHeight: 1.65, margin: 0 }}>
                        Even Admins and Developers need explicit API access enabled via the toggle on each member's card.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showInvite && (
          <InviteModal
            onClose={() => setShowInvite(false)}
            surface={card} border={border} text={text} muted={muted} isDark={isDark}
          />
        )}
      </AnimatePresence>
    </div>
  )
}