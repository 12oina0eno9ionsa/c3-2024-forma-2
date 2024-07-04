

import historicalEventsRepository from '../repository/historicalEventsRepository'

exports.getHistoricalEventsByOcurrence = (ctx) => {
    if(ctx.params.ocurrence.length != 2){
        ctx.status = 400;
        ctx.body = {message: "El input debe ser ac o dc"};
    }
    else{
        if(/\d/.test(ctx.params.ocurrence)){
            ctx.status = 400;
            ctx.body = {message: "Solo se aceptan caracteres no numericos"};
        }
        else if(ctx.params.ocurrence == "ac" || ctx.params.ocurrence == "dc"){
            ctx.status = 200;
            ctx.body = historicalEventsRepository.getHistoricalEvents(ctx.params.ocurrence.toLowerCase());
        }
        else{
            ctx.status = 400;
            ctx.body = {message: "Input no valido"};
        }
    }
}
