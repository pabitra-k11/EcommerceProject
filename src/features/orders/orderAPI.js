export function createOrder(order) {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/orders',{
      method:'post',
      body:JSON.stringify(order),
      headers:{'content-type':'json/application'}
    });
    const data=await response.json();
    resolve({data});
  }
    
  );
}
