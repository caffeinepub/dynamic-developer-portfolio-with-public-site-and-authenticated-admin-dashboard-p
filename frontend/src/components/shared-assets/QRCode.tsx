import { useEffect, useRef, useState } from 'react';

type DotType = 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
type CornerSquareType = 'dot' | 'square' | 'extra-rounded';
type CornerDotType = 'dot' | 'square';

export interface QRCodeOptions {
  image?: string;
  imageOptions?: {
    imageSize?: number;
    margin?: number;
    crossOrigin?: string;
    hideBackgroundDots?: boolean;
  };
  dotsOptions?: {
    color?: string;
    type?: DotType;
  };
  cornersSquareOptions?: {
    color?: string;
    type?: CornerSquareType;
  };
  cornersDotOptions?: {
    color?: string;
    type?: CornerDotType;
  };
  backgroundOptions?: {
    color?: string;
  };
}

export interface QRCodeProps {
  value: string;
  size?: 'sm' | 'md' | 'lg';
  options?: QRCodeOptions;
}

const SIZE_MAP: Record<string, number> = {
  sm: 160,
  md: 256,
  lg: 384,
};

const QR_CODE_STYLING_CDN =
  'https://cdn.jsdelivr.net/npm/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let qrCodeStylingLib: any = null;
let libLoadPromise: Promise<void> | null = null;

function loadQRCodeStylingLib(): Promise<void> {
  if (qrCodeStylingLib) return Promise.resolve();
  if (libLoadPromise) return libLoadPromise;

  libLoadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = QR_CODE_STYLING_CDN;
    script.async = true;
    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      qrCodeStylingLib = (window as any).QRCodeStyling;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load qr-code-styling library'));
    document.head.appendChild(script);
  });

  return libLoadPromise;
}

export function QRCode({ value, size = 'md', options = {} }: QRCodeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const qrInstanceRef = useRef<any>(null);
  const [libLoaded, setLibLoaded] = useState(!!qrCodeStylingLib);
  const [error, setError] = useState<string | null>(null);

  const px = SIZE_MAP[size] ?? SIZE_MAP.md;

  // Load the library once
  useEffect(() => {
    if (qrCodeStylingLib) {
      setLibLoaded(true);
      return;
    }
    loadQRCodeStylingLib()
      .then(() => setLibLoaded(true))
      .catch(() => setError('Could not load QR code library'));
  }, []);

  // Create or update the QR code instance
  useEffect(() => {
    if (!libLoaded || !containerRef.current) return;

    const qrOptions = {
      width: px,
      height: px,
      type: 'svg' as const,
      data: value,
      image: options.image,
      imageOptions: {
        crossOrigin: 'anonymous',
        imageSize: options.imageOptions?.imageSize ?? 0.4,
        margin: options.imageOptions?.margin ?? 0,
        hideBackgroundDots: options.imageOptions?.hideBackgroundDots ?? true,
      },
      dotsOptions: {
        color: options.dotsOptions?.color ?? '#000000',
        type: (options.dotsOptions?.type ?? 'square') as DotType,
      },
      cornersSquareOptions: {
        color: options.cornersSquareOptions?.color ?? options.dotsOptions?.color ?? '#000000',
        type: options.cornersSquareOptions?.type as CornerSquareType | undefined,
      },
      cornersDotOptions: {
        color: options.cornersDotOptions?.color ?? options.dotsOptions?.color ?? '#000000',
        type: options.cornersDotOptions?.type as CornerDotType | undefined,
      },
      backgroundOptions: {
        color: options.backgroundOptions?.color ?? '#ffffff',
      },
    };

    if (!qrInstanceRef.current) {
      // First render: create and append
      qrInstanceRef.current = new qrCodeStylingLib(qrOptions);
      // Clear container before appending
      containerRef.current.innerHTML = '';
      qrInstanceRef.current.append(containerRef.current);
    } else {
      // Subsequent renders: update
      qrInstanceRef.current.update(qrOptions);
    }
  }, [libLoaded, value, px, options]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      qrInstanceRef.current = null;
    };
  }, []);

  if (error) {
    return (
      <div
        style={{ width: px, height: px }}
        className="flex items-center justify-center bg-muted rounded-lg text-xs text-muted-foreground text-center p-2"
      >
        QR code unavailable
      </div>
    );
  }

  if (!libLoaded) {
    return (
      <div
        style={{ width: px, height: px }}
        className="flex items-center justify-center bg-muted rounded-lg animate-pulse"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ width: px, height: px }}
      className="flex items-center justify-center"
    />
  );
}
