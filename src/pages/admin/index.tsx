import React from 'react';
import { Data } from '../../../types';
import { Admin } from '../../components/admin/admin';

export default function Page({ data }: { data: Data }) {
  return <Admin data={data} />;
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:4000/categories');
  const data = await res.json();

  return {
    props: { data },
  };
}
