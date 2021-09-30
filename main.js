import { Klub } from "./klub.js";
import { Red } from "./red.js";
import { Film } from "./film.js";

fetch("https://localhost:5001/api/Klubs/PreuzmiKlubove").then((p) =>{
    p.json().then((data) => {
        data.forEach(el => {
            let klub = new Klub(el.id, 
                el.ime, 
                el.maksimalniBroj,
                el.redovi.length);
            klub.crtajKlub(document.body);
            procesirajRedove(klub);
        });
    })
});

function procesirajRedove(klub){
    fetch("https://localhost:5001/api/Reds/PreuzmiRedove/" + klub.id).then((p) =>{
        p.json().then((data) => {
            data.forEach(el => {
                let red = new Red(el.id,
                    el.tip,
                    el.redniBroj, 
                    el.maxKapacitet,
                    el.filmovi.length);

                klub.dodajRedUKlub(red);
                procesirajFilmove(red);
            });
        })
    });
}

function procesirajFilmove(red){
    fetch("https://localhost:5001/api/Films/PreuzmiFilmove/" + red.id).then((p) =>{
        p.json().then((data) => {
            data.forEach(el => {
                let film = new Film(el.id,
                    el.naziv,
                    el.imeRezisera,
                    el.prezimeRezisera,
                    el.tip,
                    el.trajanje,
                    el.godina);

                red.dodajFilmURed(film);
            });
        })
    });
}