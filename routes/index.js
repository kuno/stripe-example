
/*
 * GET home page.
 */
var config = require('../config.json');

var stripe = require('stripe')(config.secretKey);

exports.index = function(req, res){
  res.render('index', { config: config });
};

exports.charge = function(req, res) {
  var card = req.body.stripeToken;
  var email = req.body.email;
  var plan = 'monthly';

  stripe.customers.create({
    card: card,
    email: email,
    plan: plan
  }, function(err, customer) {
    var error = null, quote = null;
    var wildeQuotes = [
      "A little sincerity is a dangerous thing, and a great deal of it is absolutely fatal.",
      "Always forgive your enemies; nothing annoys them so much.",
      "America is the only country that went from barbarism to decadence without civilization in between.",
      "I think that God in creating Man somewhat overestimated his ability.",
      "I am not young enough to know everything.",
      "Fashion is a form of ugliness so intolerable that we have to alter it every six months.",
      "Most modern calendars mar the sweet simplicity of our lives by reminding us that each day that passes is the anniversary of some perfectly uninteresting event.",
      "Scandal is gossip made tedious by morality."
    ];

    quote = wildeQuotes[parseInt(Math.random() * wildeQuotes.length, 10)];

    if (err) {
      res.render('quote', { error: err.message, quote: quote });

      return;
    }

    res.render('quote', { quote: quote, error: error });
  });
};
