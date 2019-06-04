$(document).ready(function () {
    CallCostsInEventsPending();
    CallCostsInEventsPay();
    CallLost(); 
    CallWin();
    modalInit();
});
//Función para maquetar la información 
function setCostsDontPay(costs){
    let content = '';
    if(costs.length>0){
        costs.forEach(function(cost){
           if(cost.pay_status==2){
            content+=`
                <blockquote id="BarCard">
                    <div class="row">
                        <div class="col s12 m12">
                            <div class="card-panel">
                            <blockquote id="EventBar">
                            <span class="card-title">$${cost.name_event} </span>
                                <blockquote id="EventBar">
                                <span class="card-title"> <i class="material-icons left red-text">arrow_downward</i> $${cost.Cost} </span>
                                </blockquote>
                            </blockquote>
                            </div>
                        </div>
                    </div>
                </blockquote>
            `;
           }
        })
    }
    $('#ReadNotPay').html(content);
}
function setCostsPay(costs){
    let content = '';
    if(costs.length>0){
        costs.forEach(function(cost){
           if(cost.pay_status==1){
            content+=`
            <blockquote id="BarCard">
                <div class="row">
                    <div class="col s12 m12">
                        <div class="card-panel">
                            <blockquote id="SuccespayBar">
                            <span class="card-title">${cost.name_event} </span>
                                <blockquote id="SuccespayBar">
                                    <span class="card-title"> <i class="material-icons left green-text accent-4">arrow_upward</i> $${cost.Cost} </span>
                                </blockquote>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </blockquote>
            `;
           }
        })
    }
    $('#ReadPay').html(content);
}
//Llamar todos los eventos pagados
function CallCostsInEventsPay(){
    $.ajax(
        {
            url:requestGET('events','getCostsinEvents'),
            type:'POST',
            data:null,
            datatype:'JSON'
        }
    )
    .done(function(response)
        {
            if(isJSONString(response)){
                const result = JSON.parse(response);
                if(!result.status){
                    ToastError(result.exception);   
                }
                setCostsPay(result.dataset);
            }
            else{
                console.log(response);
            }
        }
    )
}
//Llamar todos los eventos pendientes de pago
function CallCostsInEventsPending(){
    $.ajax(
        {
            url:requestGET('events','getCostsinEvents'),
            type:'POST',
            data:null,
            datatype:'JSON'
        }
    )
    .done(function(response)
        {
            if(isJSONString(response)){
                const result = JSON.parse(response);
                if(!result.status){
                    ToastError(result.exception);   
                }
                setCostsDontPay(result.dataset);
            }
            else{
                console.log(response);
            }
        }
    )
}
//Llamar para obtener las perdidas
function CallLost(){
    $.ajax(
        {
            url:requestGET('events','Lost'),
            type:'POST',
            data:null,
            datatype:'JSON'
        }
    )
    .done(function(response)
        {
            if(isJSONString(response)){
                const result = JSON.parse(response);
                if(result.status){
                    $('#TitleCost').text("Perdida: "+"$"+result.dataset.Cost);
                }else{
                    ToastError(result.exception);
                }
            }
            else{
                console.log(response);
            }
        }
    )
}
function CallWin(){
    $.ajax(
        {
            url:requestGET('events','Win'),
            type:'POST',
            data:null,
            datatype:'JSON'
        }
    )
    .done(function(response)
        {
            if(isJSONString(response)){
                const result = JSON.parse(response);
                if(result.status){
                    $('#TitleWin').text("Ganancia: " + "$" + result.dataset.Cost);
                }else{
                    ToastError(result.exception);
                }
            }
            else{
                console.log(response);
            }
        }
    )
}