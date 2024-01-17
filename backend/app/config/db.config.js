module.exports = {

    HOST:"localhost",
    USER:"root",
    PASSWORD:"rootpass",
    DB:"practica",
    dialect:"mysql",
    pool:{
        max:20,
        min:0,
        acquire:30000,
        idle:10000
    }
    
}