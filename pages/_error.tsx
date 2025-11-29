import type { NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';

type ErrorProps = {
  statusCode?: number | null;
};

export default function ErrorPage({ statusCode = null }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Something went wrong</h1>
        {statusCode && (
          <p className="text-muted-foreground mb-4">Error code: {statusCode}</p>
        )}
        <p className="mb-4">
          Please try refreshing the page or return to the homepage.
        </p>
        <div className="flex justify-center gap-2">
          <Link
            href="/"
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? null;
  return { statusCode };
};
