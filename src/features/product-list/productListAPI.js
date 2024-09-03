export  function fetchAllProducts() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/products');
      const data = await response.json();
      
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export  function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`);
      const data = await response.json();
      console.log(data);
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchProductsByFilter(filter,sort,pagination) {
//filter:{"category":["smartphones","laptops"]}
//sort:{_sort:"price",_order:"desc"};
//page;{_page:page?limit=9}
//TODO:on server we will support multi values

  let queryString = '';
  for (let key in filter) {
    const categoryValue=filter[key];
    if(categoryValue.length){
      const lastCategoryValue=categoryValue[categoryValue.length-1];  
      queryString += `${key}=${lastCategoryValue}&`;
    }

  }

  for (let key in sort) {
    queryString+=`${key}=${sort[key]}&`;
  }

  console.log(pagination);
  for (let key in pagination) {
    queryString+=`${key}=${pagination[key]}&`;
  }

 
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/products?${queryString}`);
      const data = await response.json();
      const totalItems= await response.headers.get('X-Total-Count');
      console.log(totalItems);
      resolve({data:{ products:data,totalItems:+totalItems }});
    } catch (error) {
      reject(error);
    }
  });
}

export  function fetchCategories() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/categories');
      const data = await response.json();
      
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchBrands(){
  return new Promise(async(resolve,reject)=>{
    try {
      const response=await fetch('http://localhost:8080/brands');
      const data=await response.json();
      resolve({data});
      
    } catch (error) {
      reject(error);
      
    }
  });
}