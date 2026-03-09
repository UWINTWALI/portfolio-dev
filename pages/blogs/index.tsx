import type { NextPage } from 'next';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import BlogPost from '../../components/BlogPost';
import type FrontMatter from '../../interfaces/FrontMatter';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';

type Props = {
  blogList: Array<{
    slug: string;
    frontmatter: FrontMatter;
    url?: string;
  }>;
};

const Blogs: NextPage<Props> = ({ blogList }) => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/blogs', title: 'Blogs page' });
  }, []);

  return (
    <div className="relative my-10 sm:my-20">
      {/* Page Header */}
      <div className="mt-10 sm:mt-20">
        <div className="text-4xl sm:text-5xl font-medium">Blogs</div>
        <p className="text-muted-foreground font-light mt-4">
          {blogList.length > 0
            ? `${blogList.length} article${blogList.length === 1 ? '' : 's'} — thoughts on software, AI, and what I'm building.`
            : 'Articles coming soon — check back later.'}
        </p>
      </div>

      <Separator className="my-8" />

      {/* Blog List */}
      {blogList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {blogList.map(({ slug, frontmatter, url }) => {
            const linkProp = url ?? slug;
            return (
              <BlogPost key={slug} link={linkProp} frontmatter={frontmatter} />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
          <div className="text-6xl">✍️</div>
          <div className="text-xl font-medium text-foreground">
            No articles yet
          </div>
          <p className="text-muted-foreground font-light max-w-sm">
            I'm working on some posts. Come back soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default Blogs;

export async function getStaticProps() {
  const blogs = fs.existsSync(path.join('blogs'))
    ? fs.readdirSync(path.join('blogs'))
    : [];

  const localList = blogs
    .map(blog => {
      const slug = blog.replace('.mdx', '');
      const fileData = fs.readFileSync(path.join('blogs', blog), 'utf-8');
      let { data: frontmatter } = matter(fileData);
      const title = frontmatter?.title ?? null;
      const publishedAtRaw = frontmatter?.publishedAt ?? null;
      const publishedAt = publishedAtRaw
        ? typeof publishedAtRaw === 'number'
          ? Math.floor(publishedAtRaw / 1000)
          : Math.floor(new Date(publishedAtRaw).getTime() / 1000)
        : null;
      if (!title || !publishedAt) return null;
      return {
        slug,
        frontmatter: { title, publishedAt },
      } as { slug: string; frontmatter: FrontMatter };
    })
    .filter(Boolean) as Array<{ slug: string; frontmatter: FrontMatter }>;

  let externalList: Array<{
    slug: string;
    frontmatter: FrontMatter;
    url?: string;
  }> = [];
  try {
    const username = 'uwintwalijean';
    const res = await fetch(`https://dev.to/api/articles?username=${username}`);
    if (res.ok) {
      const articles = await res.json();
      externalList = articles.map((a: any) => ({
        slug: `devto-${a.id ?? a.slug}`,
        frontmatter: {
          title: a.title,
          publishedAt: Math.floor(new Date(a.published_at).getTime() / 1000),
        },
        url: a.url || `https://dev.to/${username}/${a.slug}`,
      }));
    }
  } catch (err) {
    console.warn('Failed fetching Dev.to articles', err);
  }

  const combined = [...localList, ...externalList].sort(
    (a, b) => b.frontmatter.publishedAt - a.frontmatter.publishedAt
  );

  return {
    props: { blogList: combined },
    revalidate: 3600,
  };
}
