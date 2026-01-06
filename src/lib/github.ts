const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "AlNahean";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function getGitHubStats() {
  try {
    // 1. Fetch User Data & Latest Events (REST API)
    const [userRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=1`, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
        next: { revalidate: 60 }, // Cache for 1 minute
      }),
    ]);

    const user = await userRes.json();
    const events = await eventsRes.json();

    // 2. Fetch Total Contributions (GraphQL API)
    const query = `
      query($userName:String!) {
        user(login: $userName){
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;

    const gqlRes = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { userName: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    const gqlData = await gqlRes.json();

    return {
      repos: user.public_repos || 0,
      contributions: gqlData.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0,
      lastPush: events[0]?.created_at || null,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return {
      repos: 20, // Fallback data
      contributions: 450,
      lastPush: new Date().toISOString(),
    };
  }
}