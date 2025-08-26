import React from 'react';
import { Data } from '../../types';
import { ProductRange } from '../components/product-range/product-range';
import Head from 'next/head';

export default function Page({ data }: { data: Data }) {
  return (
    <>
      <Head>
        <title>Moneybox Products</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <ProductRange data={data} />
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:4000/categories');
  const data = await res.json();

  return {
    props: { data },
  };
}
