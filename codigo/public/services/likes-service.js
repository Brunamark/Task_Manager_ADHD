export class LikeService{
    constructor() {
        this.urlBase = '/likes';
        //this.urlBase = 'http://localhost:3000/likes';
      }
    async getLikes(){
        try{
            const res = await fetch(this.urlBase);
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        } 
    }
    async getLike(id){
        try{
            const res = await fetch(`${this.urlBase}/${id}`);
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        } 
    }
    async createLike(like){
        try{
            const res = await fetch(this.urlBase,{
                method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(like)
            });
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        }
    }
    async updateLike(id, like){
        try{
            const res = await fetch(`${this.urlBase}/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(like)
              });
              return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        }
    }
    async deleteLike(id){
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