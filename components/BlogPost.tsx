import Link from 'next/link';
import { unixToDate } from '../helpers/helpers';
import type FrontMatter from '../interfaces/FrontMatter';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Calendar } from 'lucide-react';

type Props = {
  link: string;
  frontmatter: FrontMatter;
};

function BlogPost({ frontmatter, link }: Props): JSX.Element {
  const date = unixToDate(frontmatter.publishedAt);
  const year = new Date(frontmatter.publishedAt * 1000).getFullYear();
  const isExternal = typeof link === 'string' && link.startsWith('http');

  return (
    <Card className="flex flex-col justify-between transition-all duration-200 rounded-lg shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between mb-1">
          <span className="text-primary text-sm font-medium">{year}</span>
          {isExternal && (
            <Badge variant="secondary" className="text-xs">
              Dev.to
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg sm:text-xl font-medium leading-snug">
          {frontmatter.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1.5 text-sm mt-1">
          <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
          {date}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        {isExternal ? (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              Read Article
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </a>
          </Button>
        ) : (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link href={`/blogs/${link}`}>
              Read More
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default BlogPost;
