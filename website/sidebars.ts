import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    'installation',
    'quick-start',
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api/props',
        'api/ref',
        'api/hooks',
        'api/utilities',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/props-by-example',
        'guides/theming',
        'guides/i18n',
        'guides/validation',
        'guides/accessibility',
        'guides/testing',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: true,
      items: [
        'examples/class-component',
        'examples/use-ref',
        'examples/default-value',
        'examples/react-hook-form',
        'examples/formik',
        'examples/tanstack-form',
      ],
    },
    'faq',
    'migration',
    'changelog',
    'contributing',
  ],
};

export default sidebars;
