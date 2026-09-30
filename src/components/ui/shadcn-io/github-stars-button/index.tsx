"use client";

import { Star } from "lucide-react";
import { type AnchorHTMLAttributes, useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type GitHubStarsButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  username: string;
  repo?: string;
};

function GitHubStarsButton({
  username,
  repo,
  className,
  ...props
}: GitHubStarsButtonProps) {
  const [stars, setStars] = useState(0);
  const profileUrl = useMemo(
    () =>
      repo
        ? `https://github.com/${username}/${repo}`
        : `https://github.com/${username}`,
    [repo, username],
  );

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/github-stars", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: unknown) => {
        const total = (data as { stars?: unknown } | null)?.stars;
        if (typeof total === "number") setStars(total);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "cursor-can-hover flex h-10 shrink-0 items-center gap-2 rounded-lg border-2 border-black/25 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/25",
        className,
      )}
      {...props}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-[18px] shrink-0"
      >
        <path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297Z" />
      </svg>
      <span>{stars.toLocaleString("en-US")}</span>
      <Star
        className="hidden size-[18px] fill-yellow-500 text-yellow-500 min-[360px]:block"
        aria-hidden="true"
      />
    </a>
  );
}

export { GitHubStarsButton, type GitHubStarsButtonProps };
