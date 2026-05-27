# SEO Launch Checklist

Use this checklist when the site goes live at `https://247managed.com/`.

## Before Launch

- Confirm every page returns `200 OK` over HTTPS.
- Confirm `https://247managed.com/` redirects consistently from `http://`, `www`, and any alternate hostnames.
- Confirm `robots.txt` is available at `https://247managed.com/robots.txt`.
- Confirm `sitemap.xml` is available at `https://247managed.com/sitemap.xml`.
- Confirm all canonical URLs use the production domain.
- Run the homepage and key service pages through Google's Rich Results Test.
- Run a Lighthouse/PageSpeed check for mobile performance and accessibility.
- Replace any placeholder proof with approved client testimonials only when permission is documented.

## Google Search Console

- Add a Domain property for `247managed.com`.
- Verify DNS ownership.
- Submit `https://247managed.com/sitemap.xml`.
- Inspect the homepage with URL Inspection.
- Request indexing for the homepage after the live test passes.
- Inspect and request indexing for the six service pages:
  - `https://247managed.com/dotnet-development/`
  - `https://247managed.com/blazor-development/`
  - `https://247managed.com/swiftui-development/`
  - `https://247managed.com/api-integrations/`
  - `https://247managed.com/application-modernization/`
  - `https://247managed.com/managed-application-support/`
- Inspect and request indexing for the blog index and first article pages:
  - `https://247managed.com/blog/`
  - `https://247managed.com/blog/dotnet-modernization-plan/`
  - `https://247managed.com/blog/blazor-portal-planning/`
  - `https://247managed.com/blog/swiftui-business-apps/`
  - `https://247managed.com/blog/api-integration-checklist/`
  - `https://247managed.com/blog/managed-application-support/`

## Bing Webmaster Tools

- Add and verify `247managed.com`.
- Import the Google Search Console property if available.
- Submit `https://247managed.com/sitemap.xml`.
- Check crawl/indexing reports after launch.

## Google Business Profile

- Claim or create the Business Profile for 247 Managed Network Solutions.
- Use the same NAP details as the website:
  - 2441 Peach Avenue, Fairfield, Iowa 52556
  - (319) 383-1344
  - sales@247managed.com
- Add the website URL.
- Add business category, service area, hours, services, and photos.
- Request real reviews from clients when appropriate and respond to them.

## Exposure Plan

- Create or update the LinkedIn company page.
- Add the website link to email signatures and social profiles.
- Add listings in reputable local directories and relevant business associations.
- Publish approved case studies or testimonials as soon as they are available.
- Add one useful article per month around .NET modernization, Blazor portals, SwiftUI business apps, API integrations, and managed application support.
- When publishing a new article, add it to `/blog/`, link it from at least one relevant service page, add Article JSON-LD, and update `sitemap.xml`.

## Measurement

- Install analytics only after choosing the privacy approach.
- Track contact form starts/submits, email clicks, and phone clicks.
- Review Search Console queries monthly and expand pages around real search demand.
