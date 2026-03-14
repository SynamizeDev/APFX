'use client';

import styles from './PopularCategories.module.css';

interface PopularCategoriesProps {
    categories: string[];
}

export default function PopularCategories({ categories }: PopularCategoriesProps) {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Popular Stocks By Category</h2>
            <div className={styles.tags}>
                {categories.map((cat) => (
                    <button key={cat} type="button" className={styles.tag}>
                        {cat}
                    </button>
                ))}
            </div>
        </section>
    );
}
