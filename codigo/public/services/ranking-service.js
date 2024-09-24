export class RankingService{
    constructor() {
        this.urlBase = '/ranking';
        //this.urlBase = 'http://localhost:3000/ranking';
      }
    async getRankings(){
        try{
            const res = await fetch(this.urlBase);
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        } 
    }
    async getRanking(id){
        try{
            const res = await fetch(`${this.urlBase}/${id}`);
            return res.json();
        }catch{
            console.log("Error in fetch db from JSONServer");
        } 
    }
    async createRankings(comment){
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
    async updateRankings(id, comment){
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
    async deleteRankings(id){
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