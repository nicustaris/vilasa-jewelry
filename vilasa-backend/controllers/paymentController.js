const asyncWrapper = require("../middleware/asyncErrorHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paytm = require("paytmchecksum");
const https = require("https");
const Payment = require("../model/paymentModel");
const ErrorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require("razorpay");

/**
 * Initialize Razorpay instance
 */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @desc    Process payment using Stripe
 * @route   POST /api/payments/stripe
 * @access  Public
 * @param   {number} amount - The payment amount
 * @param   {string} email - Email associated with payment
 * @param   {string} phoneNo - Phone number associated with payment
 */
exports.processStripePayment = asyncWrapper(async (req, res, next) => {
  const { amount, email, phoneNo } = req.body;

  const myPayment = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    metadata: {
      company: "Vilasa",
    },
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

/**
 * @desc    Process payment using Paytm
 * @route   POST /api/payments/paytm
 * @access  Public
 * @param   {number} amount - The payment amount
 * @param   {string} email - Email associated with payment
 * @param   {string} phoneNo - Phone number associated with payment
 */
exports.processPaytmPayment = asyncWrapper(async (req, res, next) => {
  const { amount, email, phoneNo } = req.body;

  var params = {};
  params["MID"] = process.env.PAYTM_MID;
  params["WEBSITE"] = process.env.PAYTM_WEBSITE;
  params["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID;
  params["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE;
  params["ORDER_ID"] = "oid" + uuidv4();
  params["CUST_ID"] = process.env.PAYTM_CUST_ID;
  params["TXN_AMOUNT"] = JSON.stringify(amount);
  params["CALLBACK_URL"] = `https://${req.get("host")}/api/v1/payments/paytm/callback`;
  params["EMAIL"] = email;
  params["MOBILE_NO"] = phoneNo;

  let paytmChecksum = paytm.generateSignature(
    params,
    process.env.PAYTM_MERCHANT_KEY
  );
  paytmChecksum
    .then(function (checksum) {
      let paytmParams = {
        ...params,
        CHECKSUMHASH: checksum,
      };

      res.status(200).json({
        success: true,
        paytmParams,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

/**
 * @desc    Handle Paytm callback response
 * @route   POST /api/payments/paytm/callback
 * @access  Public
 */
exports.paytmResponse = (req, res, next) => {
  let paytmChecksum = req.body.CHECKSUMHASH;
  delete req.body.CHECKSUMHASH;

  let isVerifySignature = paytm.verifySignature(
    req.body,
    process.env.PAYTM_MERCHANT_KEY,
    paytmChecksum
  );

  if (isVerifySignature) {
    var paytmParams = {};
    paytmParams.body = {
      mid: req.body.MID,
      orderId: req.body.ORDERID,
    };

    paytm.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MERCHANT_KEY
    ).then(function (checksum) {
      paytmParams.head = {
        signature: checksum,
      };

      var post_data = JSON.stringify(paytmParams);
      var options = {
        hostname: "securegw-stage.paytm.in",
        port: 443,
        path: "/v3/order/status",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };

      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });

        post_res.on("end", function () {
          let { body } = JSON.parse(response);
          addPayment(body);
          res.redirect(`https://${req.get("host")}/order/${body.orderId}`);
        });
      });

      post_req.write(post_data);
      post_req.end();
    });
  } else {
    console.log("Checksum Mismatched");
  }
};

/**
 * @desc    Process payment using Razorpay
 * @route   POST /api/payments/razorpay
 * @access  Public
 * @param   {number} amount - The payment amount
 * @param   {string} currency - The currency for payment (optional)
 * @param   {string} receipt - The payment receipt (optional)
 * @param   {boolean} payment_capture - Payment capture flag (optional)
 */
exports.processRazorpayPayment = asyncWrapper(async (req, res, next) => {
  const { amount, currency, receipt, payment_capture } = req.body;

  const options = {
    amount: amount * 100, // Razorpay expects amount in paise
    currency: currency || "INR",
    receipt: receipt || uuidv4(),
    payment_capture: payment_capture || 1, // Auto-capture payment
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      return next(new ErrorHandler("Payment Failed", 500));
    }

    res.status(200).json({
      success: true,
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  });
});

/**
 * @desc    Handle Razorpay webhook response
 * @route   POST /api/payments/razorpay/webhook
 * @access  Public
 */
exports.razorpayWebhook = (req, res, next) => {
  // Implement Razorpay webhook handling logic here
};

/**
 * @desc    Save payment details to database
 * @param   {Object} data - Payment data
 * @returns {Promise<void>}
 */
const addPayment = async (data) => {
  try {
    await Payment.create(data);
  } catch (error) {
    console.log("Payment Failed!");
  }
};

/**
 * @desc    Get payment status by order ID
 * @route   GET /api/payments/status/:id
 * @access  Public
 * @param   {string} id - The order ID
 * @returns {Object} Payment status
 */
exports.getPaymentStatus = asyncWrapper(async (req, res, next) => {
  const payment = await Payment.findOne({ orderId: req.params.id });

  if (!payment) {
    return next(new ErrorHandler("Payment Details Not Found", 404));
  }

  const txn = {
    id: payment.txnId,
    status: payment.resultInfo.resultStatus,
  };

  res.status(200).json({
    success: true,
    txn,
  });
});
