import type { NextPage } from 'next';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import BlogPost from '../../components/BlogPost';
import type FrontMatter from '../../interfaces/FrontMatter';
import Image from 'next/image';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';

type Props = {
  blogList: Array<{
    slug: string;
    frontmatter: FrontMatter;
    url?: string;
  }>;
};

const Blogs: NextPage<Props> = ({ blogList }) => {
  useEffect(() => {
    // google analytics
    ReactGA.send({ hitType: 'pageview', page: '/blogs', title: 'Blogs page' });
  }, []);
  return (
    <>
      <div className="mx-20 px-6 py-6">
        {blogList.map(({ slug, frontmatter, url }) => {
          // pass external url as `link` so BlogPost will render external anchor
          const linkProp = url ?? slug;
          return (
            <BlogPost key={slug} link={linkProp} frontmatter={frontmatter} />
          );
        })}
      </div>
      {blogList.length === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            width={900}
            height={500}
            src="/undercons.gif"
            alt="underconstruction gif"
          />
        </div>
      )}
    </>
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
        frontmatter: {
          title,
          publishedAt,
        },
      } as { slug: string; frontmatter: FrontMatter };
    })
    .filter(Boolean) as Array<{ slug: string; frontmatter: FrontMatter }>;

  // Always try to fetch Dev.to articles to include alongside local posts.
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
        // create a unique slug for external posts to avoid clashes
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

  // Merge local + external and sort by publishedAt descending
  const combined = [...localList, ...externalList].sort(
    (a, b) => b.frontmatter.publishedAt - a.frontmatter.publishedAt
  );

  return {
    props: {
      blogList: combined,
    },
    revalidate: 3600,
  };
}
