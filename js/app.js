

//Show more funkcionalnost
$('#showMore1').click(function(){
    $('#moreText1').toggle()
    if($('#moreText1').is(':visible'))
    {
        $(this).html('Show less');
    }
    else
    {
        $(this).html('Show more');
    }
})

$('#showMore2').click(function(){
    $('#moreText2').toggle()
    if($('#moreText2').is(':visible'))
    {
        $(this).html('Show less');
    }
    else
    {
        $(this).html('Show more');
    }
})

$('#showMore3').click(function(){
    $('#moreText3').toggle()
    if($('#moreText3').is(':visible'))
    {
        $(this).html('Show less');
    }
    else
    {
        $(this).html('Show more');
    }
})

$('#showMore4').click(function(){
    $('#moreText4').toggle()
    if($('#moreText4').is(':visible'))
    {
        $(this).html('Show less');
    }
    else
    {
        $(this).html('Show more');
    }
})

//Onload animacija

let bg = document.createElement('div');
$(bg).attr('id','loaderBackground');
$(bg).css(
    {
        'position':'fixed',
        'top':'0',
        'left':'0',
        'width':'100vw',
        'height':'100vh',
        'z-index':'1000',
        'background':'#33211D',
        'display':'flex',
        'justify-content':'center',
        'align-items':'center',
    }
)

let counter = document.createElement('p');
$(counter).css(
    {
        'color':'whitesmoke',
        'font-weight':'bold',
        'font-size':'4rem',
        'font-family':'Roboto, san-serif'
    }
)

let load = 1;
$(counter).html(load+'%');
$(bg).append(counter);
$('body').append(bg);
$('body').css('overflowY','hidden');

function increment(){
    load++; //brojac
    $(counter).html(load+'%');
    if(load==100) //ako je 100%
    {
        clearInterval(interval); //prekid intervala
        $('body').css('overflowY','scroll');
    }
    if(load == 80)
    {
        $(counter).fadeOut('slow'); //gasenje overlay-a
        $(bg).fadeOut('slow');
    }
}

let interval = setInterval(increment,15);

////// VALIDACIJA FORME ///////

var fullName=document.getElementById("fullName");
var email=document.getElementById("email");
var date = document.getElementById("date");
var select = document.getElementById("select");

var errFullName = document.querySelector('#errFullName');
var errEmail = document.querySelector('#errEmail');
var errSelect = document.querySelector('#errSelect');
var errDate = document.querySelector('#errDate');

var btn = document.querySelector('#submitBtn');


var regexFullName = /^(([a-zšđčćžA-ZŠĐČĆŽ']{2,20})+ ([a-zšđčćžA-ZŠĐČĆŽ']{2,20})+)$/;
var regexEmail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;


function fullNameCheck() {
    if (regexFullName.test(fullName.value)){
        errFullName.innerHTML='';
        errFullName.classList.remove('bad');
        return true;
    } 
    else {
      errFullName.innerHTML = "Correct format: Dolly Bell";
      errFullName.classList.add('bad');
      return false;
    }
};


function emailCheck () {
    if (regexEmail.test(email.value))
    {
        errEmail.innerHTML = '';
        email.classList.remove('bad');
        return true
    }
    else {
        errEmail.innerHTML = "Correct format: example@gmail.com";
        errEmail.classList.add('bad');
        return false
    }
};


function selectCheck () {
    if (select.value != 'Person')
    {
        errSelect.innerHTML = '';
        errSelect.classList.remove('bad');
        return true
    }
    else {
        errSelect.innerHTML = "Select the number of people.";
        errSelect.classList.add('bad');
        return false
    }
};


function dateCheck () {
    var inpDate = new Date(date.value);
    var currDate = new Date();
        
    if(inpDate.setHours(0, 0, 0, 0) > currDate.setHours(0, 0, 0, 0))
    {
        errDate.innerHTML = "";
        errDate.classList.remove('bad');
        return true
    } 
    else {
        errDate.innerHTML = "Date can't be in the past.";
        errDate.classList.add('bad');
        return false
    }         
};

if(fullName != null && email != null && select != null && date != null){
    fullName.addEventListener("blur", fullNameCheck);
    email.addEventListener("blur", emailCheck);
    select.addEventListener("blur", selectCheck);
    date.addEventListener("blur", dateCheck);
}


if(btn != null){
    btn.onclick = function formCheck(e){  
        e.preventDefault();
    
        fullNameCheck();
        emailCheck();
        selectCheck();
        dateCheck();
    
        if (fullNameCheck() && emailCheck() && selectCheck() && dateCheck()){
            location.reload();
            return true;
        }
        else
        {
            return false;
        }
    }
}


//Header prati na scroll
addEventListener('scroll', function(){
    if(scrollY>0)
    {
        navbar.classList.add('follow');
    }
    else
    {
        navbar.classList.remove('follow');
    }
})

//Lightroom kreiranje

var lightroomBg = document.createElement('div');
lightroomBg.classList.add('lightroomBg');

var imgContainer = document.createElement('img');
imgContainer.classList.add('imgContainer');

var imgDescription = document.createElement('p');
imgDescription.classList.add('description')

lightroomBg.appendChild(imgContainer);
lightroomBg.appendChild(imgDescription);

addEventListener('click',function(x){
    if(x.target.classList.contains('lightroom'))
    {
        document.querySelector('body').appendChild(lightroomBg);
        imgContainer.src = x.target.src;
        imgDescription.innerHTML=x.target.alt;
    }
    
    if(x.target.classList.contains('lightroomBg'))
    {
        lightroomBg.remove();
        imgContainer.src = '';
        imgDescription.innerHTML='';
    }
})

//menu open

var menuOpener = document.querySelector('#burger');
var menu = document.querySelector('#burgerMenu');
opened = false;

menuOpener.onclick = function(){
    if(!opened)
    {
        menu.style.transform = 'translateX(0)';
        opened=true;
    }
    else
    {
        menu.style.transform = 'translateX(100%)';
        opened=false;
    }
}

//menu zatvaranje na klik izvan
document.onclick = function(x)
{
    if(opened==1 && x.target.id!="burger" && x.target.parentNode.id!="burger")
    {
        burgerMenu.style.transform="translateX(100%)";
        opened=false;
    }
}


//AJAX
function ajaxCallback(filename, result){
    $.ajax({
        url:"json/" + filename + ".json",
        method: "get",
        dataType: "json",
        success:function(r)
        {
            result(r)
        }
        ,
        error: function(xhr) {
            if (xhr.status === 400) {
              console.log("Bad request: " + xhr.responseText);
            }
            else if (xhr.status === 401) {
              console.log("Unauthorized: " + xhr.responseText);
            }
            else if (xhr.status === 403) {
              console.log("Forbidden: " + xhr.responseText);
            }
            else if (xhr.status === 404) {
              console.log("Not found: " + xhr.responseText);
            }
            else if (xhr.status >= 500 && xhr.status < 600) {
              console.log("Server error: " + xhr.responseText);
            }
            else {
              console.log("Unknown error: " + xhr.responseText);
            }
        }
    })
}

//ajaxCallback
$(document).ready(function(){
    

    ajaxCallback("product", ispisProizvoda)
    ajaxCallback("category", ispisKategorija)
    ajaxCallback("sort", sort)
    ajaxCallback("social", ispisDrustvenihMreza)

    stampaBr()
    prikazKorpe()
})
function filter(){
    ajaxCallback("product", ispisProizvoda)
    
}


$("#sort-price").click(filter)
$('#search-input').keyup(filter)


let kategorije=[]
let produkt = document.querySelector("#products")
let sortiranjeCene =  document.querySelector("#sort-price")
let mreze = document.querySelector("#social")

//Dohvatanje iz Local Storage
function setujLocalStorageItem(naziv, vrednost){
    localStorage.setItem(naziv, JSON.stringify(vrednost))
}
 function dohvatiLocalStorageItem(naziv){
    return JSON.parse(localStorage.getItem(naziv));
 }
 

 //Ispis kategorija   
function ispisKategorija(nizKat){
    let ispis ="<ul>"

    for(let kat of nizKat){
        ispis += `<li><input type="checkbox" value='${kat.id}'
        name="kategorije" class="caffee-filter kat"><label class="check">${kat.naziv}</label></li>`
    }
    ispis+="</ul>"

    $("#category").html(ispis);

    
    $('.kat').change(filter)
    setujLocalStorageItem("categoryLS",nizKat)

}


//Filter po kategoriji
function filterKategorija(kafe){
    let nizKafe = [];
    let filterKafe=[]
    $('.caffee-filter:checked').each(function(e){
        nizKafe.push(parseInt($(this).val()));
    })
    if(nizKafe.length > 0){
        
      filterKafe = kafe.filter(k => nizKafe.includes(k.kategorijaID));
      return filterKafe
    }
    else return kafe;  
}

//Ispis proizvoda

function ispisProizvoda(niz){

    setujLocalStorageItem("productLS",niz)
    niz=filterKategorija(niz)
    niz=filterPretraga(niz)
    niz=sortiraj(niz)
    niz=rangeSort(niz)

    let ispis=""
    if(produkt != null){
        if(niz.length > 0){
            for(let n of niz){
                ispis += `
                <div class="card drinks col-sm-3 align-items-center  " >
                
                <img src="${n.slika.src}" alt="${n.slika.alt}" class="rounded-circle mb-3 mb-sm-0 img-fluid"/><br>
                <h5>${n.naziv}</h5>
                <p> ${n.kalorije} calories </p>
                <p> ${n.cena}$</p>
                
                <div class="btn">
                    <button  type="button" class="btn-Cart add" data-id="${n.id}"> ADD TO CART</button>
                </div>
            </div>`
            }
        }
        else{
            ispis += `<div class="text-danger h2 bg rounded p-3 mt-5">Sorry, there are currently no products with selected features ...</div>`
        }
        produkt.innerHTML = ispis;
    }
       
        
}
//Na dogadjaj "click" dodaje se proizvod u korpu
$(document).on("click", ".add", dodajUKorpu)



//Dodavanje proizvoda u korpu
function dodajUKorpu(){
    let proizvodiUKorpi = dohvatiLocalStorageItem("proizvodiKorpa")
    let id = $(this).data("id")

    let addedItemText = document.querySelector("#added-item");
    let addedItemP = document.querySelector("#text-item-p");
            
    addedItemText.classList.remove("hide");
    addedItemP.innerHTML = "You have successfully added an item to your cart!";
            
    setInterval(function(){
            addedItemText.classList.add("hide");
            addedItemP.innerHTML="";
    },5000)
  
    if(proizvodiUKorpi){
        if(daLiPostojiProizvod()){
            promenaKolicine()
        }
        else{
            dodajNoviUKorpu()
        }
    }
    else{
        dodajPrviUKorpu()
    }
    stampaBr()
   
    function dodajPrviUKorpu(){
        let niz=[]
        niz[0]={
            id:id,
            kolicina:1
        }
        setujLocalStorageItem("proizvodiKorpa", niz)
    }

    function daLiPostojiProizvod(){
        let niz=[]

        for(let p of proizvodiUKorpi){
            if(p.id == id){
                niz.push(p)
            }
        }
        return niz.length
    }

    function promenaKolicine(){

        for(let n of proizvodiUKorpi){
            if(n.id == id){
                n.kolicina++
                break
            }
        }
        setujLocalStorageItem("proizvodiKorpa", proizvodiUKorpi)
    }
    function dodajNoviUKorpu(){

        proizvodiUKorpi.push({
            id:id,
            kolicina:1
        })
        setujLocalStorageItem("proizvodiKorpa", proizvodiUKorpi)
    }

    
}


function prikazKorpe(){
    
let proizvodiUKorpi = dohvatiLocalStorageItem("proizvodiKorpa")
    if(proizvodiUKorpi == null){
        prikazPrazneKorpe()
    }
    else{
        popunjavanjeKorpe()
    }
    
}

function prikazPrazneKorpe(){
    $("#cartDiv").html(`<div class="text-danger h2 bg rounded p-3 mt-5">Your cart is empty!</div>`)
}


function popunjavanjeKorpe(){
    let proizvodiUKorpi = dohvatiLocalStorageItem("proizvodiKorpa")

    let proizvodi = []
    let sviProizvodi = dohvatiLocalStorageItem("productLS")
    proizvodi = sviProizvodi.filter(k=>{
        for(let n of proizvodiUKorpi){
            if(k.id == n.id){
                k.kolicina = n.kolicina
                return true
            }
        }
        return false
    })
    ispisKorpe(proizvodi)
    
}
function ispisKorpe(proizvodi){
    let ispis =` <table class="table text-center mb-0 ">
    <thead class="bg-secondary text-white ">
    <tr class="text-center">
        <th>Products</th>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
        <th>Remove</th>
    </tr>
</thead>
<tbody id="cartTable" class="align-middle">`
    let sum =0
    for(let n of proizvodi){
        ispis+= `<tr id="${n.id}" class="red">
            <td class="align-left"><img src="${n.slika.src}" style="width: 100px;"></td>
            <td class="naziv align-middle">${n.naziv}</td>
            <td class=" align-middle">$${n.cena}</td>
            <td class="align-middle">
                <div class="input-group quantity mx-auto" style="width: 100px;">
                    <div class="changeQuantity input-group-btn">
                        <button class="btn btn-sm btn-primary minus" onclick="minus(${n.id})"  data-id="${n.id}">
                        <i class="fa fa-minus"></i>
                        </button>
                    </div>
                    <input type="text" id="quantity" class="form-control form-control-sm bg-secondary text-center text-white input" value="${n.kolicina}" >
                   
                    <div class="changeQuantity input-group-btn">
                        <button class="btn btn-sm btn-primary plus" data-id="${n.id}"
                        onclick="plus(${n.id})">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td class="total align-middle">$${n.cena * n.kolicina}</td>
    <td class="align-middle"><div><button class="remove btn btn-sm btn-primary" data-id="${n.id}">Remove</button><div></td>
    </tr>`
    
    sum = sum + (n.cena * n.kolicina)
    }
    ispis += `<tr>
    <td></td>
    <td></td>
    <td></td>
    <td class="naziv">TOTAL PRICE:</td>
    <td  id="total-price"></td>
    <td><button class="btn btn-sm btn-primary order">Order Now</button></td>
    </tr>
    </tbody> </table>
    `

    $("#cartDiv").html(ispis)
    $(".remove").click(brisi)
    $("#total-price").html(`$${sum}`)
    $(".order").click(order)

}


//Order Now
function order(){
    let addedItemText = document.querySelector("#added-item")
    let addedItemP = document.querySelector("#text-item-p")

    addedItemText.classList.remove("hide")
    addedItemP.innerHTML = " You have successfully ordered items from your cart! "

    setInterval(function(){
        addedItemText.classList.add("hide")
        addedItemP.innerHTML=""
    },5000)

    localStorage.removeItem("proizvodiKorpa")
   
    prikazKorpe()
}
//Brisanje elemenata iz korpe
function brisi(){
    let id = $(this).data("id")

    let proizvodiUKorpi = dohvatiLocalStorageItem("proizvodiKorpa")
    let niz=[]
    for(let p of proizvodiUKorpi){
        if(p.id != id){
            niz.push(p)
        }
    }

    if(niz.length == 0){
        localStorage.removeItem("proizvodiKorpa")
    }
    else{
        setujLocalStorageItem("proizvodiKorpa", niz)
    }
    prikazKorpe()
}

//Promena kolicine u korpi
function minus(id){
     let proizvodiUKorpi = dohvatiLocalStorageItem("proizvodiKorpa")

     for(let p of proizvodiUKorpi){
         if(p.id == id){
             if(p.kolicina > 0){
                p.kolicina--
             }
         }
     }
     
    setujLocalStorageItem("proizvodiKorpa", proizvodiUKorpi)

   
    prikazKorpe()
    
}

function plus(id){

    let proizvodiUKorpi = dohvatiLocalStorageItem("proizvodiKorpa")

    for(let p of proizvodiUKorpi){
        if(p.id == id){
            p.kolicina++
        }
    }

    setujLocalStorageItem("proizvodiKorpa", proizvodiUKorpi)
   
    prikazKorpe()
}


//Stampa broja elemenata korpe
function stampaBr(){
    var proizvodiIzLS = dohvatiLocalStorageItem("proizvodiKorpa")

        if(proizvodiIzLS != null){
            let br = proizvodiIzLS.length
            $("#number").html(br)
        }
        else{
            $("#number").html("0")
        }
}


//Range
function minCena(product){
    let nizCena=[]
    
    product.forEach(p => {
        nizCena.push(p.cena)
    });

    nizCena.sort((a,b) => a - b)

    return nizCena[0]
}
function maxCena(product){
    let nizCena=[]
    
    product.forEach(p => {
        nizCena.push(p.cena)
    });

    nizCena.sort((a,b) => b - a)
    
    return nizCena[0]
}


    let proizvodi = dohvatiLocalStorageItem("productLS")
    let range = document.querySelector("#range")
    let rValue = document.querySelector("#rValue")

    if(range != null){
        range.min = minCena(proizvodi)
    range.max = maxCena(proizvodi)
    range.value = maxCena(proizvodi)

    range.addEventListener("change", function(){
        rValue.innerHTML = range.value
})
    }
    

    
    
function rangeSort(product){
    let rangeValue = $("#range").val()

    return product.filter(f => f.cena <= rangeValue)
}
$("#range").change(filter)


   


//Sortiranje 

function sort(niz){
    if(sortiranjeCene != null){

        let ispis = `<h4>SORTING</h4>
    <select id="sort"><option value="0">Choose</option> `
    for(let n of niz){
        ispis += `<option value="${n.vrednost}">${n.naziv}</option>`
    }
    ispis += `</select>`

    sortiranjeCene.innerHTML = ispis
    }

}

function sortiraj(podaci){
    
    let sort = dohvatiLocalStorageItem("sort")
    let id=$("#sort").val()
    
    if(id == "0"){
        return podaci
    }
    else if(id=="cena-asc"){
        return podaci.sort((a,b) =>  a.cena - b.cena) 
    }
    else if(id=="cena-desc"){
        return podaci.sort((a,b) => b.cena - a.cena)
    }
    else if(id == "kalorije-asc"){
        return podaci.sort((a,b) => a.kalorije - b.kalorije)
    }
    else if(id == "kalorije-desc"){
        return podaci.sort((a,b) => b.kalorije - a.kalorije)
    }
     else if(id == "naziv-asc"){
        return podaci.sort(function (a,b){
            if(a.naziv < b.naziv){
                return -1;
            }
            else if(a.naziv > b.naziv){
                return 1;
            }
            else{
                return 0;
            }
         })
     
     }
     else if(id == "naziv-desc"){
         return podaci.sort(function(a,b){
            if(a.naziv > b.naziv){
                return -1;
            }
            else if(a.naziv < b.naziv){
                return 1;
            }
            else{
                return 0;
            }
         })
         
     }   

    return podaci
}

// function ispisRange(){
//     let ispis = `
//     <h4> RANGE</h4>
//     <input type="range" id="range" min="0" max="10" value="0"/>
//     <span id="rValue"></span> `

//     document.qu
// }

//Pretraga po nazivu
function filterPretraga(podaci){
    var filterPodaci=[]
    
    let input = $("#search-input").val()

    // if(input != null){
    // filterPodaci = podaci.filter(f => f.naziv.toLowerCase().includes(input.toLowerCase()))

    if(input != null){
        for(let p of podaci){
            if(p.naziv.toLowerCase().includes(input.toLowerCase())){
                filterPodaci.push(p)
            }
        }
    }
    return filterPodaci
}


//Ispis ikonica drustvenih mreza

 function ispisDrustvenihMreza(niz){
     let ispis = ""
     for(let n of niz){
         ispis += `
             <a class="btn btn-lg btn-outline-light btn-lg-square mr-2" href="${n.href}"><i class="${n.icon}"></i></a>`
     }

     mreze.innerHTML = ispis
}






