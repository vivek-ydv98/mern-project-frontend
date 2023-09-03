import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetail from '../features/product-list/components/ProductDetail'

export default function ProductDetailPage() {
  return (
    <div>
    <Navbar>
      <ProductDetail></ProductDetail>
    </Navbar>
    </div>
  )
}
