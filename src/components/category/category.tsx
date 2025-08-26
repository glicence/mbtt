import React, { useState } from 'react';
import { Category as CategoryType, Product } from '../../../types';

import styles from './category.module.css';
import { CategoryDetails } from '../CategoryDetails/category-details';

type FieldProps = {
  value: string;
  id: string;
  onChange: (e: { target: { value: string } }) => void;
};

const Field = ({ value, onChange, id }: FieldProps) => (
  <input
    value={value}
    onChange={onChange}
    id={id}
    className={styles.formInput}
  />
);

const IconOptions = () => (
  <>
    <option className={styles.formOption}>stocks_shares_isa.svg</option>
    <option className={styles.formOption}>simple_saver.svg</option>
    <option className={styles.formOption}>personal_pension.svg</option>
    <option className={styles.formOption}>open_access_cash_isa.svg</option>
    <option className={styles.formOption}>lifetime_isa.svg</option>
    <option className={styles.formOption}>junior_isa.svg</option>
    <option className={styles.formOption}>
      general_investment_account.svg
    </option>
    <option className={styles.formOption}>cash_isa.svg</option>
    <option className={styles.formOption}>95_day_notice.svg</option>
    <option className={styles.formOption}>32_day_notice.svg</option>
  </>
);

const defaultProduct = {
  name: '',
  icon: 'stocks_shares_isa.svg',
  description: '',
};

export const Category = ({
  category: initialCategory,
  removeCategory,
}: {
  category: CategoryType;
  removeCategory: (id: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>(defaultProduct);
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
      <div className={styles.buttons}>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            if (isEditing) setCategory(initialCategory);
          }}
          className="button edit"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {!isEditing && (
          <button
            onClick={() => removeCategory(category.id)}
            className="button delete"
          >
            Remove
          </button>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>
      {isEditing ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave();
            }}
            className={styles.form}
          >
            <label htmlFor="categoryName" className={styles.formLabel}>
              Category Name:
              <Field
                value={category.name}
                onChange={editName}
                id="categoryName"
              />
            </label>
            {category.products.map((product, ind) => (
              <div key={`product${ind}`} className={styles.productFields}>
                <label
                  htmlFor={`product${ind}Name`}
                  className={styles.formLabel}
                >
                  Product Name:
                  <Field
                    value={product.name}
                    onChange={(e) => {
                      const updatedProduct = {
                        ...product,
                        name: e.target.value,
                      };
                      const updatedProducts = category.products.map((p, i) =>
                        i === ind ? updatedProduct : p
                      );
                      setCategory({ ...category, products: updatedProducts });
                    }}
                    id={`product${ind}Name`}
                  />
                </label>
                <label
                  htmlFor={`product${ind}Description`}
                  className={styles.formLabel}
                >
                  Product Description:
                  <Field
                    value={product.description}
                    onChange={(e) => {
                      const updatedProduct = {
                        ...product,
                        description: e.target.value,
                      };
                      const updatedProducts = category.products.map((p, i) =>
                        i === ind ? updatedProduct : p
                      );
                      setCategory({ ...category, products: updatedProducts });
                    }}
                    id={`product${ind}Description`}
                  />
                </label>
                <label
                  htmlFor={`selectIcon${ind}`}
                  className={styles.formLabel}
                >
                  Icon:
                  <select
                    id={`selectIcon${ind}`}
                    value={product.icon}
                    onChange={(e) => {
                      const updatedProduct = {
                        ...product,
                        icon: e.target.value,
                      };
                      const updatedProducts = category.products.map((p, i) =>
                        i === ind ? updatedProduct : p
                      );
                      setCategory({ ...category, products: updatedProducts });
                    }}
                    className={styles.formSelect}
                  >
                    <IconOptions />
                  </select>
                </label>
                <button
                  className="button delete"
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory({
                      ...category,
                      products: category.products.filter((_p, i) => i !== ind),
                    });
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                setNewProduct(defaultProduct);
                setShowAddProduct(true);
              }}
              className="button edit"
              type="button"
            >
              Add product
            </button>
            &nbsp;&nbsp;
            <button type="submit" className="button edit">
              save
            </button>
          </form>

          {showAddProduct && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCategory({
                  ...category,
                  products: [...category.products, newProduct],
                });
                setShowAddProduct(false);
              }}
              className={styles.form}
            >
              <label htmlFor="newProductName" className={styles.formLabel}>
                Product Name:
                <Field
                  value={newProduct.name}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, name: e.target.value });
                  }}
                  id="newProductName"
                />
              </label>
              <label
                htmlFor="newProductDescription"
                className={styles.formLabel}
              >
                Product Description:
                <Field
                  value={newProduct.description}
                  onChange={(e) => {
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    });
                  }}
                  id="newProductDescription"
                />
              </label>
              <label htmlFor="selectIcon" className={styles.formLabel}>
                Icon:
                <select
                  value={newProduct.icon}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, icon: e.target.value });
                  }}
                  id="selectIcon"
                  className={styles.formSelect}
                >
                  <IconOptions />
                </select>
              </label>
              <button
                onClick={() => {
                  setShowAddProduct(false);
                }}
                className="button delete"
              >
                Cancel new product
              </button>
              &nbsp;&nbsp;
              <button type="submit" className="button edit">
                Add {newProduct.name}
              </button>
            </form>
          )}
        </>
      ) : (
        <>
          <CategoryDetails category={category} />
        </>
      )}
    </div>
  );
};
