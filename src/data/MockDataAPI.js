import { Text } from 'react-native';
import React, { Component } from 'react';

import { productsArray } from "./productsArray";

export function getProducts(){
  const response = {
    data:{
      products:productsArray.Products,
      productVariants:productsArray.ProductVariants,
      productReviews:productsArray.ProductReviews,
    }
  };
  return response;
}

export function getUser(){
  const User = {
    data:{
      user:productsArray.User
    }
  };
  return User;
}

export function getStores(){
  const Stores = {
    data:{
      stores:productsArray.Stores
    }
  };
  return Stores;
}
