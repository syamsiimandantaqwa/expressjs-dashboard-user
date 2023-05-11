const express = require("express")
const app = express();
const {
	addData,
	loadData,
	generateColor
} = require("./utils/main.js")


// view engine
app.set("views", "./views")
app.set("view engine", "ejs")

// serving static assets
app.use(express.static("css"))

// built-in middleware for handle request form data
app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
	const users = loadData()

	res.render("index", {
		title: "Dashboard",
		users,
	})
})

app.get("/add-user", (req, res) => {
	res.render("add-user", {
		title: "Tambah Data Baru"
	})
})

app.post("/add-user", (req, res) => {
	addData(req.body)
	res.redirect("/")
})

app.get("/detail-user", (req, res) => {
	const GenerateTheme = generateColor(req.query.nama)

	res.render("detail-user", {
		title: `${req.query.nama}`,
		user: req.query,
		theme: GenerateTheme,
	})
})

const server = app.listen(process.env.PORT || 3000, () => {
	console.log("silahkan buka http://localhost:3000/")
})

