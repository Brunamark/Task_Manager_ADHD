export class CategoriesService{
    constructor() {
        this.urlBase = '/categories';
       //this.urlBase = 'http://localhost:3000/categories';
      }
    async getCategories(){
        try{
            const res = await fetch(this.urlBase);
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        } 
    }
    async getCategory(id){
        try{
            const res = await fetch(`${this.urlBase}/${id}`);
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        } 
    }
    async createCategories(comment){
        try{
            const res = await fetch(this.urlBase,{
                method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
            });
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        }
    }
    async updateCategories(id, comment){
        try{
            const res = await fetch(`${this.urlBase}/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
              });
              return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        }
    }
    async deleteCategories(id){
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