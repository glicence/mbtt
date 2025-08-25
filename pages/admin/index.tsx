import React from 'react';
import { Data } from '../../types';
import { Category } from './components/category';

import styles from './index.module.css';

export default function Page({ data }: { data: Data }) {
  console.log(data);

  return (
    <>
      <h1>Admin</h1>

      <div className={styles.categories}>
        {data.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
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
