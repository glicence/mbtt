import React from 'react';
import { Data } from '../../../types';
import { CategoryDetails } from '../CategoryDetails/CategoryDetails';

import styles from './product-range.module.css';

export const ProductRange = ({ data }: { data: Data }) => {
  return (
    <>
      <h1>Moneybox</h1>
      <div className={styles.categories}>
        {data.map((category) => (
          <div key={category.id} className={styles.category}>
            <CategoryDetails category={category} />
          </div>
        ))}
      </div>
    </>
  );
};
