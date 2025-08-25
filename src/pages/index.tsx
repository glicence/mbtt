import React from 'react';
import { Data } from '../../types';
import { ProductRange } from '../components/product-range/product-range';

export default function Page({ data }: { data: Data }) {
  return <ProductRange data={data} />;
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:4000/categories');
  const data = await res.json();

  return {
    props: { data },
  };
}
