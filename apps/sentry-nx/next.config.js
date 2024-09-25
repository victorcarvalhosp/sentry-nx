//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nx/next');
const { withSentryConfig } = require('@sentry/nextjs');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  experimental: {
    instrumentationHook: true,
  },
  pageExtensions: ['page.tsx', 'page.ts', 'api.tsx', 'api.ts'],
  distDir: 'dist',
  sentry: {
    // This will be true by default on Sentry 8.0 so meanwhile we need to force its usage
    hideSourceMaps: true,
    // Since we added sideEffects to our package.json, we need to set this to true
    // otherwise Sentry will not be able to connect the source maps properly
    // Docs about this setting: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#widen-the-upload-scope
    widenClientFileUpload: true,
  },
};

/**
 * @type {any[]}
 */
const plugins = [
  // Add more Next.js plugins to this list if needed.
  // withNx,
  // sentryPlugin,
];

module.exports = async (
  /** @type {string} */ phase,
  /** @type {any} */ context
) => {
  let updatedConfig = plugins.reduce((acc, fn) => fn(acc), nextConfig);

  updatedConfig = await withNx(updatedConfig)(phase, context);

  /** Use this if using Sentry 8 or higher */
  // updatedConfig = withSentryConfig(updatedConfig, {
  //   widenClientFileUpload: true,
  //   hideSourceMaps: true,
  // });

  /** Use this if using Sentry 7 */
  updatedConfig = withSentryConfig(updatedConfig);

  return updatedConfig;
};
