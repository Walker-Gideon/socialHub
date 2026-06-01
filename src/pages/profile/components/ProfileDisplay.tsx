import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Edit, Link2 } from 'lucide-react'

import { SocialLinkButton } from '../../../component/ui/SocialLinkButton'

import { shortenURL } from '../../../utils/encode'
import type { SocialLink } from '../../../component/ui/SocialLinkButton'

interface ProfileDisplayProps {
    bio: string
    username: string
    isOwner: boolean
    displayName: string
    links: SocialLink[]
}

export default function ProfileDisplay({
    bio,
    links,
    isOwner,
    username,
    displayName,
}: ProfileDisplayProps) {
    const [copied, setCopied] = useState(false);
    const [shortening, setShortening] = useState(false);
    const [shareUrl, setShareUrl] = useState(window.location.href);

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const handleShorten = async () => {
        if (shortening) return;

        setShortening(true);
        const short = await shortenURL(shareUrl);

        if (short) {
            setShareUrl(short);
            navigator.clipboard.writeText(short);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        setShortening(false);
    }

    const isAlreadyShort = shareUrl.includes('tinyurl.com')

    return (
        <main className={"min-h-screen bg-gradient-to-br from-background to-card py-12 px-6"}>
            <div className={"w-full max-w-2xl mx-auto"}>
                {/* Header */}
                <div className={"flex flex-col items-center gap-8 mb-12"}>
                    {/* Avatar */}
                    <div className={"w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"}>
                        <span className={"text-5xl font-bold text-white"}>
                            {(displayName || username).charAt(0).toUpperCase()}
                        </span>
                    </div>

                    {/* Profile Info */}
                    <div className={"text-center space-y-2"}>
                        <h1 className={"text-4xl font-bold text-foreground font-heading"}>
                            {displayName || username}
                        </h1>
                        {bio && <p className={"text-lg text-muted-foreground max-w-md"}>{bio}</p>}

                        {/* Buttons */}
                        <div className={"flex gap-3 justify-center pt-4"}>
                            {isOwner && (
                                <Link
                                    to={`/profile/${username}/edit`}
                                    className={"inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"}
                                >
                                    <Edit className={"w-4 h-4"} />
                                    Edit Profile
                                </Link>
                            )}
                            {!isAlreadyShort && (
                                <button
                                    onClick={handleShorten}
                                    disabled={shortening}
                                    className={"inline-flex items-center gap-2 px-6 py-2 bg-card border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors disabled:opacity-50 cursor-pointer"}
                                >
                                    <Link2 className={"w-4 h-4"} />
                                    {shortening ? 'Shortening...' : 'Shorten Link'}
                                </button>
                            )}
                            <button
                                onClick={copyLink}
                                className={"inline-flex items-center gap-2 px-6 py-2 bg-card border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors cursor-pointer"}
                            >
                                <Copy className={"w-4 h-4"} />
                                {copied ? 'Copied!' : isAlreadyShort ? 'Copy Short Link' : 'Copy Link'}
                            </button>
                        </div>

                        {isAlreadyShort && (
                            <p className={"text-sm text-primary mt-2"}>{shareUrl}</p>
                        )}
                    </div>
                </div>

                {/* Links Grid */}
                {links.length > 0 ? (
                    <div className={"grid gap-4"}>
                        {links.map((link) => (
                            <SocialLinkButton
                                key={link.id}
                                link={link}
                                isEditing={false}
                                onRemove={() => { }}
                                onEdit={() => { }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={"text-center py-12 bg-card rounded-xl border border-border"}>
                        <p className={"text-muted-foreground mb-4"}>No social links added yet.</p>
                        {isOwner && (
                            <Link
                                to={`/profile/${username}/edit`}
                                className={"inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"}
                            >
                                Add Your First Link
                            </Link>
                        )}
                    </div>
                )}

                {/* Footer in the link url I need to put the deployed link there so that user can create theirs */}
                <div className={"text-center mt-12 pt-8 border-t border-border"}>
                    <p className={"text-sm text-muted-foreground"}>
                        Made with SocialHub •{" "}
                        <Link to="/">
                            <span className={"text-primary hover:underline"}>Create your own</span>
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}
