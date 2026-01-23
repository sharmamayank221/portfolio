(function() {
  const BASE_URL = 'https://invest.tirios.ai/auth/register';
  const PAGE_CODES = {
    'bonus-instagram': 'insta26',
    'bonus-tiktok': 'tiktokB26',
    'bonus-linkedin': 'linkedinB26'
  };

  function getPageSlug() {
    const path = window.location.pathname;
    return Object.keys(PAGE_CODES).find(slug => path.includes(slug));
  }

  const slug = getPageSlug();
  if (!slug) return; // only run on known bonus pages

  function buildTargetUrl() {
    const params = new URLSearchParams(window.location.search);
    params.set('code', PAGE_CODES[slug]); // enforce page-specific code
    const query = params.toString();
    return `${BASE_URL}?${query}`;
  }

  const TARGET_URL = buildTargetUrl();
  // Expanded selectors to catch all "Get Started" and CTA links
  const LINK_SELECTORS = [
    '.link-block-11-1', 
    '.link-block-11',
    'a[href*="invest.tirios.ai"]',
    'a[href*="/auth/register"]',
    'a:has-text("Get Started")',
    'a:has-text("Explore Investments")',
    'a:has-text("Start Investing Today")',
    'a:has-text("Join Tirios")'
  ].join(', ');

  // More specific function to find CTA links
  function findCTALinks() {
    const links = [];
    
    // Find by class selectors
    document.querySelectorAll('.link-block-11-1, .link-block-11').forEach(link => links.push(link));
    
    // Find by href patterns
    document.querySelectorAll('a[href*="invest.tirios.ai"], a[href*="/auth/register"]').forEach(link => links.push(link));
    
    // Find by text content (case-insensitive)
    document.querySelectorAll('a').forEach(link => {
      const text = link.textContent.trim().toLowerCase();
      if (text.includes('get started') || 
          text.includes('explore investments') || 
          text.includes('start investing') ||
          text.includes('join tirios')) {
        links.push(link);
      }
    });
    
    return [...new Set(links)]; // Remove duplicates
  }

  function setupFormRedirect() {
    const form = document.getElementById('wf-form-JoinWaitListBonusForm') || 
                 document.querySelector('form[name*="JoinWaitList"]') ||
                 document.querySelector('form[name*="Bonus"]');
    
    if (!form) {
      setTimeout(setupFormRedirect, 500);
      return;
    }

    const formWrapper = form.closest('.w-form') || form.parentElement;
    const successDiv = formWrapper ? formWrapper.querySelector('.w-form-done') : null;

    if (successDiv) {
      const observer = new MutationObserver(() => {
        if (successDiv.style.display === 'block' || getComputedStyle(successDiv).display !== 'none') {
          setTimeout(() => { 
            window.location.href = TARGET_URL; 
          }, 1500);
        }
      });
      observer.observe(successDiv, { attributes: true, attributeFilter: ['style', 'class'] });
    }

    form.addEventListener('submit', () => {
      let checks = 0;
      const checkInterval = setInterval(() => {
        checks++;
        if (successDiv && getComputedStyle(successDiv).display !== 'none') {
          clearInterval(checkInterval);
          setTimeout(() => { 
            window.location.href = TARGET_URL; 
          }, 1500);
        }
        if (checks > 100) clearInterval(checkInterval);
      }, 100);
    });
  }

  function updateLinks() {
    const links = findCTALinks();
    links.forEach(link => {
      if (link.href !== TARGET_URL) {
        link.href = TARGET_URL;
        // Also set onclick as backup
        link.setAttribute('data-target-url', TARGET_URL);
      }
    });
  }

  // Enhanced click handler
  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;
    
    const text = link.textContent.trim().toLowerCase();
    const href = link.href || link.getAttribute('href') || '';
    
    // Check if it's a CTA link
    const isCTALink = 
      link.classList.contains('link-block-11-1') ||
      link.classList.contains('link-block-11') ||
      href.includes('invest.tirios.ai') ||
      href.includes('/auth/register') ||
      text.includes('get started') ||
      text.includes('explore investments') ||
      text.includes('start investing') ||
      text.includes('join tirios') ||
      link.getAttribute('data-target-url');
    
    if (isCTALink) {
      e.preventDefault();
      e.stopPropagation();
      const targetUrl = link.getAttribute('data-target-url') || TARGET_URL;
      window.location.href = targetUrl;
    }
  }, true);

  // Initialize
  updateLinks();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      updateLinks();
      setupFormRedirect();
    });
  } else {
    setupFormRedirect();
  }

  // Retry updates at intervals
  setTimeout(updateLinks, 500);
  setTimeout(updateLinks, 1000);
  setTimeout(updateLinks, 2000);
  setTimeout(updateLinks, 3000);

  // Watch for dynamically added links
  const observer = new MutationObserver(() => {
    updateLinks();
  });
  observer.observe(document.body || document.documentElement, { 
    childList: true, 
    subtree: true 
  });
})();
