export class UserService{
    constructor() {
       this.urlBase = '/users';
        //this.urlBase = 'http://localhost:3000/users';
      }
    async getUsers(){
        try{
            const res = await fetch(this.urlBase);
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        } 
    }
    async getUser(id){
        try{
            const res = await fetch(`${this.urlBase}/${id}`);
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        } 
    }
    async createUser(user){
        try{
            const res = await fetch(this.urlBase,{
                method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
            });
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        }
    }
    async updateUser(id, user){
        try{
            const res = await fetch(`${this.urlBase}/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
              });
              return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        }
    }
    async deleteUser(id){
        try{
            const res = await fetch(`${this.urlBase}/${id}`, {
                method: 'DELETE'
              });
              return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        }
    }
}