import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import FrontMatter from '../../interfaces/FrontMatter';
import { unixToDate } from '../../helpers/helpers';
import { serialize } from 'next-mdx-remote/serialize';
import MarkdownData from '../../components/MarkdownData';
import rehypeHighlight from 'rehype-highlight';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type Props = {
  frontmatter: FrontMatter;
  content: MDXRemoteSerializeResult;
};

export default function BlogPostPage({
  frontmatter: { title, publishedAt },
  content,
}: Props): JSX.Element {
  const date = unixToDate(publishedAt);

  return (
    <div className="relative my-10 sm:my-20">
      {/* Back Button */}
      <div className="mt-10 sm:mt-20 mb-8">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground -ml-2"
        >
          <Link href="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>
      </div>

      {/* Post Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-medium text-foreground leading-tight mb-4">
          {title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground font-light text-sm">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
      </div>

      <Separator className="mb-10" />

      {/* Post Content */}
      <div className="max-w-none">
        <MarkdownData content={content} />
      </div>

      <Separator className="mt-16 mb-8" />

      {/* Footer navigation */}
      <div className="pb-10">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="text-muted-foreground"
        >
          <Link href="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Articles
          </Link>
        </Button>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const blogs = fs.readdirSync(path.join('blogs'));
  const paths = blogs.map(blog => ({
    params: { slug: blog.replace('.mdx', '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const blog = fs.readFileSync(
    path.join('blogs', `${params.slug}.mdx`),
    'utf-8'
  );
  const { data: frontmatter, content } = matter(blog);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      // @ts-ignore
      rehypePlugins: [rehypeHighlight],
    },
  });
  return {
    props: {
      frontmatter: {
        title: frontmatter.title,
        publishedAt: Math.floor(
          new Date(frontmatter.publishedAt).getTime() / 1000
        ),
      },
      content: mdxSource,
    },
  };
}
