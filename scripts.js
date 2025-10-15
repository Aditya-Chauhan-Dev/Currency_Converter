
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const amount=document.querySelector("form input");



for(let select of dropdown){
    for (code in countryList){
        let newopts=document.createElement("option");
        newopts.innerText=code;
        newopts.value=code;


        if(select.name=="from_Currency"&& code=="USD"){
            newopts.selected="selected";
        }
        else if(select.name=="to_Currency"&& code=="INR"){
            newopts.selected="selected";
        }
        select.append(newopts);
    }

    select.addEventListener("change",(evt) =>{
        flags(evt.target);
    })
}

const flags=(element)=>{
    let curr_code=element.value
    let country=countryList[curr_code];
    let newscr=`https://flagsapi.com/${country}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newscr;
}


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    let value=amount.value;
    if(value===""|| value<1){
        value=1;
        amount.value="1";
    }
    console.log(value)  

    from = document.querySelector(".from select").value.toUpperCase();
    let to = document.querySelector(".to select").value.toUpperCase();

    console.log(from, to, value);

     rates(from, to, value);
})


let rates = async (from, to, amount) => {
    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_BpgCFBRQNICSvVIWNk3GJEvHbF8Id8JhucP8640Y`;
    const res = await fetch(url);
    const info = await res.json();

    // Check if currencies exist
    if (!info.data[from] || !info.data[to]) {
        alert("Currency not supported");
        return;
    }

    // Get conversion rates
    const fromRate = info.data[from].value;
    const toRate = info.data[to].value;

    // Convert
    const result = (toRate / fromRate) * amount;
    let final_result=(`${amount} ${from} = ${result.toFixed(2)} ${to}`);
    let para=document.querySelector("p")
    para.innerText=final_result
};
