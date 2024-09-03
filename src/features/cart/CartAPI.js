// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/cart',{
      method:'post',
      body:JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    const data=await response.json();
    resolve({data});
  }
    
  );
}

export function fetchAllItemsByuserId(userId){
  return new Promise(async(resolve)=>{
    const response =await fetch('http://localhost:8080/cart?user='+userId);
    const data=await response.json();
    resolve({data});
  });

}

export function updateItem(update) {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/cart/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers: { 'Content-Type': 'application/json' },
    });
    const data=await response.json();
    resolve({data});
  }
    
  );
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/cart/${itemId}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
      });

      // Check if the response status is not OK (e.g., 404 Not Found)
      if (!response.ok) {
        const errorMessage = await response.text(); // Get the error message as text
        return reject(new Error(errorMessage)); // Reject the promise with the error message
      }

      const data = await response.json();
      resolve({ data: { id: itemId } });
    } catch (error) {
      // Handle any other errors (e.g., network issues)
      reject(error);
    }
  });
}


export function resetCart(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetchAllItemsByuserId(userId);
      const items = response.data;
      for (let item of items) {
        await deleteItemFromCart(item.id);
      }
      resolve({ status: 'success' });
    } catch (error) {
      // Handle any errors during the reset process
      reject(error);
    }
  });
}
