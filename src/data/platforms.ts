export interface Platform {
  id: string
  label: string
  placeholder: string
  icon: string
  color: string
}

export const PLATFORMS: Platform[] = [
  {
    id: 'youtube',
    label: 'YouTube',
    placeholder: 'https://youtube.com/@yourname',
    icon: '▶',
    color: 'from-red-600 to-red-700',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    placeholder: 'https://instagram.com/yourname',
    icon: '📷',
    color: 'from-pink-500 to-purple-600',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    placeholder: 'https://tiktok.com/@yourname',
    icon: '♪',
    color: 'from-gray-900 to-black',
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    placeholder: 'https://x.com/yourname',
    icon: '𝕏',
    color: 'from-gray-800 to-black',
  },
  {
    id: 'threads',
    label: 'Threads',
    placeholder: 'https://threads.net/@yourname',
    icon: '@',
    color: 'from-gray-700 to-black',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/in/yourname',
    icon: 'in',
    color: 'from-blue-600 to-blue-700',
  },
  {
    id: 'github',
    label: 'GitHub',
    placeholder: 'https://github.com/yourname',
    icon: '⚙',
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    placeholder: 'https://facebook.com/yourname',
    icon: 'f',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'twitch',
    label: 'Twitch',
    placeholder: 'https://twitch.tv/yourname',
    icon: '⚡',
    color: 'from-purple-600 to-purple-800',
  },
  {
    id: 'discord',
    label: 'Discord',
    placeholder: 'https://discord.gg/invite',
    icon: '💬',
    color: 'from-indigo-600 to-indigo-700',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    placeholder: 'https://t.me/yourname',
    icon: '✈',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    placeholder: 'Your phone number with country code e.g +233201234567',
    icon: '💬',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'your@email.com',
    icon: '✉',
    color: 'from-amber-500 to-orange-600',
  },
]

export function getPlatform(id: string): Platform {
  return PLATFORMS.find((p) => p.id === id) ?? PLATFORMS[0]
}
