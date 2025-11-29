import type { ReactNode } from 'react';

export default function Avatar({
  title,
  url,
  icon,
  width = 'w-8',
  height = 'h-8',
  border = true,
  ariaLabel,
}: {
  title: string;
  url?: string;
  icon?: ReactNode;
  width?: string;
  height?: string;
  border?: boolean;
  ariaLabel?: string;
}) {
  const isTarsAvatar = title === 'tars';

  return (
    <div
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`${width} ${height} rounded-full overflow-hidden ${border ? 'border' : ' border-0'} border-border bg-muted/20 flex items-center justify-center flex-shrink-0`}
    >
      {isTarsAvatar ? (
        <div
          className="w-full h-full flex items-center justify-center text-foreground"
          style={{
            maskImage: `url(${url})`,
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            maskSize: 'contain',
            backgroundColor: 'currentColor',
          }}
        />
      ) : icon ? (
        <div className="w-full h-full flex items-center justify-center text-foreground">
          {icon}
        </div>
      ) : (
        <img src={url} alt={title} className="w-full h-full object-cover" />
      )}
    </div>
  );
}
