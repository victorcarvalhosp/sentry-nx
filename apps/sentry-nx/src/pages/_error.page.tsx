import React from 'react';
import * as Sentry from '@sentry/nextjs';
import type { NextPage } from 'next';
import type { ErrorProps } from 'next/error';
import NextErrorComponent from 'next/error';

/**
 * Customizing 500 Error Page
 * https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#create-a-custom-_error-page
 * https://nextjs.org/docs/advanced-features/custom-error-page#more-advanced-error-page-customizing
 */
const CustomErrorComponent: NextPage<ErrorProps> = () => {
  return <div> Some error happened </div>;
};

CustomErrorComponent.getInitialProps = async (contextData) => {
  try {
    // In case this is running in a serverless function, await this in order to give Sentry
    // time to send the error before the lambda exits
    await Sentry.captureUnderscoreErrorException(contextData);
  } catch (error) {
    console.error(error);
    // handleError(error);
  } finally {
    // This will contain the status code of the response
    // todo: this probably doesn't work because return doesn't work in finally
    // eslint-disable-next-line no-unsafe-finally
    return NextErrorComponent.getInitialProps(contextData);
  }
};

export default CustomErrorComponent;
