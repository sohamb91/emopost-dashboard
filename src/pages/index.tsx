import Link from 'next/link';

import { CommonLayout, DashboardLayout } from '@/layouts';

const Index = () => {
  return (
    <div>
      this is index view
      <Link
        href="/"
        style={{ textDecoration: 'none !important' }}
        className="hover:no-underline"
      >
        <span>hello </span>
      </Link>
      <a style={{ textDecoration: 'none !important' }}>hello</a>
    </div>
  );
};

Index.getLayout = (page: any) => (
  <DashboardLayout>
    <CommonLayout>{page}</CommonLayout>
  </DashboardLayout>
);

export default Index;
