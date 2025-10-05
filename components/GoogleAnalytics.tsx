import Script from 'next/script';

export default function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  if (!GA_ID) {
    return null; // Don't render if GA_ID is not set
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Analytics events helper
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

// Predefined events
export const analytics = {
  bookView: (bookId: string, title: string) => {
    trackEvent('book_view', { book_id: bookId, book_title: title });
  },
  
  chapterRead: (chapterId: string, title: string) => {
    trackEvent('chapter_read', { chapter_id: chapterId, chapter_title: title });
  },
  
  likeAction: (itemType: 'book' | 'chapter', itemId: string, action: 'like' | 'unlike') => {
    trackEvent('like_action', { item_type: itemType, item_id: itemId, action });
  },
  
  commentAdd: (itemType: 'book' | 'chapter', itemId: string) => {
    trackEvent('comment_add', { item_type: itemType, item_id: itemId });
  },
  
  newsletterSubscribe: (email: string) => {
    trackEvent('newsletter_subscribe', { email_hash: btoa(email) });
  },
  
  socialShare: (platform: string, url: string) => {
    trackEvent('social_share', { platform, url });
  },
};
