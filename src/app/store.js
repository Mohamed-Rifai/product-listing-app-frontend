import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';
import categoriesReducer from './reducers/categoriesReducer';
import subcategoriesReducer from './reducers/subCateReducer';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
  },
});




