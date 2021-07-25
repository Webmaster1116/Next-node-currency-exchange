const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ExchangeSchema = new mongoose.Schema({
    current: {
        compra: {
            type: Number
        },
        venta: {
            type: Number
        }
    },
    sunat: {
        compra: {
            type: Number
        },
        venta: {
            type: Number
        }
    },
    paralelo: {
        compra: {
            type: Number
        },
        venta: {
            type: Number
        }
    },
    dollarHouse: {
        compra: {
            type: Number
        },
        venta: {
            type: Number
        }
    },
    cambix: {
        compra: {
            type: Number
        },
        venta: {
            type: Number
        }
    },
    acomo: {
        compra: {
            type: Number
        },
        venta: {
            type: Number
        }
    },
    bcp: {
        compra: {
            type: Number
        },
        venta: {
            type: Number
        }
    },
    
    currentVenta: {
        type: Number
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now
    }
});

module.exports = mongoose.model('exchange', ExchangeSchema);
