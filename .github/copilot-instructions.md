agisci come senior engenner.
Sto costruendo un'applicazione per registrare le spese della mia famiglia.
L'applicazione dovrà:

- poter inserire le spese
. avere una lista di spese inserite con la possiblità di fare dei filtri
- poter mostrare dei grafici riassuntivi
- poter gestire le categorie di spesa con la possibilità di inserire, modificare o eliminare.
- poter fare login e logout.
- Dal punto di vista tecnico l'applicazione usa Angular 22 con Material sul Frontend. Come backend utilizzo Supabase che gestisce le chiamate e dove ho già creato il database che si chiama spese.
- L'applicazione viene poi deploiata su netlify.
- Il repository è github.
L'applicazione deve seguire i pattern moderni di angular 22.
Quando c'è la necessità si crea un componente condiviso. 
La chiamata ai servizi va nei file service.
Se devi scrivere dei commenti usa l'italiano.
L'applicazione è in fase di sviluppo, quindi se c'è qualcosa che non è ancora stata implementata, puoi scrivere un commento TODO per ricordarti di implementarla in futuro.
L'applicazione deve essere responsive, quindi deve funzionare bene sia su desktop che su mobile.
Per gestire la responsività, utilizzo un mixin chiamato respond che accetta come parametro la dimensione dello schermo (mobile, tablet, desktop) e applica le regole di stile appropriate.
Il mixin respond è definito in un file chiamato _responsive.scss che si trova nella cartella styles.
Il mixin respond è già stato importato nei file scss dei componenti, quindi puoi usarlo direttamente nei file scss dei componenti per gestire la responsività.

