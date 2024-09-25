//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
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

const sentryPlugin = (/** @type {any} */ passedConfig) =>
  withSentryConfig(passedConfig, {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // org: 'webalys',
    // project: 'sentry-nx-issue-test',

    // // Only print logs for uploading source maps in CI
    // silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    // disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    // automaticVercelMonitors: true,
  });

/**
 * @type {any[]}
 */
const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  sentryPlugin,
];

module.exports = composePlugins(...plugins)(nextConfig);

// module.exports = async (
//   /** @type {string} */ phase,
//   /** @type {any} */ context
// ) => {
//   let updatedConfig = plugins.reduce((acc, fn) => fn(acc), nextConfig);

//   updatedConfig = await withNx(updatedConfig)(phase, context);
//   updatedConfig = withSentryConfig(updatedConfig);

//   return updatedConfig;
// };
