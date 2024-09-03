import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { deleteItemFromCartAsync, selecAddtoCart, updateItemAsync } from '../features/cart/CartSlice';
import { useForm } from 'react-hook-form';
import { selectLoggedInUser, updateUserAsync } from '../features/auth/AuthSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/orders/orderSlice';

const Checkout = () => {
 const[selectAddress,setSelectAddress]=useState(null);
 const[paymentMethod,setPaymentMethod]=useState('cash');
  const items = useSelector(selecAddtoCart);
  const user=useSelector(selectLoggedInUser);
  const cuurentOrder=useSelector(selectCurrentOrder);
  const dispatch = useDispatch();
  const totalAmount=items.reduce((amount,item)=>item.price*item.quantity+amount,0);
  const totalItems=items.reduce((total,item)=>item.quantity+total,0);

  const {register,handleSubmit,reset,formState:{errors}}=useForm();

  const handleQuntity=(e,item)=>{
     dispatch(updateItemAsync({...item, quantity: +e.target.value}));
  }

  const handleRemove=(e,id)=>{
    dispatch(deleteItemFromCartAsync(id));

  }

  const handleAddress=(e)=>{
    console.log(e.target.value);
    setSelectAddress(user.addresses[e.target.value]);
  }
  const handlePayment=(e)=>{
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  }

  const handleOrder=(e)=>{
    if(selectAddress && paymentMethod){
      const order={items,totalItems,totalAmount,user,paymentMethod,selectAddress,status:'pending'};
      dispatch(createOrderAsync(order));
      //need to redirect from here a new success page
    }else{
      //TODO:we can use proper messaging popup here
      alert('Enter address and payment method')
    }
   
    //TODO:redirect the order success page
    //TODO:clear card after order
    //TODO:on server change the stock number of items
  }

  return (
    <>
    {!items.length && <Navigate to='/'  replace={true}></Navigate>}
    {cuurentOrder && <Navigate to={`/order-success/${cuurentOrder.id}`}  replace={true}></Navigate>}
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className='lg:col-span-3'>
         <form className='px-5 py-12 mt-12 bg-white' noValidate onSubmit={handleSubmit((data)=>{
             dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}));
             reset();
          })}>
          <div className="space-y-12">
           <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900 ">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
               Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register('name',{required:'Fullname is required!'})}
                  type="text"
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email',{required:'emial is required!'})}
                  type="email"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
              <input
                  id="phone"
                  {...register('phone',{required:'phone is required!'})}
                  type="tel"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  id="street"
                  {...register('street',{required:'Street address  is required!'})}
                  type="text"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  {...register('city',{required:'city is required!'})}
                  type="text"
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  id="state"
                  {...register('state',{required:'state is required!'})}
                  type="text"
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  id="pinCode"
                  {...register('pinCode',{required:'Posta code is required!'})}
                  type="text"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-6 gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Reset
        </button>
        <button
          type="submit"
          className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>

        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
           Choose for existing address
          </p>
          <ul role="list" >
      {user.addresses.map((address,index) => (
        <li key={address.index} className="flex justify-between px-5 py-5 mb-2 border-2 border-gray-200 border-solid gap-x-6">
          <div className="flex min-w-0 gap-x-4">
                   <input
                   onChange={handleAddress}
                    name="adress"
                    type="radio"
                    value={index}
                    
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                  />
            <div className="flex-auto min-w-0">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500 truncate">{address.street}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500 truncate">{address.pinCode}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">Phone:{address.phone}</p>
            <p className="text-sm leading-6 text-gray-900">{address.city}</p>
           
          </div>
        </li>
      ))}
    </ul>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Method</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose one</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                  onChange={handlePayment}
                    id="cash"
                    name="payments"
                    type="radio"
                    value='cash'
                    checked={paymentMethod==='cash'}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                  />
                  <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                   Cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                   onChange={handlePayment}
                    id="card"
                    name="payments"
                    type="radio"
                    value='card'
                    checked={paymentMethod==='card'}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                  />
                  <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                  Card Payment
                  </label>
                </div>
             
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </form>
     </div>
     
       <div className='lg:col-span-2'>
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
    <div
      onClick={handleOrder}
      className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
    >
      Order Now
    </div>
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
       </div>
    </div>
    </div>
    </>
  )
}

export default Checkout