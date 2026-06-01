import { ExternalLink, X } from 'lucide-react'
import { getPlatform } from '../../data/platforms'

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface SocialLinkButtonProps {
  link: SocialLink;
  isEditing: boolean;
  onRemove: (id: string) => void;
  onEdit: (link: SocialLink) => void;
}

export function SocialLinkButton({ link, isEditing, onRemove, onEdit }: SocialLinkButtonProps){
  const platform = getPlatform(link.platform);

  const href = link.platform === 'email' ? `mailto:${link.url}` : link.platform === "whatsapp" ? `https://wa.me/${link.url.replace(/\D/g, '')}` : link.url;
  
  return (
    <div className={"relative group"}>
      <a 
        href={href}
        target={link.platform === "email" ? "_self" : "_blank"}
        rel="noopener noreferrer"
        className={`w-full flex items-center justify-between px-6 py-4 rounded-xl bg-gradient-to-r ${platform.color} text-white font-semibold transition-all duaration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer`}
        onClick={
          isEditing ? (e) => {
            e.preventDefault();
            onEdit(link);
          } : undefined
        }
      >
        <span className={"flex items-center gap-3"}>
          <span className={"text-xl"}>{platform.icon}</span>
          <span>
            {link.platform === "email" 
            ? `Email : ${link.url}` 
            : link.platform === "whatsapp" 
            ? link.url 
            : platform.label}
          </span>
        </span>
        <ExternalLink className={"w-4 h-4 opacity-70"} />
      </a>

      {isEditing && (
        <button 
          onClick={() => onRemove(link.id)}
          className={"absolute -top-2 -right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"}
        >
            <X className="w-3 h-3" />
          </button>
      )}
    </div>
  )
}

export function getPlatformLabel(platform: string): string {
  return getPlatform(platform).label;
}
