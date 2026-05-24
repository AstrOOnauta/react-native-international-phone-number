import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const siteUrl = 'https://astroonauta.github.io';
const siteBaseUrl = '/react-native-international-phone-number/';
const repoUrl = 'https://github.com/AstrOOnauta/react-native-international-phone-number';
const npmUrl = 'https://www.npmjs.com/package/rn-international-phone-number';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: 'rn-international-phone-number',
  description:
    'International mobile phone input component for React Native with auto-formatting mask, validation, line-type detection, smart paste, dynamic placeholder, headless hook, and i18n for 33 languages. Works on iOS, Android and Web.',
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
  url: siteUrl + siteBaseUrl,
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
    'react-hook-form',
    'formik',
    'tanstack-form',
    'accessibility',
    'i18n',
  ],
};

const config: Config = {
  title: 'rn-international-phone-number',
  tagline:
    'International phone number input for React Native — mask, validation, line-type detection, 33 languages, iOS/Android/Web',
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
          'react native phone input, international phone number, libphonenumber, country picker, flag picker, phone mask, react native expo, react native web, react hook form phone, formik phone, tanstack form phone, phone validation, MOBILE FIXED_LINE TOLL_FREE detection',
      },
    },
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://img.shields.io'},
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/react-native-international-phone-number/img/apple-touch-icon.png',
      },
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify(jsonLd),
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
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og.png',
    metadata: [
      {
        name: 'description',
        content:
          'International phone number input for React Native: auto-formatting per country, validation, line-type detection, smart paste, 33 languages, iOS/Android/Web, RHF/Formik/TanStack Form ready.',
      },
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'rn-international-phone-number'},
      {
        name: 'twitter:description',
        content:
          'React Native international phone number input — mask, validation, 33 languages, iOS/Android/Web.',
      },
      {name: 'twitter:image', content: siteUrl + siteBaseUrl + 'img/og.png'},
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'rn-international-phone-number'},
      {property: 'og:locale', content: 'en_US'},
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'rn-international-phone-number',
      logo: {
        alt: 'rn-international-phone-number logo',
        src: 'img/logo.png',
      },
      items: [
        {to: '/installation', label: 'Installation', position: 'left'},
        {to: '/quick-start', label: 'Quick Start', position: 'left'},
        {to: '/api/props', label: 'API', position: 'left'},
        {to: '/guides/theming', label: 'Guides', position: 'left'},
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
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
