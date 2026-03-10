import { useState, useCallback } from "react";

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  className?: string;
}

/**
 * Lightweight YouTube embed facade.
 * Shows a thumbnail + play button. Only loads the heavy YouTube iframe on click.
 * Saves ~800 KB of JS on initial page load.
 */
const YouTubeFacade = ({ videoId, title, className = "" }: YouTubeFacadeProps) => {
  const [activated, setActivated] = useState(false);

  const handleActivate = useCallback(() => setActivated(true), []);

  if (activated) {
    return (
      <div className={`aspect-video ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-2xl"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleActivate}
      aria-label={`Reproducir: ${title}`}
      className={`relative aspect-video w-full cursor-pointer group rounded-2xl overflow-hidden bg-black/90 ${className}`}
    >
      {/* YouTube thumbnail — lightweight webp from ytimg */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        loading="lazy"
        decoding="async"
        width={480}
        height={360}
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-wine/90 flex items-center justify-center group-hover:bg-wine group-hover:scale-110 transition-all duration-300 shadow-lg shadow-wine/30">
          <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default YouTubeFacade;
