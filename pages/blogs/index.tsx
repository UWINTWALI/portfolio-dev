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
        {blogList.map(({ slug, frontmatter }) => {
          return <BlogPost key={slug} link={slug} frontmatter={frontmatter} />;
        })}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          width={900}
          height={500}
          src="/undercons.gif"
          alt="underconstruction gif"
        />
      </div>
    </>
  );
};

export default Blogs;

export async function getStaticProps() {
  const blogs = fs.readdirSync(path.join('blogs'));
  console.log(blogs);
  const blogList = blogs
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
      };
    })
    .filter(Boolean) as Array<{ slug: string; frontmatter: FrontMatter }>;

  return {
    props: {
      blogList,
    },
  };
}
