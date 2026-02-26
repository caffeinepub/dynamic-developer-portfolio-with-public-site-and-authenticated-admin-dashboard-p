import { useEffect, useRef, useState, useCallback } from 'react';
import { useQRScanner } from '../qr-code/useQRScanner';
import { Button } from '@/components/ui/button';
import { Camera, Loader2, CheckCircle2, AlertCircle, SwitchCamera, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PORTFOLIO_URL = 'https://dynamic-developer-portfolio-with-public-site-and-a-w6e.caffeine.xyz/';

function normalizeUrl(url: string): string {
  return url.trim().replace(/\/$/, '').toLowerCase();
}

function isPortfolioUrl(data: string): boolean {
  const normalized = normalizeUrl(data);
  const portfolioNormalized = normalizeUrl(PORTFOLIO_URL);
  return normalized === portfolioNormalized;
}

export default function ScannerPage() {
  const [hasRedirected, setHasRedirected] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success' | 'other'>('idle');
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const processedRef = useRef<Set<string>>(new Set());

  const {
    qrResults,
    isScanning,
    isActive,
    isSupported,
    error,
    isLoading,
    jsQRLoaded,
    startScanning,
    stopScanning,
    switchCamera,
    clearResults,
    videoRef,
    canvasRef,
  } = useQRScanner({
    facingMode: 'environment',
    scanInterval: 150,
    maxResults: 10,
  });

  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Auto-start scanning on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      startScanning();
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle QR code detection
  useEffect(() => {
    if (qrResults.length === 0 || hasRedirected) return;

    for (const result of qrResults) {
      const data = result.data?.trim();
      if (!data) continue;
      if (processedRef.current.has(data)) continue;

      processedRef.current.add(data);
      setScannedData(data);

      if (isPortfolioUrl(data)) {
        setHasRedirected(true);
        setScanState('success');
        stopScanning();

        // Redirect after brief delay to show success message
        redirectTimeoutRef.current = setTimeout(() => {
          window.location.href = PORTFOLIO_URL;
        }, 1200);
        return;
      } else {
        // Non-matching QR code
        setScanState('other');
        stopScanning();
        return;
      }
    }
  }, [qrResults, hasRedirected, stopScanning]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const handleRetry = useCallback(async () => {
    setScannedData(null);
    setHasRedirected(false);
    setScanState('scanning');
    processedRef.current.clear();
    clearResults();
    await startScanning();
  }, [clearResults, startScanning]);

  const handleVisitScannedUrl = useCallback(() => {
    if (scannedData) {
      window.open(scannedData, '_blank', 'noopener,noreferrer');
    }
  }, [scannedData]);

  const handleVisitPortfolio = useCallback(() => {
    window.location.href = PORTFOLIO_URL;
  }, []);

  // Camera not supported
  if (isSupported === false) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4 p-8 bg-card border border-border rounded-2xl shadow-lg">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
          <h2 className="text-xl font-semibold text-foreground">Camera Not Supported</h2>
          <p className="text-muted-foreground text-sm">
            Your device or browser does not support camera access. Please try a different browser or device.
          </p>
          <Button onClick={handleVisitPortfolio} className="w-full">
            Visit Portfolio Directly
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">QR Code Scanner</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Point your camera at a QR code to scan it
          </p>
        </div>

        {/* Camera Preview Container */}
        <div className="relative w-full bg-muted rounded-2xl overflow-hidden shadow-xl border border-border">
          {/* Aspect ratio wrapper */}
          <div className="relative w-full" style={{ paddingBottom: '75%' }}>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              muted
              autoPlay
            />

            {/* Hidden canvas for QR processing */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Scanning frame overlay */}
            {isScanning && !hasRedirected && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-56 h-56 sm:w-72 sm:h-72">
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
                  {/* Scanning line animation */}
                  <div className="absolute left-2 right-2 h-0.5 bg-primary/80 animate-bounce" style={{ top: '50%' }} />
                </div>
              </div>
            )}

            {/* Loading / Initializing overlay */}
            {(isLoading || (!isActive && !error && !scannedData && scanState === 'idle')) && !hasRedirected && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="text-center space-y-3">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground font-medium">
                    {!jsQRLoaded ? 'Loading scanner...' : 'Requesting camera access…'}
                  </p>
                </div>
              </div>
            )}

            {/* Success overlay */}
            {hasRedirected && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-600/90 backdrop-blur-sm">
                <div className="text-center space-y-3 text-white px-6">
                  <CheckCircle2 className="h-16 w-16 mx-auto animate-pulse" />
                  <p className="text-xl font-bold">Portfolio QR Detected!</p>
                  <p className="text-sm opacity-90">Redirecting to your portfolio…</p>
                </div>
              </div>
            )}

            {/* Error overlay */}
            {error && !isActive && !hasRedirected && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
                <div className="text-center space-y-3 p-6">
                  <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                  <p className="text-sm font-semibold text-foreground">
                    {error.type === 'permission' ? 'Camera Access Denied' : 'Camera Error'}
                  </p>
                  <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                    {error.type === 'permission'
                      ? 'Camera permission was denied. Please allow camera access in your browser settings and try again.'
                      : error.type === 'not-found'
                      ? 'No camera was found on this device.'
                      : error.type === 'not-supported'
                      ? 'Camera is not supported in this browser. Try Chrome or Safari.'
                      : error.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scanned Result Display (non-portfolio URL) */}
        {scannedData && !hasRedirected && (
          <Alert className="border-primary/50 bg-primary/5">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <AlertDescription className="ml-2">
              <p className="font-semibold text-foreground mb-1">QR Code Scanned</p>
              <p className="text-sm text-muted-foreground break-all mb-3">{scannedData}</p>
              <div className="flex flex-wrap gap-2">
                {scannedData.startsWith('http') && (
                  <Button size="sm" onClick={handleVisitScannedUrl}>
                    Open URL
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={handleRetry}>
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                  Scan Again
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {/* Start button when not active and no result */}
          {!isActive && !error && !scannedData && !hasRedirected && !isLoading && (
            <Button
              onClick={startScanning}
              disabled={isLoading}
              size="lg"
              className="min-w-[160px]"
            >
              <Camera className="mr-2 h-5 w-5" />
              Start Scanning
            </Button>
          )}

          {/* Stop button while active */}
          {isActive && !hasRedirected && (
            <>
              <Button
                onClick={stopScanning}
                disabled={isLoading}
                variant="outline"
                size="lg"
                className="min-w-[140px]"
              >
                Stop Scanning
              </Button>

              {isMobile && (
                <Button
                  onClick={switchCamera}
                  disabled={isLoading}
                  variant="outline"
                  size="lg"
                >
                  <SwitchCamera className="mr-2 h-5 w-5" />
                  Switch Camera
                </Button>
              )}
            </>
          )}

          {/* Retry after error */}
          {error && !hasRedirected && (
            <Button
              onClick={handleRetry}
              disabled={isLoading}
              size="lg"
              className="min-w-[140px]"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-5 w-5" />
              )}
              Retry Camera
            </Button>
          )}
        </div>

        {/* Scanning instructions */}
        {isScanning && !hasRedirected && (
          <div className="text-center space-y-1 p-4 bg-muted/50 rounded-xl border border-border/50">
            <p className="text-sm font-medium text-foreground">Scanning Active</p>
            <p className="text-xs text-muted-foreground">
              Hold your device steady and align the QR code within the frame
            </p>
          </div>
        )}

        {/* Fallback link to portfolio */}
        <div className="text-center pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">Can't scan? Visit directly:</p>
          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline break-all"
          >
            {PORTFOLIO_URL}
          </a>
        </div>
      </div>
    </div>
  );
}
