import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'secondprojectforstencil',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      
      copy: [
        { src: 'assets', dest: 'assets' },
      ],
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
