class User{
    constructor(id, name, email, password, join_date) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.join_date = join_date;
    }

    getId(){
      return this.id;
    }
    
    getName(){
      return this.name;
    }

    getEmail(){
      return this.email;
    }
  }
  
export default User;