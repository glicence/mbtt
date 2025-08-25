import React, { useState } from 'react';
import { Category as CategoryType, Product } from '../../../types';

import styles from './category.module.css';

type FieldProps = {
  value: string;
  id: string;
  onChange: (e: { target: { value: string } }) => void;
};

const Field = ({ value, onChange, id }: FieldProps) => (
  <input value={value} onChange={onChange} id={id} />
);

const IconOptions = () => (
  <>
    <option>stocks_shares_isa.svg</option>
    <option>simple_saver.svg</option>
    <option>personal_pension.svg</option>
    <option>open_access_cash_isa.svg</option>
    <option>lifetime_isa.svg</option>
    <option>junior_isa.svg</option>
    <option>general_investment_account.svg</option>
    <option>cash_isa.svg</option>
    <option>95_day_notice.svg</option>
    <option>32_day_notice.svg</option>
  </>
);

const defaultProduct = {
  name: '',
  icon: 'stocks_shares_isa.svg',
  description: '',
};

export const Category = ({
  category: initialCategory,
}: {
  category: CategoryType;
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
      <div>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            if (isEditing) setCategory(initialCategory);
          }}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      {isEditing ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave();
            }}
          >
            <label htmlFor="categoryName">
              Category Name:
              <Field
                value={category.name}
                onChange={editName}
                id="categoryName"
              />
            </label>

            {category.products.map((product, ind) => (
              <div key={`product${ind}`}>
                <label htmlFor={`product${ind}Name`}>
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
                <label htmlFor={`product${ind}Description`}>
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
                <label htmlFor={`selectIcon${ind}`}>
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
                  >
                    <IconOptions />
                  </select>
                </label>
                <button
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
            <button type="submit">save</button>
          </form>

          {!showAddProduct ? (
            <button
              onClick={() => {
                setNewProduct(defaultProduct);
                setShowAddProduct(true);
              }}
            >
              Add product
            </button>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCategory({
                  ...category,
                  products: [...category.products, newProduct],
                });
                setShowAddProduct(false);
              }}
            >
              <label htmlFor="newProductName">
                Product Name:
                <Field
                  value={newProduct.name}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, name: e.target.value });
                  }}
                  id="newProductName"
                />
              </label>
              <label htmlFor="newProductDescription">
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
              <label htmlFor="selectIcon">
                Icon:
                <select
                  value={newProduct.icon}
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, icon: e.target.value });
                  }}
                  id="selectIcon"
                >
                  <IconOptions />
                </select>
              </label>
              <button
                onClick={() => {
                  setShowAddProduct(false);
                }}
              >
                Cancel new product
              </button>
              <button type="submit">Add {newProduct.name}</button>
            </form>
          )}
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};
