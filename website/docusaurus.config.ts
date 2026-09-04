import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const siteUrl = 'https://astroonauta.github.io';
const siteBaseUrl = '/react-native-international-phone-number/';
const siteHref = siteUrl + siteBaseUrl;
const repoUrl = 'https://github.com/AstrOOnauta/react-native-international-phone-number';
const npmUrl = 'https://www.npmjs.com/package/rn-international-phone-number';

const siteDescription =
  'International phone number input for React Native, Expo and React Native Web: auto-formatting mask per country, validation, line-type detection, smart paste, country picker, 33 languages, iOS/Android/Web, React Hook Form / Formik / TanStack Form ready.';

// Set at build time (GitHub Actions secrets/vars) so no placeholder IDs are committed.
const gtagTrackingID = process.env.GA_MEASUREMENT_ID;
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareSourceCode',
      '@id': `${siteHref}#software`,
      name: 'rn-international-phone-number',
      alternateName: 'react-native-international-phone-number',
      description: siteDescription,
      codeRepository: repoUrl,
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'React Native',
      license: 'https://opensource.org/licenses/ISC',
      author: {
        '@type': 'Person',
        name: 'AstrOOnauta',
        url: 'https://github.com/AstrOOnauta',
      },
      downloadUrl: npmUrl,
      url: siteHref,
      keywords: [
        'react-native',
        'phone-input',
        'international-phone-number',
        'libphonenumber-js',
        'country-picker',
        'expo',
        'ios',
        'android',
        'web',
        'mask-input',
        'phone-validation',
        'react-hook-form',
        'formik',
        'tanstack-form',
        'accessibility',
        'i18n',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteHref}#website`,
      url: siteHref,
      name: 'React Native International Phone Number Input',
      description: siteDescription,
      inLanguage: 'en',
      about: {'@id': `${siteHref}#software`},
      publisher: {
        '@type': 'Person',
        name: 'AstrOOnauta',
        url: 'https://github.com/AstrOOnauta',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteHref}search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

const config: Config = {
  title: 'React Native International Phone Number Input',
  tagline:
    'Phone input for React Native with per-country mask, validation, line-type detection, country picker and 33 languages — iOS, Android and Web',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
    faster: true,
  },

  url: siteUrl,
  baseUrl: siteBaseUrl,
  trailingSlash: false,

  organizationName: 'AstrOOnauta',
  projectName: 'react-native-international-phone-number',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'meta',
      attributes: {name: 'application-name', content: 'rn-international-phone-number'},
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content:
          'react native phone input, react native international phone number, react native phone number input, libphonenumber, country picker, country code picker, flag picker, phone mask, react native expo, react native web, react hook form phone, formik phone, tanstack form phone, phone validation, MOBILE FIXED_LINE TOLL_FREE detection',
      },
    },
    ...(googleSiteVerification
      ? [
          {
            tagName: 'meta',
            attributes: {
              name: 'google-site-verification',
              content: googleSiteVerification,
            },
          },
        ]
      : []),
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://img.shields.io'},
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: `${siteBaseUrl}img/apple-touch-icon.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'text/plain',
        title: 'llms.txt',
        href: `${siteBaseUrl}llms.txt`,
      },
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify(structuredData),
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl:
            'https://github.com/AstrOOnauta/react-native-international-phone-number/edit/master/website/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.7,
          filename: 'sitemap.xml',
          ignorePatterns: ['**/search'],
          createSitemapItems: async ({defaultCreateSitemapItems, ...rest}) => {
            const items = (await defaultCreateSitemapItems(rest)).filter(
              // The local-search results page has no content of its own.
              (item) => !item.url.endsWith('/search'),
            );
            // Rank the entry points above the long tail so crawl budget lands
            // on the pages people actually search for.
            const priorityByPath: Record<string, number> = {
              '': 1.0,
              installation: 0.9,
              'quick-start': 0.9,
              'api/props': 0.9,
              'guides/props-by-example': 0.9,
              faq: 0.8,
              migration: 0.8,
              'guides/validation': 0.8,
              contributing: 0.3,
            };
            return items.map((item) => {
              const path = item.url
                .replace(siteHref, '')
                .replace(/^\/+|\/+$/g, '');
              const priority = priorityByPath[path];
              return priority === undefined ? item : {...item, priority};
            });
          },
        },
        ...(gtagTrackingID
          ? {gtag: {trackingID: gtagTrackingID, anonymizeIP: true}}
          : {}),
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsRouteBasePath: '/',
        indexBlog: false,
        indexPages: true,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarShortcutHint: false,
      },
    ],
  ],

  themeConfig: {
    image: 'img/og.png',
    metadata: [
      {name: 'description', content: siteDescription},
      {name: 'twitter:card', content: 'summary_large_image'},
      {
        name: 'twitter:title',
        content: 'React Native International Phone Number Input',
      },
      {
        name: 'twitter:description',
        content:
          'React Native phone number input — per-country mask, validation, line-type detection, 33 languages, iOS/Android/Web.',
      },
      {name: 'twitter:image', content: `${siteHref}img/og.png`},
      {property: 'og:type', content: 'website'},
      {
        property: 'og:site_name',
        content: 'React Native International Phone Number Input',
      },
      {property: 'og:locale', content: 'en_US'},
    ],
    announcementBar: {
      id: 'package-rename-v0-14',
      content:
        '📦 Install <b>rn-international-phone-number</b> — the old <code>react-native-international-phone-number</code> package is no longer maintained. <a href="/react-native-international-phone-number/migration">Migration guide</a>.',
      isCloseable: true,
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'rn-international-phone-number',
      logo: {
        alt: 'React Native International Phone Number Input logo',
        src: 'img/logo.png',
      },
      items: [
        {to: '/installation', label: 'Installation', position: 'left'},
        {to: '/quick-start', label: 'Quick Start', position: 'left'},
        {to: '/api/props', label: 'API', position: 'left'},
        {to: '/guides/theming', label: 'Guides', position: 'left'},
        {to: '/faq', label: 'FAQ', position: 'left'},
        {
          href: npmUrl,
          label: 'npm',
          position: 'right',
        },
        {
          href: repoUrl,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Introduction', to: '/'},
            {label: 'Installation', to: '/installation'},
            {label: 'Quick Start', to: '/quick-start'},
            {label: 'Props', to: '/api/props'},
            {label: 'Hooks', to: '/api/hooks'},
          ],
        },
        {
          title: 'Guides',
          items: [
            {label: 'Theming', to: '/guides/theming'},
            {label: 'Validation', to: '/guides/validation'},
            {label: 'Internationalization', to: '/guides/i18n'},
            {label: 'Accessibility', to: '/guides/accessibility'},
            {label: 'Testing', to: '/guides/testing'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub', href: repoUrl},
            {label: 'Issues', href: `${repoUrl}/issues`},
            {label: 'Pull Requests', href: `${repoUrl}/pulls`},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'FAQ & Troubleshooting', to: '/faq'},
            {label: 'Migration', to: '/migration'},
            {label: 'Changelog', to: '/changelog'},
            {label: 'npm', href: npmUrl},
            {
              label: 'Expo Snack Demo',
              href: 'https://snack.expo.dev/@astroonauta/react-native-international-phone-number',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AstrOOnauta. Released under the ISC License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
