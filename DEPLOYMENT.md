# Deployment Guide
## 247 Managed Network Solutions Website

This document covers deployment procedures, verification steps, and launch checklist for the 247 Managed Network Solutions website.

---

## Current Deployment Method

### GitHub Pages (Automatic)

The site deploys automatically via GitHub Actions when code is pushed to the `main` branch.

**Workflow File**: `.github/workflows/pages.yml`

**Process**:
1. Push commits to `main` branch
2. GitHub Actions runs automatically
3. Site content is uploaded to GitHub Pages
4. Deployment completes in 2-3 minutes
5. Live at https://247managed.com

**Manual Trigger** (if needed):
```bash
# Navigate to repository on GitHub
# Go to Actions tab
# Select "Deploy GitHub Pages" workflow
# Click "Run workflow" button
```

---

## Pre-Deployment Checklist

### Code Quality

- [ ] All HTML files validate (W3C validator)
- [ ] No JavaScript console errors
- [ ] All internal links resolve correctly
- [ ] All images have alt text
- [ ] Contact form generates proper mailto link
- [ ] Mobile menu opens and closes correctly
- [ ] FAQ accordions work properly
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Motion pause control functions correctly

### Content Verification

- [ ] **CEO section**: Replace placeholder with actual name, photo, and bio
- [ ] **Social media URLs**: Update all social link placeholders with real URLs
- [ ] **Hero video** (optional): Replace with Higgsfield-generated video or keep static background
- [ ] **Company details**: Verify address (2441 Peach Avenue, Fairfield, Iowa 52556)
- [ ] **Contact info**: Verify phone (319) 383-1344 and email sales@247managed.com
- [ ] All service descriptions are accurate and approved
- [ ] All capabilities match actual business offerings
- [ ] No placeholder content remains visible to users

### SEO & Metadata

- [ ] All pages have unique title tags
- [ ] All pages have unique meta descriptions
- [ ] Canonical URLs are correct (https://247managed.com/)
- [ ] Open Graph images are set and accessible
- [ ] Twitter Card metadata is complete
- [ ] JSON-LD structured data is accurate
- [ ] Sitemap.xml includes all public pages
- [ ] Robots.txt allows indexing (`User-agent: * / Allow: /`)
- [ ] No `noindex` directives on production pages
- [ ] Business address in schema matches physical location

### Performance

- [ ] Images are optimized (<200KB for graphics, <500KB for photos)
- [ ] CSS is minified or reasonably small
- [ ] JavaScript is under 10KB
- [ ] Lighthouse Performance score >90
- [ ] Largest Contentful Paint (LCP) <2.5s
- [ ] First Input Delay (FID) <100ms
- [ ] Cumulative Layout Shift (CLS) <0.1
- [ ] Mobile usability test passes

### Accessibility

- [ ] WCAG AA compliance verified
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators are visible
- [ ] Skip link functions correctly
- [ ] Screen reader testing completed (NVDA/JAWS/VoiceOver)
- [ ] Color contrast ratios meet 4.5:1 minimum
- [ ] Form labels are properly associated
- [ ] ARIA attributes are used correctly
- [ ] Reduced motion preference is respected
- [ ] Motion pause control is accessible

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Responsive Testing

- [ ] 320px width (small phone)
- [ ] 375px width (iPhone)
- [ ] 414px width (large phone)
- [ ] 768px width (tablet)
- [ ] 1024px width (small desktop)
- [ ] 1280px width (desktop)
- [ ] 1920px width (large desktop)

---

## Deployment Steps

### 1. Final Code Review

```bash
# Ensure you're on the feature branch
git branch

# Review all changes
git status
git diff main
```

### 2. Commit Final Changes

```bash
# Stage all changes
git add -A

# Commit with descriptive message
git commit -m "Complete 2027 premium website rebuild

- Modern animated design with WCAG AA accessibility
- Technology showcase pages for .NET 10, Blazor, SwiftUI, React, MAUI
- CEO section with placeholders
- Social media engagement services
- Comprehensive SEO and structured data
- Content kit with AI video/image prompts
- Motion pause control for accessibility
- Responsive design across all devices"
```

### 3. Push to Remote

```bash
# Push feature branch
git push origin cursor/2027-premium-rebuild-97ba

# Wait for any CI checks to complete
```

### 4. Create Pull Request

```bash
# Use GitHub CLI
gh pr create --title "2027 Premium Website Rebuild" --body "See README.md for complete documentation"

# Or use GitHub web interface
```

### 5. Review and Merge

1. Review the pull request
2. Check deployment preview (if available)
3. Verify all changes
4. Merge to `main` branch
5. Monitor GitHub Actions deployment

### 6. Verify Live Site

```bash
# Wait 2-3 minutes for deployment
# Visit https://247managed.com

# Check these URLs specifically:
open https://247managed.com/
open https://247managed.com/dotnet-development/
open https://247managed.com/react-development/
open https://247managed.com/swiftui-development/
```

---

## Post-Deployment Verification

### Immediate Checks (within 5 minutes)

1. **Homepage loads** correctly with no errors
2. **Navigation** works on mobile and desktop
3. **Contact form** generates email correctly
4. **Phone and email links** work
5. **Logo links** back to homepage
6. **All service pages** render properly
7. **No broken images** or missing assets
8. **CSS and JavaScript** load correctly

### Detailed Checks (within 1 hour)

1. **Test all links** systematically
2. **Verify meta tags** in page source
3. **Check Open Graph** with Facebook Debugger
4. **Verify Twitter Cards** with Twitter Card Validator
5. **Run Lighthouse audit** on key pages
6. **Test contact form** on actual devices
7. **Verify mobile menu** on real phone
8. **Check animations** with motion enabled and paused

### SEO Setup (within 24 hours)

1. **Submit sitemap** to Google Search Console
2. **Submit sitemap** to Bing Webmaster Tools
3. **Verify robots.txt** is accessible
4. **Check indexing status** in Search Console
5. **Set up Google Analytics 4** (if approved)
6. **Configure Google Business Profile** (if not already done)
7. **Verify local business listings** are accurate

---

## Rollback Procedure

If critical issues are discovered after deployment:

### Option 1: Quick Fix

```bash
# Make urgent fix on main branch
git checkout main
git pull origin main

# Make minimal fix
# ... edit files ...

git add -A
git commit -m "Hotfix: [describe issue]"
git push origin main

# Deployment runs automatically
```

### Option 2: Revert to Previous Version

```bash
# Find last good commit
git log --oneline -n 10

# Revert to specific commit
git revert <commit-hash>
git push origin main

# Or reset to previous commit (use with caution)
git reset --hard <commit-hash>
git push origin main --force
```

### Option 3: Emergency Rollback

1. Go to GitHub repository
2. Navigate to Actions tab
3. Find last successful deployment before issues
4. Manually trigger re-deployment of that version

---

## Monitoring

### What to Monitor

- **Uptime**: Is the site accessible?
- **Performance**: Are pages loading quickly?
- **Errors**: Any 404s or broken links?
- **Traffic**: Unusual spikes or drops?
- **Search Console**: Crawl errors or indexing issues?

### Tools

- **GitHub Pages Status**: https://www.githubstatus.com/
- **Google Search Console**: Monitor indexing and errors
- **Google Analytics**: Track traffic and user behavior
- **Lighthouse CI**: Automated performance monitoring
- **Uptime monitoring**: Consider UptimeRobot or similar

---

## Placeholder Replacement Checklist

### Must Replace Before Production

**Priority 1 - Critical**:
- [ ] CEO name in homepage and about page
- [ ] CEO photo (save as `/assets/ceo-photo.jpg`, 600x600 minimum)
- [ ] CEO biography (2-3 paragraphs, authentic content)
- [ ] Social media URLs (LinkedIn, Twitter, GitHub, etc.)

**Priority 2 - Important**:
- [ ] Hero video (generate with Higgsfield or keep static background)
- [ ] Section graphics (generate with AI using provided prompts)

**Priority 3 - Enhancement**:
- [ ] Technology stack illustrations
- [ ] Process phase visuals
- [ ] Service page graphics

### Search for Placeholders

```bash
# Find all TODO comments in HTML
grep -r "TODO:" --include="*.html" .

# Find placeholder text
grep -r "placeholder" --include="*.html" .
grep -r "TODO" --include="*.md" content-kit/
```

---

## Content Updates

### Regular Content Updates

For blog posts, service updates, or minor content changes:

1. Edit HTML files directly
2. Commit changes with clear message
3. Push to `main` branch
4. Automatic deployment will handle the rest

### Major Redesigns

For significant design or structure changes:

1. Create new feature branch
2. Make changes
3. Test thoroughly
4. Create pull request
5. Review before merging

---

## Domain Configuration

### Current Setup

- **Domain**: 247managed.com
- **Host**: GitHub Pages
- **SSL**: Automatic via GitHub
- **CNAME file**: Present in repository root

### If Changing Domains

1. Update `CNAME` file with new domain
2. Update all canonical URLs in HTML
3. Update sitemap.xml
4. Update robots.txt
5. Update JSON-LD schema URLs
6. Update Open Graph URLs
7. Configure DNS:
   - `A` record to GitHub Pages IPs
   - `CNAME` record from www to apex
8. Submit new sitemap to search engines
9. Set up 301 redirects from old domain

---

## Security

### Headers

GitHub Pages provides:
- HTTPS (automatic)
- Basic security headers

Consider adding via Cloudflare (if used):
- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`

### Contact Form

Current implementation uses `mailto:` links:
- ✅ No backend = No server vulnerabilities
- ✅ No database = No data breach risk
- ⚠️ Relies on user's email client
- ⚠️ Less convenient than modern forms

**To add backend** (future enhancement):
1. Choose service (Formspree, Netlify Forms, custom API)
2. Add server-side validation
3. Implement rate limiting
4. Add CAPTCHA if needed
5. Update privacy policy
6. Configure email delivery
7. Set up failure notifications

---

## Troubleshooting

### Site Not Updating

**Problem**: Changes pushed but site doesn't update

**Solutions**:
1. Check GitHub Actions status (should be green)
2. Wait 2-3 minutes for propagation
3. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
4. Try incognito/private browsing mode
5. Check CNAME file is correct
6. Verify DNS settings

### 404 Errors

**Problem**: Pages return 404

**Solutions**:
1. Verify file exists in repository
2. Check file path capitalization (case-sensitive)
3. Ensure directory has `index.html`
4. Check sitemap.xml lists the URL
5. Verify GitHub Pages is serving from correct branch

### Images Not Loading

**Problem**: Images show broken

**Solutions**:
1. Verify image files are in `/assets/` directory
2. Check file paths in HTML (case-sensitive)
3. Confirm images are committed to repository
4. Verify image formats are web-compatible (JPG, PNG, WebP, SVG)
5. Check file sizes aren't too large (>10MB may fail)

### Contact Form Not Working

**Problem**: Email doesn't open or content is wrong

**Solutions**:
1. Check `mailto:` link format
2. Verify email address is correct
3. Test on different email client
4. Check URL encoding of body content
5. Verify JavaScript form handler is loading

---

## Analytics Setup (Optional)

### Google Analytics 4

If approved by owner:

1. Create GA4 property
2. Get measurement ID
3. Add tracking code to `index.html` before `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

4. Update privacy policy
5. Add cookie consent if required
6. Configure data retention settings
7. Set up conversion tracking

### Privacy-Friendly Alternatives

Consider privacy-focused analytics:
- **Plausible** (privacy-first, no cookies)
- **Fathom** (privacy-focused)
- **Simple Analytics** (GDPR compliant)
- **Matomo** (self-hosted option)

---

## Support Contacts

### Technical Issues

- **GitHub Repository**: https://github.com/247managed/247web
- **GitHub Pages Status**: https://www.githubstatus.com/
- **GitHub Support**: https://support.github.com/

### Business Contact

- **Email**: sales@247managed.com
- **Phone**: (319) 383-1344
- **Address**: 2441 Peach Avenue, Fairfield, Iowa 52556

---

## Version History

- **v2.0** (2027-01-15): Complete premium rebuild with modern animations, comprehensive technology showcase, content kit
- **v1.0** (Previous): Original static site

---

*Last Updated: January 2027*
