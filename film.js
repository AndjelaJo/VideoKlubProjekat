export class Film {
    constructor(id, naziv, imeRezisera, prezimeRezisera, tip, trajanje, godina) {
        this.id = id;
        this.naziv = naziv;
        this.imeRezisera = imeRezisera;
        this.prezimeRezisera = prezimeRezisera;
        this.tip = tip;
        this.trajanje = trajanje;
        this.godina = godina;
        this.filmKontejner = null;
    }

    crtajFilm(host) {
        this.filmKontejner = document.createElement("div");
        this.filmKontejner.classList.add("filmKontejner");
        host.appendChild(this.filmKontejner);

        this.filmKontejner.innerHTML = this.naziv;

        var dugmeBrisanje = document.createElement("button");
        dugmeBrisanje.classList.add("dugmeBrisanje");
        dugmeBrisanje.innerHTML = "Obrisi";
        this.filmKontejner.appendChild(dugmeBrisanje);
        dugmeBrisanje.onclick = (ev) => {
            this.dogadjaj("-");
        }

        var dugmeIzmena = document.createElement("button");
        dugmeIzmena.classList.add("dugmeIzmena");
        dugmeIzmena.innerHTML = "Izmeni";
        this.filmKontejner.appendChild(dugmeIzmena);
        dugmeIzmena.onclick = (ev) => {
            this.dogadjaj("u");
        }

        var dugmeZaPodatke = document.createElement("button");
        dugmeZaPodatke.classList.add("dugmeZaPodatke");
        dugmeZaPodatke.innerHTML = "Data";
        this.filmKontejner.appendChild(dugmeZaPodatke);
        dugmeZaPodatke.onclick = (ev) => {
            this.dogadjaj("i");
        }
    }

    dogadjaj(znak) {
        // Brisanje filma
        if (znak === "-") {
            var potvrda = confirm("Da li ste sigurni da zelite da obrisete ovaj film?")
            if (potvrda === true) {
                this.obrisiFilmUBazi().then(response =>{
                    if (response.ok) { 
                        alert("Uspesno obrisan film.");
                        console.log(this.filmKontejner);
                        var roditelj = this.filmKontejner.parentNode;
                        console.log(roditelj);
                        roditelj.removeChild(this.filmKontejner);
                        this.red.nizFilmova = this.red.nizFilmova.filter(el => el.id !== this.id);
                        this.red.azurirajRedInfoNakonBrisanjaFilma();
                        console.log(this.red);
                    }
                    else{
                        alert("Greska pri brisanju.");
                    }
                });
            }
        }

        // Update filma
        if (znak === "u") {
            //alert("Izmena jednog filma");
            var trebaUpdateTrajanjaFilma = true;
            var trebaUpdateGodineFilma = true;
            var novoTrajanje = prompt("Unesite novo trajanje", this.trajanje);
            if (novoTrajanje === "" || novoTrajanje === null) {   
                novoTrajanje = this.trajanje;
                trebaUpdateTrajanjaFilma = false;
            }

            if (novoTrajanje < 5 || novoTrajanje > 240){
                alert("Trajanje mora biti izmedju 5 i 240 minuta. \nTrajanje nece biti azurirano!")
                novoTrajanje = this.trajanje;
                trebaUpdateTrajanjaFilma = false;
            }

            var novaGodina = prompt("Unesite novu godinu", this.godina);
            if (novaGodina === "" || novaGodina === null) {
                novaGodina = this.godina;
                trebaUpdateGodineFilma = false;
            }

            if(novaGodina < 1800 || novaGodina > 2021){
                alert("Godina filma mora biti izmedju 1800 i 20201. \nGodina filma nece biti azurirana!")
                novaGodina = this.godina;
                trebaUpdateGodineFilma = false;
            }

            if(trebaUpdateTrajanjaFilma || trebaUpdateGodineFilma){
                this.izmeniFilmUBazi(novoTrajanje, novaGodina).then(response => {
                    if (response.ok) {
                        alert("Uspseno updatovani podaci.");
                        this.trajanje = novoTrajanje;
                        this.godina = novaGodina;
                    } else {
                        alert("Greska pri updatovanju.");
                        return false;
                    } 
                })
            }
        }

        if (znak === "i"){
            alert("Ime rezisera: " + this.imeRezisera + 
            "\nPrezime rezisera: " + this.prezimeRezisera + 
            "\nTrajanje: " + this.trajanje + " minuta " + 
            "\nGodina :" + this.godina);
        }
    }

    pogledFilma() {
        this.filmKontejner.style.backgroundColor = "yellow";
        setTimeout((ev) => {
            this.filmKontejner.style.backgroundColor = "silver";
        }, 5000
        );
    }

    snimiFilmUBazi(redId){
        return fetch("https://localhost:5001/api/Films/UpisiFilm/" + redId, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                naziv: this.naziv,
                imeRezisera: this.imeRezisera,
                prezimeRezisera: this.prezimeRezisera,
                tip: this.tip,
                trajanje: this.trajanje,
                godina: this.godina
            })
        })
    }

    obrisiFilmUBazi(){
        return fetch("https://localhost:5001/api/Films/IzbrisiFilm/" + this.id, {
            method: "DELETE"
        });
    }

    izmeniFilmUBazi(novoTrajanje, novaGodina){
        return fetch("https://localhost:5001/api/Films/IzmeniFilm", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.id,
                naziv: this.naziv,
                imeRezisera: this.imeRezisera,
                prezimeRezisera: this.prezimeRezisera,
                tip: this.tip,
                trajanje: novoTrajanje,
                godina: novaGodina
            })
        })
    }

    validirajFilm() {
        console.log("Valididr Film: " + this);

        if (this.trajanje > 240 || this.trajanje < 5){
            alert("Nevalidno trajanje filma. Film mora biti izmedju 5 i 240 minuta");
            return false;
        }

        if (this.godina <= 1800 || this.godina >= 2021){
            alert("Nevalidna godina filma. Godina filam mora biti izmedju 1800 i 2021.");
            return false;
        }

        return true;
    }
}