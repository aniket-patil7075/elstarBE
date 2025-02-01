const mongoose = require('mongoose');

const dealerEstimateSchema = new mongoose.Schema({
    orderNo: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
        default: 0
    },
    orderName: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
        default: ''
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DealerCustomer',
        default: null // Set to null instead of empty string
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DealerVehicle',
        default: null // Set to null instead of empty string
    },
    comments: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
        default: ''
    },
    recommendation: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
        default: ''
    },
    grandTotal: {
        type: mongoose.Schema.Types.Mixed,
        default: 0
    },
    isAuthorized: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'Estimates'
    },
    completedDate: {
        type: String,
        default: ''
    },
    completedTime: {
        type: String,
        default: ''
    },
    dueDate: {
        type: String,
        default: ''
    },
    dueTime: {
        type: String,
        default: ''
    },
    isPaymentReceived: {
        type: mongoose.Schema.Types.Mixed,
        default: false
    },
    paymentDate: {
        type: mongoose.Schema.Types.Mixed,
        default: ''
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'mobile'],
        required: true
    },
    paymentNote: {
        type: mongoose.Schema.Types.Mixed,
        default: ''
    },

    services: [
        {
            serviceTitle: {
                type: mongoose.Schema.Types.Mixed,
                default: ''
            },
            note: {
                type: mongoose.Schema.Types.Mixed,
                trim: true,
                default: ''
            },
            serviceGrandTotal: {
                type: mongoose.Schema.Types.Mixed,
                default: 0
            },
            labors: [
                {
                    laborName: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    },
                    technician: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    },
                    hours: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    rate: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    disc: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    },
                    multiplier: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    },
                    discount: {
                        type: {
                            type: mongoose.Schema.Types.Mixed,
                            trim: true,
                            default: ''
                        },
                        value: {
                            type: mongoose.Schema.Types.Mixed,
                            trim: true,
                            default: 0
                        }
                    },
                    subTotal: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    taxable: {
                        type: mongoose.Schema.Types.Mixed,
                        default: false
                    },
                    displayHoursOnEstimateAndInvoice: {
                        type: mongoose.Schema.Types.Mixed,
                        default: false
                    },
                    displayNoteOnEstimateAndInvoice: {
                        type: mongoose.Schema.Types.Mixed,
                        default: false
                    }
                }
            ],
            parts: [
                {
                    technician: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    },
                    part: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    },
                    partHash: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    },
                    bin: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    },
                    partQty: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    partCost: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    partPrice: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    discount: {
                        type: {
                            type: mongoose.Schema.Types.Mixed,
                            trim: true,
                            default: ''
                        },
                        value: {
                            type: mongoose.Schema.Types.Mixed,
                            trim: true,
                            default: 0
                        }
                    },
                    partSubtotal: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    },
                    partId: {
                        type: mongoose.Schema.Types.Mixed,
                        ref: 'Part'
                    }
                }
            ],
            tires: [
                {
                    tire: {
                        type: mongoose.Schema.Types.Mixed,
                        ref: 'Tire'
                    },
                    tireHash: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    },
                    tireQty: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    tireCost: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    tirePrice: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    discount: {
                        type: {
                            type: mongoose.Schema.Types.Mixed,
                            trim: true,
                            default: ''
                        },
                        value: {
                            type: mongoose.Schema.Types.Mixed,
                            trim: true,
                            default: 0
                        }
                    },
                    tireSubtotal: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    additionalData: {
                        type: mongoose.Schema.Types.Mixed
                    }
                }
            ],
            subcontract: [
                {
                    subcontractName: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    vendor: {
                        type: mongoose.Schema.Types.Mixed,
                        ref: 'DealersVendor'
                    },
                    tags: [
                        {
                            type: mongoose.Schema.Types.Mixed,
                            ref: 'DealerTags'
                        }
                    ],
                    cost: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    price: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    discount: {
                        type: {
                            type: mongoose.Schema.Types.Mixed,
                            trim: true,
                            default: ''
                        },
                        value: {
                            type: mongoose.Schema.Types.Mixed,
                            trim: true,
                            default: 0
                        }
                    },
                    subTotal: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    }
                }
            ],
            serviceFee: [
                {
                    fee: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    },
                    feeSubtotal: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    },
                    feeSubtotalType: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    }
                }
            ],
            discount: [{
                discount: {
                    type: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: ''
                    },
                    value: {
                        type: mongoose.Schema.Types.Mixed,
                        trim: true,
                        default: 0
                    }
                },
            }],
            isArchived: {
                type: Boolean,
                default: false
            },
            isAuthorized: {
                type: Boolean,
                default: false
            }
        }
    ]
},
    { timestamps: true });

dealerEstimateSchema.pre('save', async function (next) {
    if (this.customer === "") this.customer = null;
    if (this.vehicle === "") this.vehicle = null;

    if (this.isNew) {
        try {
            const lastEstimate = await mongoose.model('Estimate').findOne().sort({ orderNo: -1 });
            this.orderNo = lastEstimate ? lastEstimate.orderNo + 1 : 1;
        } catch (error) {
            return next(error);
        }
    }

    next();
});

dealerEstimateSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const lastEstimate = await mongoose.model('Estimate').findOne().sort({ orderNo: -1 });
            this.orderNo = lastEstimate ? lastEstimate.orderNo + 1 : 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('Estimate', dealerEstimateSchema);
