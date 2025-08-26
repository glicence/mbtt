import React, { useState } from 'react';
import { Category, Product as ProductType } from '../../../types';

import styles from './category-details.module.css';

const Product = ({ name, icon, description }: ProductType) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.product} key={name}>
      <h4 className={styles.productHeading}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={isOpen ? styles.buttonOpen : styles.buttonClosed}
        >
          {name}
        </button>
      </h4>
      {isOpen && (
        <>
          <img src={`/assets/${icon}`} className={styles.productIcon} />
          <p className={styles.productDescription}>{description}</p>
        </>
      )}
    </div>
  );
};

export const CategoryDetails = ({ category }: { category: Category }) => {
  return (
    <div className={styles.category}>
      <h2>{category.name}</h2>
      <div className={styles.products}>{category.products.map(Product)}</div>
    </div>
  );
};
