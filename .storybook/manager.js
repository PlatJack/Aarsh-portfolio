import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    // brandImage: 'https://platjack.netlify.app/icon.svg',
    brandTitle: 'Aarsh Desai Components',
    brandUrl: 'https://platjack.cf',
  },
});
