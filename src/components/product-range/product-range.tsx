import React, { useRef } from 'react';
import { Data } from '../../../types';
import { CategoryDetails } from '../CategoryDetails/category-details';

import styles from './product-range.module.css';

export const ProductRange = ({ data }: { data: Data }) => {
  const carousel = useRef(null);

  // istanbul ignore next - skipping visual changes in tests
  const move = (pos: number) => {
    const left = carousel.current.scrollLeft;
    carousel.current.scrollLeft = pos * 300 + left;
  };

  return (
    <>
      <h1 className={styles.heading}>
        <span className="visually-hidden">Moneybox</span>
        <a href="https://www.moneyboxapp.com/?" id="logo">
          <img
            width="320"
            src="https://www.moneyboxapp.com/wp-content/uploads/2024/11/MB-logo-400x92-1.svg"
            alt="Moneybox"
          />
        </a>
      </h1>

      <div>
        <h2 className={styles.subheading}>Explore accounts</h2>
      </div>

      <div className={styles.categories_viewport}>
        <button
          className={styles.buttonLeft}
          onClick={
            // istanbul ignore next - skipping visual changes in tests
            () => move(-1)
          }
          aria-label="previous slide"
        />
        <button
          className={styles.buttonRight}
          onClick={
            // istanbul ignore next - skipping visual changes in tests
            () => move(1)
          }
          aria-label="next slide"
        />
        <div className={styles.categories} ref={carousel}>
          {data.map((category, index) => (
            <div
              key={category.id}
              className={styles.category}
              id={`slide${index}`}
            >
              <CategoryDetails category={category} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
