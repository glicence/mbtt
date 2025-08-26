import React, { useState } from 'react';
import { Data } from '../../../types';
import { Category } from '../category/category';

import styles from './admin.module.css';

export const Admin = ({ data }: { data: Data }) => {
  const [categories, setCategories] = useState(data);
  const [error, setError] = useState('');

  const addCategory = async () => {
    const res = await fetch('http://localhost:4000/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'new category', products: [] }),
    });

    if (res.ok) {
      const category = await res.json();
      setCategories([...categories, category]);
    } else {
      setError('Failed to add category');
    }
  };

  const removeCategory = async (id: string) => {
    const res = await fetch(`http://localhost:4000/categories/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'new category', products: [] }),
    });

    if (res.ok) {
      setCategories([...categories.filter((category) => category.id !== id)]);
    } else {
      setError('Failed to remove category');
    }
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

      <div className={styles.categories}>
        <h2 className={styles.subheading}>Admin</h2>
        <p>Manage, edit and add new categories and products</p>

        {categories.map((category, index) => (
          <div key={category.id} className={styles.category}>
            <h2>Category {index + 1}</h2>

            <Category category={category} removeCategory={removeCategory} />
          </div>
        ))}

        <div className={styles.add}>
          <button onClick={addCategory} className="button edit">
            Add category
          </button>

          <p className={styles.error}>{error}</p>
        </div>
      </div>
    </>
  );
};
