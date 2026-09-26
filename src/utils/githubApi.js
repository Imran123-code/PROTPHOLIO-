import { allVerifiedProjects } from '../data/portfolioData';

const GITHUB_USERNAME = 'Imran123-code';

// Explicit list of repositories to exclude completely
const FORBIDDEN_REPOS = [
  '2302030400035',
  'object-oriented',
  'portfolio',
  'imran-s-portfolio',
  'event-sou',
  '2302030400035_wt_ui_ux_sem4',
  'movie-vault',
  'movievault',
  'billnest',
  'imran123-code'
];

export async function fetchLiveProjects() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!res.ok) {
      return { projects: allVerifiedProjects, isLive: false };
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) {
      return { projects: allVerifiedProjects, isLive: false };
    }

    const verifiedMap = new Map();
    allVerifiedProjects.forEach(p => {
      verifiedMap.set(p.title.toLowerCase().replace(/[^a-z0-9]/g, ''), p);
      if (p.githubUrl) {
        const repoName = p.githubUrl.split('/').pop().toLowerCase();
        verifiedMap.set(repoName, p);
      }
    });

    // Strictly filter out any forbidden repositories or Prodigy items
    const liveProjects = repos
      .filter(r => {
        const n = r.name.toLowerCase();
        if (r.fork) return false;
        if (n.includes('prodigy')) return false;
        if (FORBIDDEN_REPOS.some(fb => n === fb || n.includes(fb))) return false;
        return true;
      })
      .map(r => {
        const key = r.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const matched = verifiedMap.get(key) || verifiedMap.get(r.name.toLowerCase());

        let category = 'Web Development';
        if (r.language === 'Python') category = 'Python';
        else if (r.name.toLowerCase().includes('react')) category = 'React';
        else if (r.name.toLowerCase().includes('analytic') || r.name.toLowerCase().includes('data') || r.name.toLowerCase().includes('csv')) category = 'Data Analytics';
        else if (r.name.toLowerCase().includes('ai') || r.name.toLowerCase().includes('detection')) category = 'AI & Machine Learning';

        const rawTech = matched ? matched.technologies : [r.language || 'JavaScript', 'HTML5', 'CSS3'];
        const cleanTech = rawTech.filter(t => {
          const lower = t.toLowerCase();
          return !lower.includes('prodigy') &&
                 !lower.includes('typescript') &&
                 !lower.includes('mern') &&
                 !lower.includes('ui/ux') &&
                 lower !== 'c' &&
                 lower !== 'c++';
        });

        return {
          id: r.name,
          title: matched ? matched.title : formatRepoName(r.name),
          tagline: matched ? matched.tagline : (r.description || `Software repository in ${r.language || 'modern web technologies'}`),
          description: matched ? matched.description : (r.description || `Repository developed using ${r.language || 'modern technologies'}. Explore source code and architecture on GitHub.`),
          category: matched ? matched.category : category,
          period: matched?.period || '2025',
          technologies: cleanTech.length > 0 ? cleanTech : ['JavaScript', 'HTML5', 'CSS3'],
          githubUrl: r.html_url,
          liveUrl: matched ? matched.liveUrl : (r.homepage || null),
          stars: r.stargazers_count,
          forks: r.forks_count,
          updatedAt: r.updated_at,
          featured: matched?.featured || false
        };
      });

    // Merge verified projects first (which already has the recruiter-optimized ordering!)
    const result = [...allVerifiedProjects];
    const existingTitles = new Set(result.map(p => p.title.toLowerCase()));

    liveProjects.forEach(lp => {
      const isForbidden = FORBIDDEN_REPOS.some(fb => lp.id.toLowerCase() === fb || lp.id.toLowerCase().includes(fb));
      if (!existingTitles.has(lp.title.toLowerCase()) && !isForbidden && !lp.id.toLowerCase().includes('prodigy')) {
        result.push(lp);
        existingTitles.add(lp.title.toLowerCase());
      }
    });

    return { projects: result, isLive: true };
  } catch (err) {
    return { projects: allVerifiedProjects, isLive: false };
  }
}

function formatRepoName(raw) {
  return raw
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
