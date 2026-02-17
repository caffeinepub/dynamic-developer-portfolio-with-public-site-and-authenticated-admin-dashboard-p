import { ExternalLink } from 'lucide-react';

export default function QrPage() {
  const portfolioUrl = 'https://dynamic-developer-portfolio-with-public-site-and-a-w6e.caffeine.xyz/';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Scan to Visit</h1>
          <p className="text-muted-foreground">Point your phone camera at the QR code below</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <img
              src="/assets/generated/qr-portfolio.dim_512x512.png"
              alt="QR Code to Portfolio"
              className="w-64 h-64 sm:w-80 sm:h-80"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ExternalLink className="w-4 h-4" />
            <span>Scan to open my portfolio</span>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Destination URL:</p>
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline break-all"
            >
              {portfolioUrl}
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            Open your phone's camera app and point it at the QR code. A notification will appear to open the link.
          </p>
        </div>
      </div>
    </div>
  );
}
