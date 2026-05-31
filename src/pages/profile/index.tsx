import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ProfileDisplay from './components/ProfileDisplay'
import type { SocialLink } from '../../component/ui/SocialLinkButton'

export default function ProfilePage() {
  const params = useParams()
  const username = params.username as string

  const [bio, setBio] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [displayName, setDisplayName] = useState('')
  const [links, setLinks] = useState<SocialLink[]>([])

  useEffect(() => {
    if(!username) return
    
    const storageKey = `profile_${username}`
    const saved = localStorage.getItem(storageKey)

    if(saved) {
      try {
        const data = JSON.parse(saved)
        setDisplayName(data.displayName || username)
        setBio(data.bio || "")
        setLinks(data.links || [])
      } catch(error) {
        console.error('Error loading profile:', error)
        setDisplayName(username)
      }
    } else {
      setDisplayName(username)
    }

    setIsLoading(false)
  }, [username])

  if(isLoading) {
    return (
       <main className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </main>
    )
  }

  return (
    <ProfileDisplay
      username={username}
      displayName={displayName}
      bio={bio}
      links={links}
      isOwner={true}
    />
  )
}
