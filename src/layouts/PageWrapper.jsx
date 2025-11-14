import React from 'react';
import Layout from '../layouts/layout';

const PageWrapper = (PageComponent) => {
  return function WrappedPage(props) {
    return (
      <Layout>
        <PageComponent {...props} />
      </Layout>
    );
  };
};

export default PageWrapper;
