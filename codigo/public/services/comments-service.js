export class CommentsService{
    constructor() {
        this.urlBase = '/comments';
        //this.urlBase = 'http://localhost:3000/comments';
      }
    async getComments(){
        try{
            const res = await fetch(this.urlBase);
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        } 
    }
    async getComment(id){
        try{
            const res = await fetch(`${this.urlBase}/${id}`);
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        } 
    }
    async createComment(comment){
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
    async updateComment(id, comment){
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
    async deleteComment(id){
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