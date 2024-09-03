import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {

  deleteItemFromCartAsync,
  increment,

  incrementAsync,
 
  selecAddtoCart,
 
  selectCount,
  updateItemAsync,
} from './CartSlice';
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Navigate } from 'react-router-dom';



export default function Cart() {
 const items = useSelector(selecAddtoCart);
  const dispatch = useDispatch();
  const totalAmount=items.reduce((amount,item)=>item.price*item.quantity+amount,0);
  const totalItems=items.reduce((total,item)=>item.quantity+total,0)

  const handleQuntity=(e,item)=>{
     dispatch(updateItemAsync({...item, quantity: +e.target.value}));
  }

  const handleRemove=(e,id)=>{
    dispatch(deleteItemFromCartAsync(id));

  }

  return (
    <>
     {!items.length && <Navigate to='/'  replace={true}></Navigate>}
     <div className="px-4 mx-auto mt-12 bg-white border max-w-7xl sm:px-6 lg:px-8">
     
                     <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                     <h1 className="my-5 text-4xl font-bold tracking-tight text-gray-900">Cart</h1>
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                              <img
                                alt={item.imageAlt}
                                src={item.thumbnail}
                                className="object-cover object-center w-full h-full"
                              />
                            </div>

                            <div className="flex flex-col flex-1 ml-4">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item.href}>{item.name}</a>
                                  </h3>
                                  <p className="ml-4">${item.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                              </div>
                              <div className="flex items-end justify-between flex-1 text-sm">
                                <div className="text-gray-500">
                                <label htmlFor="quantity" className="inline mr-2 text-sm font-medium leading-6 text-gray-900">
                                   Qty
                                  </label> 
                                  <select onChange={(e)=>handleQuntity(e,item)} value={item.quantity}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </div>

                                <div className="flex">
                                  <button type="button" onClick={(e)=>handleRemove(e,item.id)} className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                

                <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${Math.floor(totalAmount)}</p>
                  </div>

                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Total items in Cart</p>
                    <p>{totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                    <p>
                      or{' '}
                      <Link to="/">
                      <button
                        type="button"
                       
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                      </Link>
                    </p>
                  </div>
                </div>
                </div>
    </>
  );
}
