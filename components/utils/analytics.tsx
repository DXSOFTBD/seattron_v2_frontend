declare global {
    interface Window {
      fbq: any;
    }
  }
  
  export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
  
  export const pageview = () => {
    window.fbq('track', 'PageView')
  }
  
  // Track specific events
  export const event = (name: string, options = {}) => {
    window.fbq('track', name, options)
  }
  
  // Common events
  export const fbEvents = {
    addToCart: (value?: number, currency?: string) => {
      event('AddToCart', { value, currency })
    },
    purchase: (value: number, currency: string) => {
      event('Purchase', { value, currency })
    },
    signUp: () => {
      event('CompleteRegistration')
    },
    contact: () => {
      event('Contact')
    },
    search: (searchString: string) => {
      event('Search', { search_string: searchString })
    },
    viewContent: (contentName: string, contentId?: string) => {
      event('ViewContent', { 
        content_name: contentName,
        content_ids: contentId ? [contentId] : undefined
      })
    }
  }