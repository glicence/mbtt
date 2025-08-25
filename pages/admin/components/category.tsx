import React, { useState } from 'react';
import { Category as CategoryType } from '../../../types';

import styles from './category.module.css';

type FieldProps = {
  value: string;
  id: string;
  onChange: (e: { target: { value: string } }) => void;
};

const Field = ({ value, onChange, id }: FieldProps) => (
  <input value={value} onChange={onChange} id={id} />
);

export const Category = ({
  category: initialCategory,
}: {
  category: CategoryType;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState(initialCategory);
  const [error, setError] = useState('');

  const editName = (e: { target: { value: string } }) => {
    setCategory({ ...category, name: e.target.value });
  };

  const onSave = async () => {
    const res = await fetch(`http://localhost:4000/categories/${category.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });

    if (res.ok) {
      setIsEditing(false);
    } else {
      setError('Unable to save');
    }
  };

  return (
    <div className={styles.category}>
      <div>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            if (isEditing) setCategory(initialCategory);
          }}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing && <button onClick={onSave}>save</button>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
      {isEditing ? (
        <>
          <label htmlFor="categoryName">
            Category Name:
            <Field
              value={category.name}
              onChange={editName}
              id="categoryName"
            />
          </label>
        </>
      ) : (
        <h2>{category.name}</h2>
      )}

      <h3>Products</h3>
      <div className={styles.products}>
        {category.products.map((product) => (
          <div className={styles.product} key={product.name}>
            <h4>{product.name}</h4>
            <img src={product.icon} />
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
