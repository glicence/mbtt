import React from 'react';
import { Category } from '../../../types';

import styles from './category-details.module.css';

export const CategoryDetails = ({ category }: { category: Category }) => {
  return (
    <div className={styles.category}>
      <h2>{category.name}</h2>
      <h3>Products</h3>
      <div className={styles.products}>
        {category.products.map((product) => (
          <div className={styles.product} key={product.name}>
            <h4>{product.name}</h4>
            <img src={`/assets/${product.icon}`} />
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
