import React from 'react';
import { Data } from '../../../types';
import { Admin } from '../../components/admin/admin';

export default function Page({ data }: { data: Data }) {
  return <Admin data={data} />;
  // const [categories, setCategories] = useState(data)
  // const [error, setError] = useState('')

  // const addCategory = async () => {
  //   const res = await fetch('http://localhost:4000/categories', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name: 'new category', products: [] }),
  //   });

  //   if (res.ok) {
  //     const category = await res.json()
  //     setCategories([...categories, category])
  //   } else {
  //     setError('Failed to add category')
  //   }
  // }

  // const removeCategory = async (id: string) => {
  //   const res = await fetch(`http://localhost:4000/categories/${id}`, {
  //     method: 'DELETE',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name: 'new category', products: [] }),
  //   });

  //   if (res.ok) {
  //     setCategories([...categories.filter((category) => category.id !== id)])
  //   } else {
  //     setError('Failed to remove category')
  //   }
  // }

  // console.log(error)

  // return (
  //   <>
  //     <h1>Admin</h1>

  //     <div className={styles.categories}>
  //       {categories.map((category) => (
  //         <div key={category.id} className={styles.category}>
  //         <Category category={category} />
  //         <button onClick={() => removeCategory(category.id)}>Remove</button>
  //         </div>
  //       ))}
  //     </div>

  //     {error && <p className={styles.error}>{error}</p>}

  //     <button onClick={addCategory}>Add category</button>
  //   </>
  // );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:4000/categories');
  const data = await res.json();

  return {
    props: { data },
  };
}
