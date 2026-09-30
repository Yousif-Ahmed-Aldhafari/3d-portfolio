import { config } from "@/data/config";

export async function GET() {
  try {
    let page = 1;
    let stars = 0;

    while (true) {
      const response = await fetch(
        `https://api.github.com/users/${config.githubUsername}/repos?type=owner&per_page=100&page=${page}`,
        {
          headers: { Accept: "application/vnd.github+json" },
          next: { revalidate: 300 },
        }
      );
      if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`);

      const repositories: unknown = await response.json();
      if (!Array.isArray(repositories)) throw new Error("Unexpected GitHub API response shape");

      stars += repositories.reduce((total, repository) => {
        const count = (repository as { stargazers_count?: unknown }).stargazers_count;
        return total + (typeof count === "number" ? count : 0);
      }, 0);

      if (repositories.length < 100) break;
      page++;
    }

    return Response.json(
      { stars },
      { headers: { "Cache-Control": "public, max-age=300, s-maxage=300" } }
    );
  } catch {
    return Response.json({ stars: 0 }, { status: 200 });
  }
}
