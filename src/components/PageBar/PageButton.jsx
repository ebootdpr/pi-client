import React from 'react'
import { Link, useParams } from 'react-router-dom';



export default function PageButton() {
  const { pagenum } = useParams()
  return (
    <div>PageButton</div>
  )
}
