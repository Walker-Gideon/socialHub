import { ExternalLink, X } from 'lucide-react'

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
  color: string
}

const PLATFORMS = {
  youtube: { icon: '▶', color: 'from-red-600 to-red-700', label: 'YouTube' },
  instagram: { icon: '📷', color: 'from-pink-500 to-purple-600', label: 'Instagram' },
  tiktok: { icon: '♪', color: 'from-black to-gray-800', label: 'TikTok' },
  x: { icon: '𝕏', color: 'from-black to-gray-900', label: 'X (Twitter)' },
  twitter: { icon: '𝕏', color: 'from-blue-400 to-blue-500', label: 'Twitter' },
  linkedin: { icon: 'in', color: 'from-blue-600 to-blue-700', label: 'LinkedIn' },
  facebook: { icon: 'f', color: 'from-blue-500 to-blue-600', label: 'Facebook' },
  github: { icon: '⚙', color: 'from-gray-700 to-gray-900', label: 'GitHub' },
  twitch: { icon: '⚡', color: 'from-purple-600 to-purple-800', label: 'Twitch' },
  discord: { icon: '💬', color: 'from-indigo-600 to-indigo-700', label: 'Discord' },
  threads: { icon: '@', color: 'from-black to-gray-800', label: 'Threads' },
  whatsapp: { icon: '💬', color: 'from-green-500 to-green-600', label: 'WhatsApp' },
  telegram: { icon: '✈', color: 'from-blue-400 to-cyan-500', label: 'Telegram' },
  email: { icon: '✉', color: 'from-amber-500 to-orange-600', label: 'Email' },
}

export function SocialLinkButton({
  link,
  isEditing,
  onRemove,
  onEdit,
}: {
  link: SocialLink
  isEditing: boolean
  onRemove: (id: string) => void
  onEdit: (link: SocialLink) => void
}) {
  const platformConfig = PLATFORMS[link.platform as keyof typeof PLATFORMS] || PLATFORMS.x
  const isEmailOrWhatsApp = link.platform === 'email' || link.platform === 'whatsapp'

  return (
    <div className="relative group">
      {isEmailOrWhatsApp ? (
        <a
          href={
            link.platform === 'email'
              ? `mailto:${link.url}`
              : `https://wa.me/${link.url.replace(/\D/g, '')}`
          }
          className={`w-full flex items-center justify-between px-6 py-4 rounded-xl bg-gradient-to-r ${platformConfig.color} text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <span className="text-xl">{platformConfig.icon}</span>
            {link.platform === 'email' ? `Email: ${link.url}` : `WhatsApp: ${link.url}`}
          </span>
          <ExternalLink className="w-4 h-4" />
        </a>
      ) : (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-between px-6 py-4 rounded-xl bg-gradient-to-r ${platformConfig.color} text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer`}
        >
          <span className="flex items-center gap-3">
            <span className="text-xl">{platformConfig.icon}</span>
            {platformConfig.label}
          </span>
          <ExternalLink className="w-4 h-4" />
        </a>
      )}

      {isEditing && (
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onRemove(link.id)}
            className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export function getPlatformLabel(platform: string): string {
  return (PLATFORMS[platform as keyof typeof PLATFORMS] || PLATFORMS.x).label
}