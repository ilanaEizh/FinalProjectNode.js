function verification_user_name_lenght(newUserName){
    var userName = newUserName;
    var flag = 1;
     if(userName.length==0){
      flag = 4;
     } 
     if(userName.length<=2 || userName.length>=16){
      flag = 3;
     } 
      return flag;
  };
  
  function verification_user_age(newUserAge){
    if(newUserAge.length==0){
      return 1;
     } 
      if(newUserAge>0 && newUserAge<=120) return 1;
      return 0;
  };

  function verification_user_name(newUserName, arrayPersons){ 
    var userName = newUserName;
    var flag = 1;
    var newname = newUserName.trim().toString();
     if(arrayPersons!=null){
          arrayPersons.forEach( function(user) {

            console.log("userName "+userName);
            console.log("user.name "+user.name);
          var name = ""+user.name;
          if(newname.toLowerCase() === name.toLowerCase()){
            console.log("EQUALS !!!!!");
            flag = 0;
            }
      });
     }  
      return flag;
  };


  

  module.exports = {
    verification_user_name_lenght: verification_user_name_lenght,
    verification_user_age: verification_user_age,
    verification_user_name: verification_user_name
};
