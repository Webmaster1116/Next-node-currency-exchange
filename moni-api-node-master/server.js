const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const ejs = require('ejs');
const cron = require('node-cron');
const config = require('config');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var request = require('request');
var cheerio = require('cheerio');

const url = 'https://cuantoestaeldolar.pe/cambio-de-dolar-online';
const app = express();
const Agent = require('./models/Agent');
const Exchange = require('./models/Exchange');
const Invoice = require('./models/Invoice');
const exchangeId = '5f0bf9ca15cc992e4490987a';

var auth = {
	type: 'oauth2',
	user: 'developermods50@gmail.com',
	clientId:
		'204950957779-0ngcr3h2ih2mg3gjmursajqsinqruog6.apps.googleusercontent.com',
	clientSecret: 'GZO5nwXG1P4paTVOIamq4E5E',
	refreshToken:
		'1//0gMWhxXs-_ixUCgYIARAAGBASNwF-L9Ir0Pc20BVkzSS8TdOujubcANtz6VZSnT45ao844xqOjMqMdSTaticYhJyc8QgbbOWtRsI',
};

const transport = nodemailer.createTransport({
	name: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // use SSL
	auth: auth,
});

cron.schedule('5 8 * * 0', async function () {
	console.log('---------------------');
	console.log('Running Cron Job');
	Agent.find({}, (err, users) => {
		if (err) {
			console.log(err);
		}

		users.map(async user => {
			console.log(__dirname + '/templates/mail/invoice.ejs');
			const _id = user._id;
			const name = user.name;
			const email = user.email;
			const commissionDollars = user.commissionDollars;
			const commissionSoles = user.commissionSoles;
			let startDay = new Date();
			startDay.setDate(startDay.getDate() - ((startDay.getDay() + 6) % 7));
			let endDay = new Date(startDay.getTime() + 7 * 24 * 60 * 60 * 1000);
			const invoice = new Invoice({
				name,
				commissionDollars,
				commissionSoles,
				agent: _id,
				endDay,
				startDay,
			});

			const invoiceNew = await invoice.save();
			const ejsFile = await ejs.renderFile(
				__dirname + '/templates/mail/invoice.ejs',
				{
					_id,
					name,
					email,
					commissionDollars,
					commissionSoles,
				}
			);

			const messageNew = {
				// Sender address
				to: email, // List of recipients
				subject: 'Factura',
				html: ejsFile, // Subject line
			};
			// await transport.sendMail(messageNew, function (error, info) {
			// 	if (error) {
			// 		throw error;
			// 	} else {
			// 		console.log('Email successfully sent!');
			// 	}
			// });
		});
	});
});

cron.schedule('30 * * * *', async function () {
	await request(url, async function (error, response, html) {
		if (!error) {
			var $ = cheerio.load(html);
			var list = $('div.tb_dollar_compra')
				.map(function () {
					return parseFloat($(this).text().trim().replace('$', ''));
				})
				.toArray();
			var list2 = $('div.td.tb_dollar_venta')
				.map(function () {
					return parseFloat(
						$(this).text().trim().replace('S./', '').replace('S/.', '')
					);
				})
				.toArray();
			//   console.log(list2);
			const body = {
				sunat: {
					compra: list[1],
					venta: list2[1],
				},
				paralelo: {
					compra: list[2],
					venta: list2[2],
				},
				dollarHouse: {
					compra: list[8],
					venta: list2[8],
				},
				cambix: {
					compra: list[10],
					venta: list2[10],
				},
				acomo: {
					compra: list[12],
					venta: list2[12],
				},
				bcp: {
					compra: list[15],
					venta: list2[15],
				},
			};
			console.log(body);
			exchange = await Exchange.findByIdAndUpdate(
				exchangeId,
				{ $set: body },
				{ new: true }
			);
			//   const exchange = new Exchange(body);
			//   const ex = exchange.save();

			console.log(exchange);
		}
		// console.log($("div.tb_dollar_compra")['11']);
	});
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/agent', require('./routes/agent'));
app.use('/api/operations', require('./routes/operations'));
app.use('/api/mail', require('./routes/mail'));
app.use('/api/verify', require('./routes/verify'));
app.use('/api/forget', require('./routes/forget'));
app.use('/api/agentprofile', require('./routes/agentprofiles'));
app.use('/api/agentaccounts', require('./routes/agentaccounts'));
app.use('/api/exchange', require('./routes/exchange'));
app.use('/api/newsletter', require('./routes/newsletter'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started, Port :  ${PORT}`));
