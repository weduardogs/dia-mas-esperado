export const isMobileDevice = (): boolean => {
  // Check if running in browser environment
  if (typeof window === 'undefined') {
    return false;
  }

  // User agent detection for mobile devices
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    'android',
    'webos',
    'iphone',
    'ipad',
    'ipod',
    'blackberry',
    'windows phone',
    'mobile',
    'opera mini',
    'iemobile'
  ];

  const isMobileUserAgent = mobileKeywords.some(keyword => 
    userAgent.includes(keyword)
  );

  // Screen size detection (mobile-like dimensions)
  const isMobileScreenSize = window.innerWidth <= 768 && window.innerHeight <= 1024;

  // Touch capability detection
  const hasTouchCapability = 'ontouchstart' in window || 
                            navigator.maxTouchPoints > 0 || 
                            (navigator as any).msMaxTouchPoints > 0;

  // Orientation API detection (typically available on mobile)
  const hasOrientationAPI = 'orientation' in window || 'onorientationchange' in window;

  // Combine multiple detection methods for better accuracy
  return isMobileUserAgent || (isMobileScreenSize && hasTouchCapability) || hasOrientationAPI;
};

export const getMobileDeviceType = (): string => {
  if (typeof window === 'undefined') {
    return 'unknown';
  }

  const userAgent = navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('iphone')) return 'iPhone';
  if (userAgent.includes('ipad')) return 'iPad';
  if (userAgent.includes('android')) return 'Android';
  if (userAgent.includes('windows phone')) return 'Windows Phone';
  if (userAgent.includes('blackberry')) return 'BlackBerry';
  
  return 'Mobile Device';
};