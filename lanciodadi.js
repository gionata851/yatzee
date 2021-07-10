// variabili globali


turnoGiocatore = 1;

lanci = 1;

giocatore1 = new Object();
giocatore2 = new Object();
giocatoreCorrente = new Object();


giocatore1.nome = "Giocatore 1"
giocatore2.nome = "Giocatore 2"

giocatore1.punteggio = 0;
giocatore2.punteggio = 0;

giocatore1.arrayVincite = [false,false,false,false,false,false,false,false,false,false,false,false,false];
giocatore2.arrayVincite = [false,false,false,false,false,false,false,false,false,false,false,false,false];

arrayRisultati = new Array(5);

arraySelezioneRilancio = new Array(false,false,false,false,false); // i dati che vengono selezionati per essere rilanciati. Viene valorizzata nella funzione resetDadiSelezionati.


ptCoppia= 15; ptDoppiaCoppia=20; ptTris=30; ptFull=50; ptPoker=90; ptScala=120; ptYatzee=150;

var stringaVincita = ''; // la stringa che verrà pubblicata in info3

spanStampa = document.createElement("span");




// aggiornamento iniziale riquadro punteggi
var boxPunti;
var radioBoxVincite;
var dadi;
var nomiVincite = new Array(13);

function caricamento(){
dadi = document.getElementsByClassName('dado');
radioBoxVincite = document.getElementsByName('wintable');
boxPunti = document.getElementById("boxPunti");
boxPunti.innerHTML = (`<div class="box1">${giocatore1.nome}: ${giocatore1.punteggio} <br>
	${giocatore2.nome}: ${giocatore2.punteggio}  </div>
	<div class="box2">è il turno del ${giocatoreCorrente.nome} <br>
	lancio numero: ${lanci}</div>`);

for (let i = 0; i <= 12; i++ ){
	nomiVincite[i]=document.getElementById('boxN'+i);
}

}
// funzioni basiche

function AbilitaBottone(id){
	document.getElementById(id).disabled = false;
	console.log(`il pulsante ${id} è stato abilitato.` );
}

function DisabilitaBottone(id){
	document.getElementById(id).disabled = true;
	console.log(`il pulsante ${id} è stato disabilitato.` );
}

function visualizza(cl){
	document.getElementsByClassName(cl)[0].style.display = "block";


	console.log(`la ${cl} è stata visualizzata`);
}

function nascondi(cl){
	document.getElementsByClassName(cl)[0].style.display = "none";
	console.log(`la info1 è stata nascosta`);
}


// funzioni gestione dadi

function	lancio(){
		var L = NaN;
		var L = Math.round((6*Math.random())+0.5);
		if (L<1)
			L=1;
		if (L>6)
			L=6;
		return L;
}
//generazione casuale singola

function lancioDado(n){
	Risultato = lancio();
	document.getElementById('dado'+n).classList.replace('resX',"res"+Risultato);
	arrayRisultati[n-1] = Risultato;
	console.log(`è stato lanciato il dado ${n} ed è uscito ${Risultato}.`);
}
//attribuzione al dado n del lancio casuale e stampa in array risultati

function lancioGlobale(){
	console.log(`Lancio globale di tutti i dadi.`);
	lancioDado(1); lancioDado(2); lancioDado(3); lancioDado(4); lancioDado(5);
}
// è la funzione lancioDado ripetuta per tutti e 5 i dadi.

function resettaDado(n){
	var classeres = document.getElementById('dado'+n).classList[1].match(/res\d/)[0];
	// document.getElementById('dado'+n).classList.replace(classeres,"resX"); soluzione 1, preferita la 2 alla fine perchè è più semplice.
	document.getElementById('dado'+n).setAttribute("class","dado resX");
	console.log(`il dado ${n} è stato resettato`);
}
// la funzione che resetta il dado n

function resetDadiSelezionati(){
	console.log(`Dadi selezionati.`);
	for (i = 1; i<=5; i++){
	 dado = document.getElementById('seldado'+i);
	 if (dado.checked == true){
		 arraySelezioneRilancio[i-1] = true;
		 resettaDado(i);
	 };
 };
}
// la funzione scannerizza le checkbox, se selezionata la checkbox aggiorna l'arraySelezioneRilancio e resetta il dado.

function rilancio(){
	for (i = 1; i<=5 ; i++){
		if (arraySelezioneRilancio[i-1]){
				lancioDado(i);
				arraySelezioneRilancio[i-1] = false;
	 		};
	 };
}
// esegue il rilancio dei dadi selezionati e resettati. Il rilancio avviene se il corrispondente valore di arraySelezioneRilancio è true.

function abilitaSelezioneDadi(){
	document.getElementById('seldado1').disabled = false;
	document.getElementById('seldado2').disabled = false;
	document.getElementById('seldado3').disabled = false;
	document.getElementById('seldado4').disabled = false;
	document.getElementById('seldado5').disabled = false;
}
// abilita le checkbox

function deselezioneDadi(){

	document.getElementById('seldado1').checked = false;
	document.getElementById('seldado2').checked = false;
	document.getElementById('seldado3').checked = false;
	document.getElementById('seldado4').checked = false;
	document.getElementById('seldado5').checked = false;

	document.getElementById('seldado1').disabled = true;
	document.getElementById('seldado2').disabled = true;
	document.getElementById('seldado3').disabled = true;
	document.getElementById('seldado4').disabled = true;
	document.getElementById('seldado5').disabled = true;

	console.log(`tutti i dadi deselezionati`);

}
// disabilita e cancella le checkbox


// funzioni verifica vincite. Ogni funzione poi viene assegnata agli oggetti giocatori come metodo

function vincitaNum(num){
	punteggioLocale = 0; //serve a contare i punti all'interno della funzione (per questo si chiama locale)
	console.log(arrayRisultati);
	for (index of arrayRisultati){
		console.log(`controllo ${index}`);
		if (index==num){
			punteggioLocale += num;
			console.log(`${index} è ok!
			punti guadagnati = ${punteggioLocale}`);
		}else{
			console.log(`${index} non va bene`);
		}
	}
	this.punteggio += punteggioLocale;
	stringaVincita = `hai totalizzato ${punteggioLocale}.
		Il ${this.nome} ha ${this.punteggio}.`;
	arrayRisultati = [undefined,undefined,undefined,undefined,undefined];
	switch (num) {
		case 1:
		  this.arrayVincite[0] = true;
			break;
		case 2:
		  this.arrayVincite[2] = true;
			break;
		case 3:
		  this.arrayVincite[4] = true;
			break;
		case 4:
			this.arrayVincite[6] = true;
			break;
		case 5:
		  this.arrayVincite[8] = true;
			break;
		case 6:
		  this.arrayVincite[10] = true;
			break;
	}
}
giocatore1.vincitaNum = vincitaNum;
giocatore2.vincitaNum = vincitaNum;

function coppia(){
	arrayOrdinato = arrayRisultati.sort();
	console.log(arrayOrdinato);
	if (arrayOrdinato[0]==arrayOrdinato[1] || arrayOrdinato[1]==arrayOrdinato[2] || arrayOrdinato[2]==arrayOrdinato[3] || arrayOrdinato[3]==arrayOrdinato[4] ){
		this.punteggio += ptCoppia;
		stringaVincita = `è coppia!
			Il ${this.nome} ha ${this.punteggio} punti`;
		this.arrayVincite[1] = true;
		return true;
	}
	else{
		stringaVincita = `coppia non rilevata.`;
		return false;
	};
	arrayRisultati = [undefined,undefined,undefined,undefined,undefined];
}
giocatore1.coppia = coppia;
giocatore2.coppia = coppia;

function doppiacoppia(){
	arrayOrdinato = arrayRisultati.sort();
	console.log(arrayOrdinato);
	if ((arrayOrdinato[0]==arrayOrdinato[1] && arrayOrdinato[2]==arrayOrdinato[3]) || (arrayOrdinato[0]==arrayOrdinato[1] && arrayOrdinato[3]==arrayOrdinato[4]) || (arrayOrdinato[1]==arrayOrdinato[2] && arrayOrdinato[3]==arrayOrdinato[4])){
		this.punteggio += ptDoppiaCoppia;
		stringaVincita = `è doppia coppia!
			Il ${this.nome} ha ${this.punteggio} punti`;
		this.arrayVincite[3] = true;
		return true;
	}
	else{
		stringaVincita = `doppia coppia non rilevata`;
		return false;
	}
  arrayRisultati = [undefined,undefined,undefined,undefined,undefined];
}
giocatore1.doppiacoppia = doppiacoppia;
giocatore2.doppiacoppia = doppiacoppia;

function tris(){
	arrayOrdinato = arrayRisultati.sort();
	console.log(arrayOrdinato);
	if ((arrayOrdinato[0]==arrayOrdinato[1] && arrayOrdinato[1]==arrayOrdinato[2]) || (arrayOrdinato[1]==arrayOrdinato[2] && arrayOrdinato[2]==arrayOrdinato[3]) || (arrayOrdinato[2]==arrayOrdinato[3] && arrayOrdinato[3]==arrayOrdinato[4])){
		this.punteggio += ptTris;
		stringaVincita = `è tris!
			Il ${this.nome} ha ${this.punteggio} punti`;
		this.arrayVincite[5] = true;
		return true;
	}
	else{
		stringaVincita = `tris non rilevato`;
		return false;
	}
  arrayRisultati = [undefined,undefined,undefined,undefined,undefined];
}
giocatore1.tris = tris;
giocatore2.tris = tris;

function full(){
	arrayOrdinato = arrayRisultati.sort();
	console.log(arrayOrdinato);
	if ((arrayOrdinato[0]==arrayOrdinato[1] && arrayOrdinato[2]==arrayOrdinato[3] && arrayOrdinato[3]==arrayOrdinato[4]) || (arrayOrdinato[1]==arrayOrdinato[2] && arrayOrdinato[2]==arrayOrdinato[3]) || (arrayOrdinato[0]==arrayOrdinato[1] && arrayOrdinato[1]==arrayOrdinato[2] && arrayOrdinato[3]==arrayOrdinato[4])){
		this.punteggio += ptFull;
		stringaVincita = `è full!
			Il ${this.nome} ha ${this.punteggio} punti`;
		this.arrayVincite[7] = true;
		return true;
	}
	else{
		stringaVincita = `full non rilevato`;
		return false;
	}
  arrayRisultati = [undefined,undefined,undefined,undefined,undefined];
}
giocatore1.full = full;
giocatore2.full = full;

function poker(){
	arrayOrdinato = arrayRisultati.sort();
	console.log(arrayOrdinato);
	if ((arrayOrdinato[0]==arrayOrdinato[1] && arrayOrdinato[1]==arrayOrdinato[2] && arrayOrdinato[2]==arrayOrdinato[3]) || (arrayOrdinato[1]==arrayOrdinato[2] && arrayOrdinato[2]==arrayOrdinato[3] && arrayOrdinato[3]==arrayOrdinato[4] )){
		this.punteggio += ptPoker;
		stringaVincita = `è Poker!
			Il ${this.nome} ha ${this.punteggio} punti`;
		this.arrayVincite[9] = true;
		return true;
	}
	else{
		stringaVincita = `poker non rilevato`;
		return false;
	}
  arrayRisultati = [undefined,undefined,undefined,undefined,undefined];
}
giocatore1.poker = poker;
giocatore2.poker = poker;

function scala(){
	arrayOrdinato = arrayRisultati.sort();
	console.log(arrayOrdinato);
	if (arrayOrdinato[0]==(arrayOrdinato[1]-1) && arrayOrdinato[1]==(arrayOrdinato[2]-1) && arrayOrdinato[2]==(arrayOrdinato[3]-1) && arrayOrdinato[3]==(arrayOrdinato[4]-1)){
		this.punteggio += ptScala;
		stringaVincita = `è Scala!
			Il ${this.nome} ha ${this.punteggio} punti`;
		this.arrayVincite[11] = true;
		return true;
	}
	else{
		stringaVincita = `scala non rilevata`;
		return false;
	}
  arrayRisultati = [undefined,undefined,undefined,undefined,undefined];
}
giocatore1.scala = scala;
giocatore2.scala = scala;

function yatzee(){
	arrayOrdinato = arrayRisultati.sort();
	console.log(arrayOrdinato);
	if (arrayOrdinato[0]==arrayOrdinato[1] && arrayOrdinato[1]==arrayOrdinato[2] && arrayOrdinato[2]==arrayOrdinato[3] && arrayOrdinato[3]==arrayOrdinato[4]){
		this.punteggio += ptYatzee;
		stringaVincita = `è yatzee!
			Il ${this.nome} ha ${this.punteggio} punti`;
		this.arrayVincite[12] = true;
		return true;
	}
	else{
		stringaVincita = `yatzee non rilevato`;
		return false;
	}
  arrayRisultati = [undefined,undefined,undefined,undefined,undefined];
}
giocatore1.yatzee = yatzee;
giocatore2.yatzee = yatzee;

// funzione di scansione arrayvincite del giocatore corrente per abilitare le radiobox
function scansioneArrayVincite(){
	for (index in this.arrayVincite){
		if (this.arrayVincite[index]){
			radioBoxVincite[index].disabled = true;
			nomiVincite[index].style.textDecoration = "line-through"
		}
	}
}
giocatore1.scansioneArrayVincite = scansioneArrayVincite;
giocatore2.scansioneArrayVincite = scansioneArrayVincite;

// funzione di verifica dichiarazione
function dichiara(){

	if (radioBoxVincite[0].checked)
	 {this.vincitaNum(1);radioBoxVincite[0].checked=false;}
	if (radioBoxVincite[1].checked)
	 {this.coppia();radioBoxVincite[1].checked=false;}
	if (radioBoxVincite[2].checked)
	 {this.vincitaNum(2);radioBoxVincite[2].checked=false;}
	if (radioBoxVincite[3].checked)
	 {this.doppiacoppia();radioBoxVincite[3].checked=false;}
	if (radioBoxVincite[4].checked)
	 {this.vincitaNum(3);radioBoxVincite[4].checked=false;}
	if (radioBoxVincite[5].checked)
	 {this.tris();radioBoxVincite[5].checked=false;}
	if (radioBoxVincite[6].checked)
	 {this.vincitaNum(4);radioBoxVincite[6].checked=false;}
	if (radioBoxVincite[7].checked)
	 {this.full();radioBoxVincite[7].checked=false;}
	if (radioBoxVincite[8].checked)
	 {this.vincitaNum(5);radioBoxVincite[8].checked=false;}
	if (radioBoxVincite[9].checked)
	 {this.poker();radioBoxVincite[9].checked=false;}
	if (radioBoxVincite[10].checked)
	 {this.vincitaNum(6);radioBoxVincite[10].checked=false;}
	if (radioBoxVincite[11].checked)
	 {this.scala();radioBoxVincite[11].checked=false;}
	if (radioBoxVincite[12].checked)
	 {this.yatzee();radioBoxVincite[12].checked=false;}
}
giocatore1.dichiara = dichiara;
giocatore2.dichiara = dichiara;


function stampaInfo3(){
	spanStampa.innerHTML = stringaVincita;
	document.getElementsByClassName('info3')[0].insertBefore(spanStampa,document.getElementById("ok"));
}

// funzione di reset globale di fine turno
function fineTurno(){
	spanStampa.remove();
	resettaDado(1);resettaDado(2);resettaDado(3);resettaDado(4);resettaDado(5);
	nascondi('info1');nascondi('info2');nascondi('info3');
	AbilitaBottone('lancio');
	stringaVincita ='';
  arrayRisultati = [undefined,undefined,undefined,undefined,undefined];
	arraySelezioneRilancio = [false,false,false,false,false];

	for (i=0; i<13; i++){
		radioBoxVincite[i].disabled = false;
		nomiVincite[i].style.textDecoration = "none";
	}

	if (turnoGiocatore == 1){
		turnoGiocatore = 2;
		giocatoreCorrente = giocatore2;
		dadi[0].style.backgroundColor = "green";
		dadi[1].style.backgroundColor = "green";
		dadi[2].style.backgroundColor = "green";
		dadi[3].style.backgroundColor = "green";
		dadi[4].style.backgroundColor = "green";
	}
	else{
		turnoGiocatore = 1;
		giocatoreCorrente = giocatore1;
		dadi[0].style.backgroundColor = "red";
		dadi[1].style.backgroundColor = "red";
		dadi[2].style.backgroundColor = "red";
		dadi[3].style.backgroundColor = "red";
		dadi[4].style.backgroundColor = "red";
		lanci++;
	}
	boxPunti.innerHTML = (`<div class="box1">${giocatore1.nome}: ${giocatore1.punteggio} <br>
		${giocatore2.nome}: ${giocatore2.punteggio}  </div>
		<div class="box2">è il turno del ${giocatoreCorrente.nome} <br>
		lancio numero: ${lanci}</div>`);
	if (lanci==11){
		DisabilitaBottone('lancio');
		if (giocatore1.punteggio>giocatore2.punteggio)
		boxPunti.innerHTML = (`La partita è finita!
			Vince il Giocatore 1`);
		else
		boxPunti.innerHTML = (`La partita è finita!
			Vince il Giocatore 2`);
	}
}



function confermaUscita(){
	return 'Se esci ora perderai i progressi. Confermi?';

}

// window.beforeunload = confermaUscita();

// window.addEventListener("beforeunload", confermaUscita());

// window.onbeforeunload = function() {
// 	confirm('Se esci ora perderai i progressi. Confermi?');
// 	return 'cazzo';
// }

// function controlloGiocatore(){ non serve più, funziona alla grande, yeah!
// 	console.log(`Wè bello, sono il ${this.nome}`);
// }
// giocatore1.controlloGiocatore = controlloGiocatore;
// giocatore2.controlloGiocatore = controlloGiocatore;

giocatoreCorrente = giocatore1; //il giocatoreCorrente è quello che cambia a ogni turno
