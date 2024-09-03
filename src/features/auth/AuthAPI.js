// A mock function to mimic making an async request for data
export  function creatUser(userData) {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/user',{
      method:'post',
      body:JSON.stringify(userData),
      headers:{'content-type':'json/application'}
    });
    const data=await response.json();
    resolve({data});
  }
    
  );
}

export  function checkUser(loginInfo) {
  return new Promise(async (resolve,reject) =>{
    const email=loginInfo.email;
    const password=loginInfo.password;
    const response=await fetch('http://localhost:8080/user?email='+email);
    const data=await response.json();
    console.log({data});
    if(data.length){
      if(password===data[0].password){
        resolve({data:data[0]});
      }else{
        reject({message:'wromg credential!'});
      }
      
    }else{
     reject({message:'user not found!'});
    }
    
  }
    
  );
}

export  function updateUser(update) {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/user/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'json/application'}
    });
    const data=await response.json();
    resolve({data});
  }
    
  );
}
