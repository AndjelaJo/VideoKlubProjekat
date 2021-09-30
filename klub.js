import { Red } from "./red.js";
import { Film } from "./film.js";
export class Klub{
    constructor (id, ime, maksimalniBrojRedova, trenutniBrojRedova){
        this.id = id;
        this.ime = ime;
        this.maksimalniBrojRedova = maksimalniBrojRedova;
        this.trenutniBrojRedova = trenutniBrojRedova;
        this.klubKontejner = null;
        this.nizRedova = [];
    }

    crtajKlub(host){
        if(!host)
        alert("Host ne postoji");
        this.klubKontejner=document.createElement("div");
        this.klubKontejner.classList.add("klubKontejner");
        this.klubKontejner.classList.add(`klub-id-${this.id}`);
        host.appendChild(this.klubKontejner);

        this.crtajFormu(this.klubKontejner);
        this.crtajLokaciju(this.klubKontejner);
    }

    crtajFormu(host){
        var formaKontejner=document.createElement("div");
        formaKontejner.classList.add("formaKontejner");
        host.appendChild(formaKontejner);

        var naslovKontejner=document.createElement("div");
        naslovKontejner.classList.add("naslovKontejner");
        naslovKontejner.innerHTML= "<h3>" + this.ime + "</h3> " +
        "<br/> trenutno redova: " + this.trenutniBrojRedova+
        "<br/> od mogucih: " + this.maksimalniBrojRedova;
        formaKontejner.appendChild(naslovKontejner);

        var izbor1Kontejner=document.createElement("div");
        izbor1Kontejner.classList.add("izbor1Kontejner");
        formaKontejner.appendChild(izbor1Kontejner);

        var prviKontejner=document.createElement("div");
        prviKontejner.classList.add("prviKontejner");
        izbor1Kontejner.appendChild(prviKontejner);

        var podaci=["naziv","ime_rezisera","prezime_rezisera","trajanje","godina","red"];
        var tipovi=["text","text","text","number","number","number"];
        podaci.forEach((el,index)=>{
            this.crtajPoljaZaUnos(el,tipovi[index],this.klubKontejner.querySelector(".prviKontejner"));
        });

        var drugiKontejner=document.createElement("div");
        drugiKontejner.classList.add("drugiKontejner");
        izbor1Kontejner.appendChild(drugiKontejner);

        var vrste=["drama","komedija","akcioni","romantika"];
        var labela=document.createElement("strong");
        labela.innerHTML="tip";
        drugiKontejner.appendChild(labela);
        vrste.forEach((el,index)=>{
            this.crtajPoljaZaIzbor(`${this.id}`+"1",el,this.ime,this.klubKontejner.querySelector(".drugiKontejner"),index); 
        });

        var dugmici=["dodaj film","nadji film"];
        var oznakeDugmica=["+","f"];
        dugmici.forEach((el,index)=>{
            var dugme=document.createElement("button");
            dugme.innerHTML=el;
            izbor1Kontejner.appendChild(dugme);
            dugme.onclick=(ev)=>{
                this.dodajNoviFilmNadjiFilmEvent(oznakeDugmica[index]);
            }
        });

        var izbor2Kontejner=document.createElement("div");
        izbor2Kontejner.classList.add("izbor2Kontejner");
        formaKontejner.appendChild(izbor2Kontejner);

        var labela=document.createElement("h3");
        labela.innerHTML="DODAJ RED";
        izbor2Kontejner.appendChild(labela);

        labela=document.createElement("strong");
        labela.innerHTML="tip";
        izbor2Kontejner.appendChild(labela);
        vrste.forEach((el,index)=>{
            this.crtajPoljaZaIzbor(`${this.id}`+"2", el, this.ime, this.klubKontejner.querySelector(".izbor2Kontejner"), index); 
        });

        var polje3=document.createElement("input");
        polje3.type="number";
        polje3.placeholder="maksimalni kapacitet reda";
        polje3.classList.add("kapacitetReda");
        izbor2Kontejner.appendChild(polje3);

        var dugmeZaRedove=document.createElement("button");
        izbor2Kontejner.appendChild(dugmeZaRedove);
        dugmeZaRedove.innerHTML="dodaj red";
        dugmeZaRedove.onclick = (ev) => {this.dodajNoviRedEvent()};
    }

    // validira, snima u bazi, i dodaje u array i updatuje info
    dodajNoviRedEvent() {
        if(!this.validirajKapacitetKluba()){
            return;
        }
        
        let noviRedniBroj = this.trenutniBrojRedova + 1;
        var noviRed = this.napraviObjekatRedOdPolja();
        if (!noviRed.validirajRed()) {
            return;
        }

        noviRed.snimiRedUBazi(this.id).then((response) => {
            console.log(response);
            if(response.ok)
            {
                response.json().then(idReda => {
                    console.log("Novi red id: " + idReda);
                    noviRed.id = idReda;
                    this.trenutniBrojRedova = noviRedniBroj;
                    this.dodajRedUKlub(noviRed);
                });
            }
            else if (response.status == 400){
                alert("Invalidni podaci.");

            } else {
                alert ("Greska pri upisu.")
            }
        });
    }

    // crta u klubu, dodaje u array i updatuje klub info
    dodajRedUKlub(noviRed){
        let redoviKontejner = document.querySelector(`.redoviKontejner-klub-id-${this.id}`);
        noviRed.crtajRed(redoviKontejner);
        noviRed.klub = this;
        this.nizRedova.push(noviRed);
        this.azurirajKlubInfo();
    }

    azurirajKlubInfo(){
        var novi=this.klubKontejner.querySelector(".naslovKontejner");
        novi.innerHTML= "<h3>" + this.ime + "</h3> " +
        "<br/> trenutno redova: " + this.trenutniBrojRedova +
        "<br/> od mogucih: " + this.maksimalniBrojRedova;
    }   

    dodajNoviFilmNadjiFilmEvent(znak){
        var noviFilm = this.napraviObjekatFilmaOdPolja();
        if (!noviFilm.validirajFilm()) {
            return;
        }

        var redFilma = parseInt(this.klubKontejner.querySelector(".red").value);

        // dodavanje novog filma
        if (znak==="+") {
            // proverava input pulje da li je validan int broj
            if (redFilma > this.trenutniBroj || isNaN(redFilma)) {
                alert("Ne postoji red za dodavanje");
                return;
            }

            // proverava da li je selectovan red odogovarajuceg tipa
            var zeljeniRed = this.nizRedova.find(el => el.redniBroj === redFilma);
            if (!zeljeniRed){
                alert("Ne postoji zeljeni red");
                return;
            }
            else if (zeljeniRed.tip != noviFilm.tip)
            {
                alert("Selektovani red nije odgovarajuceg tipa");
                return;
            }

            // provera da li ima mesta u zeljenom redu
            if (zeljeniRed.trKapacitet >= zeljeniRed.maxKapacitet){
                alert("Zeljeni red je popunjen. izaberite drugi red");
                return;
            }

            // trazimo potencijalni red
            var moguciRed = this.nizRedova.find(el => 
                (el.tip === noviFilm.tip) && 
                (el.trKapacitet < el.maxKapacitet) &&
                (el.redniBroj < redFilma));
            // console.log(moguciRed);
            if (moguciRed) {
                var odluka=confirm("Nasli smo moguci red: " + moguciRed.redniBroj + " Da li zelite da upisete u njega?");
                if (odluka === true) {
                    moguciRed.dodajNoviFilm(noviFilm);
                } else {
                    zeljeniRed.dodajNoviFilm(noviFilm);
                }
            }
            else {
                console.log(zeljeniRed);
                console.log(noviFilm);
                zeljeniRed.dodajNoviFilm(noviFilm);
            }
        }

        // pretraga filmova
        if (znak==="f") {
            this.nizRedova.forEach((el1,index)=>{
                el1.nizFilmova.forEach((el2,index)=>{
                    if (el2.naziv===noviFilm.naziv){
                        console.log(el2);
                        el2.pogledFilma();
                    }
                });
            });
        }
    }

    validirajKapacitetKluba(){
        if (this.trenutniBrojRedova === this.maksimalniBrojRedova){
            alert("Nema vise mesta za redove");
            return false;
        } 

        return true;
    }

    crtajPoljaZaUnos(oznaka,tip,host){
        var polje=document.createElement("input");
        polje.classList.add(oznaka);
        polje.type=tip;
        polje.placeholder=oznaka;
        host.appendChild(polje);
    }

    crtajPoljaZaIzbor(sufix,izbor,ime,host,ind){ 
        var pomocni=document.createElement("div");
        host.appendChild(pomocni);
        var kruzic=document.createElement("input");
        kruzic.type="radio";
        kruzic.value=izbor;
        kruzic.name=ime + sufix;
        kruzic.id=izbor + sufix;
        var labela=document.createElement("label");
        labela.innerHTML=izbor;
        labela.htmlFor=izbor+sufix;
        pomocni.appendChild(kruzic);
        pomocni.appendChild(labela);
        if(ind===0) 
            kruzic.checked=true; 
    }

    crtajLokaciju(host){
        var redoviKontejner=document.createElement("div");
        redoviKontejner.classList.add("redoviKontejner");
        redoviKontejner.classList.add(`redoviKontejner-klub-id-${this.id}`);
        host.appendChild(redoviKontejner);
    }

    napraviObjekatRedOdPolja(){
        var suffix = `${this.id}`+"2";
        var tipReda = this.klubKontejner.querySelector(`input[name='${this.ime + suffix}']:checked`).value;
        var maxKapacitetReda = parseInt(this.klubKontejner.querySelector(".kapacitetReda").value);
        let noviRedniBroj = this.trenutniBrojRedova + 1;
        var red = new Red (
            0, // id
            tipReda, //tipReda 
            noviRedniBroj, //noviRedniBroj
            maxKapacitetReda, //maxKapacitetReda
            0); // trenutni kapacitet

        return red;
    }

    napraviObjekatFilmaOdPolja(){
        console.log(this.ime);
        var suffix = `${this.id}`+"1";
        var nazivFilma=this.klubKontejner.querySelector(".naziv").value;
        var imeReziseraFilma=this.klubKontejner.querySelector(".ime_rezisera").value;
        var prezimeReziseraFilma=this.klubKontejner.querySelector(".prezime_rezisera").value;
        var trajanjeFilma=parseInt(this.klubKontejner.querySelector(".trajanje").value);
        var godinaFilma=parseInt(this.klubKontejner.querySelector(".godina").value);
        var tipFilma=this.klubKontejner.querySelector(`input[name='${this.ime+suffix}']:checked`).value;

        var film = new Film(0,
            nazivFilma,
            imeReziseraFilma,
            prezimeReziseraFilma,
            tipFilma,
            trajanjeFilma,
            godinaFilma);

        return film;
    }
}