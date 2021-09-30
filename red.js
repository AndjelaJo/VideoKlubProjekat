import { Film } from "./film.js";
export class Red{
    constructor (id,tip,redniBroj,maxKapacitet,trKapacitet){
        this.id = id;
        this.tip=tip;
        this.redniBroj=redniBroj;
        this.maxKapacitet=maxKapacitet;
        this.trKapacitet=trKapacitet;
        this.redKontejner=null;
        this.nizFilmova=[];
    }

    crtajRed(host){
        this.redKontejner=document.createElement("div");
        this.redKontejner.classList.add("redKontejner");
        host.appendChild(this.redKontejner);

        var oznakaKontejner=document.createElement("div");
        oznakaKontejner.classList.add("oznakaKontejner");
        oznakaKontejner.innerHTML="Redni broj: " + this.redniBroj +
            "<br /> Tip filma: " + this.tip + 
            "<br /> Maksimalni kapacitet: " + this.maxKapacitet + 
            "<br /> Trenutno: " + this.trKapacitet;  
        oznakaKontejner.style.backgroundColor=this.vratiBojuReda(this.tip);
        this.redKontejner.appendChild(oznakaKontejner);

        var filmoviKontejner=document.createElement("div");
        filmoviKontejner.classList.add("filmoviKontejner");
        filmoviKontejner.classList.add(`filmoviKontejner-red-id-${this.id}`);
        this.redKontejner.appendChild(filmoviKontejner);
    }

    vratiBojuReda(tipF){
        if(tipF==="drama")
        return "brown";
        if(tipF==="komedija")
        return "blue";
        if(tipF==="akcioni")
        return "green";
        if(tipF==="romantika")
        return "pink";
    }

    // validira, snima u bazi, i dodaje u array i updatuje info
    dodajNoviFilm(noviFilm) {
        noviFilm.snimiFilmUBazi(this.id).then((response) => {
            console.log(response);
            if(response.ok)
            {
                response.json().then(idFilma => {
                    console.log("Novi film id: " + idFilma);
                    noviFilm.id = idFilma;
                    var noviKapacitet = this.trKapacitet + 1;
                    this.trKapacitet = noviKapacitet;
                    this.dodajFilmURed(noviFilm);
                });
            }
            else if (response.status == 400){
                alert("Invalidni podaci.");

            } else {
                alert ("Greska pri upisu.")
            }
        });
    }

    //  crta u redu, dodaje u array i updatuje red info
    dodajFilmURed(film){
        let filmoviKontejner = document.querySelector(`.filmoviKontejner-red-id-${this.id}`);
        film.crtajFilm(filmoviKontejner);
        this.nizFilmova.push(film);
        film.red=this;
        this.azurirajRedInfo();
    }

    azurirajRedInfo(){
        this.redKontejner.querySelector(".oznakaKontejner").innerHTML="Redni broj: " + this.redniBroj +
        "<br /> Tip filma: " + this.tip + 
        "<br /> Maksimalni kapacitet: " + this.maxKapacitet + 
        "<br /> Trenutno: " + this.trKapacitet;  
    }

    azurirajRedInfoNakonBrisanjaFilma(){
        this.trKapacitet--;
        this.redKontejner.querySelector(".oznakaKontejner").innerHTML="Redni broj: "+this.redniBroj+
        "<br \> Tip filma: "+this.tip+
        "<br \> Maksimalni kapacitet: "+this.maxKapacitet+
        "<br \> Trenutno: "+this.trKapacitet;
    }

    snimiRedUBazi(klubId){
        console.log(klubId);
        return fetch("https://localhost:5001/api/Reds/UpisiRed/" + klubId, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                tip: this.tip,
                maxKapacitet: this.maxKapacitet,
                redniBroj: this.redniBroj
            })
        })
    }

    validirajRed(){
        if (isNaN(this.maxKapacitet) || (this.maxKapacitet <= 0 || this.maxKapacitet > 200)) {
            alert("Niste ispravno uneli podatke o redu." + 
                "\nKapacitet reda je izmedju 1 i 200");
            return false;
        } 

        return true;
    }
}
