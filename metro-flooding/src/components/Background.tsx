export default function Background() {
    return (
        <div className="site-background" aria-hidden="true">
            <div className="bg-grid">
                <div className="bg-glow bg-glow-top" />
                <div className="bg-glow bg-glow-mid" />
                <div className="bg-glow bg-glow-bottom" />
                <div className="bg-vignette" />
            </div>
        </div>
    )
}