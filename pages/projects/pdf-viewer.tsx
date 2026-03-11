import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Eye,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import ReactGA from 'react-ga4';

export default function PdfViewer() {
  const router = useRouter();
  const { url, title } = router.query as { url?: string; title?: string };

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const displayTitle = title || 'Project Document';

  useEffect(() => {
    if (title) {
      ReactGA.send({
        hitType: 'pageview',
        page: '/projects/pdf-viewer',
        title: `PDF: ${title}`,
      });
    }
  }, [title]);

  const handleViewFullPage = () => {
    ReactGA.event({
      category: 'Button.Click',
      action: 'Full Screen Project PDF',
      label: title,
    });
    window.open(url, '_blank');
  };

  const handleDownload = () => {
    ReactGA.event({
      category: 'Button.Click',
      action: 'Download Project PDF',
      label: title,
    });
    const link = document.createElement('a');
    link.href = url!;
    link.download = url!.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!url) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl text-center">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-medium mb-2">No document specified</h2>
        <p className="text-muted-foreground mb-6">
          This page requires a PDF URL to display.
        </p>
        <Button asChild variant="outline">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back button */}
      <div className="mb-6">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground -ml-2"
        >
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <FileText className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">{displayTitle}</h1>
        </div>
        <p className="text-muted-foreground">
          View or download the project document below.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        <Button
          onClick={handleViewFullPage}
          size="lg"
          className="flex items-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          Open Full Page
        </Button>
        <Button
          onClick={handleDownload}
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Separator className="my-6" />

      {/* PDF Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <CardTitle>Document Preview</CardTitle>
          </div>
          <CardDescription>
            For the best reading experience, open in full page.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Loading document...
                  </p>
                </div>
              </div>
            )}

            {hasError ? (
              <div className="h-96 flex flex-col items-center justify-center text-center p-8">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Unable to display PDF
                </h3>
                <p className="text-muted-foreground mb-6">
                  Your browser might not support inline PDF viewing.
                </p>
                <div className="flex gap-3">
                  <Button onClick={handleViewFullPage} variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            ) : (
              <iframe
                src={url}
                width="100%"
                height="800"
                className="border-0 rounded-lg"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
                title={`${displayTitle} PDF Preview`}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Footer hint */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Having trouble viewing?{' '}
          <button
            onClick={handleViewFullPage}
            className="text-primary hover:underline font-medium"
          >
            Open in a new tab
          </button>{' '}
          or{' '}
          <button
            onClick={handleDownload}
            className="text-primary hover:underline font-medium"
          >
            download the PDF
          </button>
          .
        </p>
      </div>
    </div>
  );
}
