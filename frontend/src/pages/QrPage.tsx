import { ExternalLink, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QRCode } from '@/components/shared-assets/qr-code';

export default function QrPage() {
  const portfolioUrl = 'https://dynamic-developer-portfolio-with-public-site-and-a-w6e.caffeine.xyz/';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-3">
            <QrCode className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Scan My QR</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Scan to open my portfolio website
          </p>
        </div>

        {/* QR Code Component */}
        <div className="flex justify-center">
          <div className="bg-white p-5 rounded-2xl shadow-md border border-border/30">
            <QRCode
              size="lg"
              value={portfolioUrl}
              options={{
                dotsOptions: { color: '#53389e', type: 'rounded' },
                cornersSquareOptions: { color: '#53389e', type: 'extra-rounded' },
                cornersDotOptions: { color: '#53389e', type: 'dot' },
                backgroundOptions: { color: '#ffffff' },
              }}
            />
          </div>
        </div>

        {/* Instruction */}
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-foreground">
            📱 Point your phone camera at the QR code above
          </p>
          <p className="text-xs text-muted-foreground">
            A notification will appear to open the link automatically
          </p>
        </div>

        {/* Destination URL */}
        <div className="bg-muted/50 rounded-xl p-4 space-y-2 border border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="font-medium uppercase tracking-wide">Destination</span>
          </div>
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline break-all font-medium"
          >
            {portfolioUrl}
          </a>
        </div>

        {/* Fallback Button */}
        <Button
          asChild
          className="w-full"
          size="lg"
        >
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            Open Portfolio Directly
          </a>
        </Button>

        {/* Footer note */}
        <p className="text-xs text-center text-muted-foreground">
          Can't scan? Use the button above to visit the portfolio directly.
        </p>
      </div>
    </div>
  );
}
