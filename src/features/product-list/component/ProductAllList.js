import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProductsAsync,fetchProductsByFilterAsync,selectAllProducts,selectTotalItems,selectCategories,selectBrands, fetchCategoriesAsync, fetchBrandsAsync } from "../productListSlice";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { LIMITS_PER_PAGE } from "../../../app/constant";


const sortOptions = [
  { name: "Best Rating", sort: "rating", current: false },
  { name: "Price: Low to High", sort: "price", order:"asc", current: false },
  { name: "Price: High to Low", sort: "price", order:'desc', current: false },
 
];



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function ProductAllList() {
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
   const products = useSelector(selectAllProducts);
   const totalItems = useSelector(selectTotalItems);
   const brands=useSelector(selectBrands);
   const categories=useSelector(selectCategories);
   const dispatch = useDispatch();
  const [filter,setFilter]=useState({});
  const [sort,setSort]=useState({});
  const[page,setPage]=useState(1);
  const filters = [
    {
      id: "brand",
      name: "Brand",
      options:brands,
    },
    {
      id: "category",
      name: "Category",
      options:categories,
    },
  ];


 
  const handleFilter = (e, section, option) => {
    console.log(e.target.checked);
    let newFilter = {...filter};
    if(e.target.checked){
      if(newFilter[section.id]){
        newFilter[section.id].push(option.value);
      }else{
        newFilter[section.id]=[option.value];
      }
     
    }else{
      const index=newFilter[section.id].findIndex(el=>el===option.value);
      newFilter[section.id].splice(index,1)
    }
     console.log({newFilter});
    setFilter(newFilter);
   
    
  };
  const handleSort = (e,option) => {
    let sort = { _sort: option.sort,_order:option.order };
    console.log({sort});
    setSort(sort);
   
  };

  const handlePage=(page)=>{
    console.log({page});
    setPage(page);


  }

  useEffect(() => {
    console.log("Current page:", page);
    console.log("Fetching products with filter:", filter);
    console.log("Current sort options:", sort);
    
    dispatch(fetchProductsByFilterAsync({ 
      filter, 
      sort, 
      pagination: { _page: page, _limit: LIMITS_PER_PAGE } 
    }))
    .then((response) => {
      console.log("Fetched products:", response.payload); // Ensure that correct products are fetched
    });
  
  }, [dispatch, filter, sort, page]);
  
  
  
  useEffect(()=>{
  setPage(1);
  },[totalItems])
  
  useEffect(()=>{
    dispatch(fetchCategoriesAsync());
    dispatch(fetchBrandsAsync());
  },[])

  return (
    <div>
      <div>
        <div className="bg-white">
          <div>
            <MobileFilter handleFilter={handleFilter} setMobileFiltersOpen={setMobileFiltersOpen} mobileFiltersOpen={mobileFiltersOpen} filters={filters} ></MobileFilter>

            <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  All Products
                </h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <MenuItem key={option.name} className="cursor-pointer">
                            <p
                              onClick={e=>handleSort(e,option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                              )}
                            >
                              {option.name}
                            </p>
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Menu>

                  <button
                    type="button"
                    className="p-2 ml-5 -m-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon aria-hidden="true" className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon aria-hidden="true" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pt-6 pb-24"
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}

                   <DesktopFilter handleFilter={handleFilter} filters={filters}></DesktopFilter>
                  {/* Product grid */}
                  <div className="lg:col-span-3">
                  <ProductGrid products={products}></ProductGrid>
                   </div>
                    
                </div>
              </section>

              {/* end of the section product and filters */}

             <Pagination handlePage={handlePage} page={page} setPage={setPage}></Pagination>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}


function MobileFilter({mobileFiltersOpen,setMobileFiltersOpen,handleFilter,filters}){
 
  return(
    <>
    {/* Mobile filter dialog */}
    <Dialog
              open={mobileFiltersOpen}
              onClose={setMobileFiltersOpen}
              className="relative z-40 lg:hidden"
            >
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
              />

              <div className="fixed inset-0 z-40 flex">
                <DialogPanel
                  transition
                  className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                >
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}
                      className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon aria-hidden="true" className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        key={section.id}
                        as="div"
                        className="px-4 py-6 border-t border-gray-200"
                      >
                        <h3 className="flow-root -mx-2 -my-3">
                          <DisclosureButton className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white group hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="flex items-center ml-6">
                              <PlusIcon
                                aria-hidden="true"
                                className="h-5 w-5 group-data-[open]:hidden"
                              />
                              <MinusIcon
                                aria-hidden="true"
                                className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                              />
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  onChange={e=>handleFilter(e,section,option)}
                                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="flex-1 min-w-0 ml-3 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    ))}
                  </form>
                </DialogPanel>
              </div>
            </Dialog>
    </>
  );
}

function DesktopFilter({handleFilter,filters}){
  return(
    <>
                      <form className="hidden lg:block">
                    {filters.map((section) => (
                      <Disclosure
                        key={section.id}
                        as="div"
                        className="py-6 border-b border-gray-200"
                      >
                        <h3 className="flow-root -my-3">
                          <DisclosureButton className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white group hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="flex items-center ml-6">
                              <PlusIcon
                                aria-hidden="true"
                                className="h-5 w-5 group-data-[open]:hidden"
                              />
                              <MinusIcon
                                aria-hidden="true"
                                className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                              />
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  onChange={e=>handleFilter(e,section,option)}
                                  type="checkbox"
                                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    ))}
                  </form>
    </>
  );
}

function Pagination({handlePage,page,setPage,totalItems=60}){
  const totalPage=Math.ceil(totalItems/LIMITS_PER_PAGE);
  return(
    <>
                     <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                <div className="flex justify-between flex-1 sm:hidden">
                  <a
                    onClick={e=>handlePage(page>1?page-1:page)}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    onClick={e=>handlePage(page<totalPage?page+1:page)}
                    className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Next
                  </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(page-1)*LIMITS_PER_PAGE+1}</span> to{" "}
                      <span className="font-medium">{page*LIMITS_PER_PAGE >totalItems?totalItems:page*LIMITS_PER_PAGE}</span> of{" "}
                      <span className="font-medium">{totalItems}</span> results
                    </p>
                  </div>
                  <div>
                    <nav
                      aria-label="Pagination"
                      className="inline-flex -space-x-px rounded-md shadow-sm isolate"
                    >
                      <div
                        onClick={e=>handlePage(page>1?page-1:page)}
                        className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                          aria-hidden="true"
                          className="w-5 h-5"
                        />
                      </div>
                      {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                      {Array.from({length:totalPage}).map((el,index)=>(
                    
                      <div
                      
                      onClick={() => handlePage(index + 1)}
                      aria-current={index + 1 === page ? "page" : undefined}
                      className={`relative z-10 inline-flex items-center px-4 py-2 text-sm cursor-pointer font-semibold ${index+1==page?'text-white bg-indigo-600':'text-gray-400 '}  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      
                      {index+1}
                    </div>
                      ))}
                    
                 
                      <div
                        onClick={e=>handlePage(page<totalPage?page+1:page)}
                        className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon
                          aria-hidden="true"
                          className="w-5 h-5"
                        />
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
    </>
  );
}

function ProductGrid({products}){
  return(
    <>
            <div className="bg-white">
      <div className="max-w-2xl px-4 py-0 mx-auto sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products && products.length > 0 ? (
            products.map((product) => (
              <Link to={`/product-detail/${product.id}`} key={product.id}>
                <div className="relative border-2 border-solid rounded-md group">
                  <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      alt={product.imageAlt}
                      src={product.thumbnail}
                      className="object-cover object-center w-full h-full lg:h-full lg:w-full sm:h-full sm:w-full"
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="p-2">
                      <h3 className="text-sm text-gray-700">
                        <div href={product.thumbnail}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.title}
                        </div>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        <StarIcon className="inline w-6 h-6 align-bottom"/>
                        {product.rating}
                      </p>
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium text-gray-900">
                        ${Math.round(product.price * (1 - product.discountPercentage / 100))}
                      </p>
                      <p className="text-sm font-medium text-gray-400 line-through">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
}