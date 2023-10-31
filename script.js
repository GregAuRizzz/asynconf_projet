// Utilisation de const et let
const listeDonnee = {};
let passager = 0;
let somme = 0;

// Utilisation de fonctions fléchées
const Addpoint = async (element, valeur) => {
    const response = await fetch('./donnees.json');
    const data = await response.json();

    if (element === "passagers") {
        passager = data[element].find(item => item.Nom === valeur)?.taux;
    } else {
        const NoteEcologique = data[element].find(item => item.Nom === valeur)?.NoteEcologique;
        listeDonnee[element] = NoteEcologique;
    }

    if (Object.keys(listeDonnee).length === 4) {
        Calcul();
    }
};

const Calcul = () => {
    somme = Object.values(listeDonnee).reduce((acc, val) => acc + val, 0);

    const tauxFinaux = somme <= 10 ? 3 : 
                        somme <= 15 ? 2.74 : 
                        somme <= 25 ? 2.52 : 
                        somme <= 33 ? 2.10 : 1.85;

    const tauxFinal = tauxFinaux + passager;

    const element = document.getElementById("taux");
    element.innerHTML = `Votre taux d'emprunt est estimé à : ${tauxFinal.toFixed(2)}%`;
};
