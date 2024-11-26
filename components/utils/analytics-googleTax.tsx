declare global {
    interface Window {
      dataLayer: any[];
      gtag: (...args: any[]) => void;
    }
  }
  
  export const pageview = (url: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_TAG_ID!, {
        page_path: url,
      });
    }
  };
  
  export const event = ({ action, category, label, value }: {
    action: string;
    category: string;
    label: string;
    value?: number;
  }) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };
  
  // Common events
  export const gtagEvents = {
    signUp: (method: string) => {
      event({
        action: 'sign_up',
        category: 'engagement',
        label: method,
      });
    },
    purchase: (value: number, currency: string = 'USD', items: any[]) => {
      window.gtag('event', 'purchase', {
        currency,
        value,
        items,
      });
    },
    addToCart: (item: any) => {
      window.gtag('event', 'add_to_cart', {
        currency: 'USD',
        items: [item],
      });
    },
    viewItem: (item: any) => {
      window.gtag('event', 'view_item', {
        currency: 'USD',
        items: [item],
      });
    },
  };