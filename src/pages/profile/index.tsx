import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Loader from '../../component/ui/Loader'
import ProfileDisplay from './components/ProfileDisplay'

import { decodeFromHash } from '../../utils/encode'
import type { ProfileData } from '../../utils/encode'

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>() 
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isOwner, setIsOwner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(!username) return
    
    const hash = window.location.hash
    const decoded = decodeFromHash(hash)

    if (decoded && decoded.username === username) {
      setProfile(decoded)
      const ownerkey = sessionStorage.getItem('socialhub_owner')
      setIsOwner(ownerkey === username)
    } else {
      setProfile({
        username,
        displayName: username,
        bio: "",
        links: []
      })
      setIsOwner(false)
    }

    setIsLoading(false)
  }, [username])

  if(isLoading) return <Loader />;
  if (!profile) return null;

  return (
    <ProfileDisplay
      username={profile.username}
      displayName={profile.displayName}
      bio={profile.bio}
      links={profile.links}
      isOwner={isOwner}
    />
  )
}
