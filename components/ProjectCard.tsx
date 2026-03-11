import { useEffect, useState } from 'react';
import { badgeImage } from '../helpers/helpers';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import ReactGA from 'react-ga4';
import { Badge } from './ui/badge';
import { useRouter } from 'next/router';
import { FileText, BookOpen, ExternalLink } from 'lucide-react';

export type ProjectCardProps = {
  title: string;
  tagline: string;
  badges: string[];
  year: number;
  github_url: string;
  demo_url: string;
  stars: number;
  priority: number;
  category: string;
  /** Slug of a related local blog post (e.g. "my-post") or a full external URL */
  article_slug?: string;
  /** Path to a PDF in /public (e.g. "/projects/my-report.pdf") */
  pdf_url?: string;
};

export default function ProjectCard(props: ProjectCardProps) {
  const [cardId, setCardId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setCardId(props.title.replace(/\s/g, '-').toLowerCase());
  }, [props.title]);

  const handleArticle = () => {
    ReactGA.event({
      category: 'Button.Click',
      action: 'Project Article',
      label: props.article_slug,
    });
    if (props.article_slug?.startsWith('http')) {
      window.open(props.article_slug, '_blank');
    } else {
      router.push(`/blogs/${props.article_slug}`);
    }
  };

  const handlePdf = () => {
    ReactGA.event({
      category: 'Button.Click',
      action: 'Project PDF',
      label: props.title,
    });
    router.push(
      `/projects/pdf-viewer?url=${encodeURIComponent(props.pdf_url!)}&title=${encodeURIComponent(props.title)}`
    );
  };

  return (
    <Card className="flex flex-col justify-between transition-colors rounded-lg shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="text-primary">{props.year}</div>
          {props.stars ? (
            <Badge variant="secondary" className="shadow">
              <span className="mr-2 text-sm">{props.stars}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width={'14px'}
                height={'14px'}
                fill={'currentcolor'}
              >
                <path
                  fillRule="evenodd"
                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                ></path>
              </svg>
            </Badge>
          ) : null}
        </div>
        <CardTitle className="text-lg sm:text-xl font-medium">
          {props.title}
        </CardTitle>
        <CardDescription className="font-light">
          {props.tagline}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-1 justify-start items-center">
          {props.badges.map((badge, i) => {
            const key = badge.toLowerCase();
            const src = badgeImage[key];
            if (src) {
              return (
                <img
                  key={i}
                  className="m-1 opacity-80"
                  src={src}
                  alt={`${badge} badge image`}
                />
              );
            }
            return (
              <Badge key={i} className="m-1 bg-gray-600 text-white border-none">
                {badge}
              </Badge>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center gap-2">
        {props.github_url && (
          <Button
            variant="outline"
            onClick={() => {
              ReactGA.event({
                category: 'Button.Click',
                action: 'Project Github URL',
                label: props.github_url,
              });
              window.open(props.github_url, '_blank');
            }}
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            id={`view-project-button-${cardId}`}
          >
            View Project
            <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </Button>
        )}

        {props.demo_url && (
          <Button
            variant="outline"
            onClick={() => {
              ReactGA.event({
                category: 'Button.Click',
                action: 'Project Demo URL',
                label: props.demo_url,
              });
              window.open(props.demo_url, '_blank');
            }}
            className="flex-1"
            id={`demo-project-button-${cardId}`}
          >
            Demo
            <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </Button>
        )}

        {props.article_slug && (
          <Button
            variant="outline"
            onClick={handleArticle}
            className="flex-1"
            id={`article-project-button-${cardId}`}
          >
            Article
            <BookOpen className="ml-2 h-3.5 w-3.5" />
          </Button>
        )}

        {props.pdf_url && (
          <Button
            variant="outline"
            onClick={handlePdf}
            className="flex-1"
            id={`pdf-project-button-${cardId}`}
          >
            Read Paper
            <FileText className="ml-2 h-3.5 w-3.5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
