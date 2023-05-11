const fs = require("fs");

const loadData = () => {
	const allUsers = fs.readFileSync("./data/users.json", "utf-8");
	// ubah ke object
	const formatUsers = JSON.parse(allUsers) || [];

	return formatUsers;
}

const addData = (data) => {
	// mengambil isi dari file users.json
	const users = loadData()
	users.push(data)

	// ubah lagi ke string dan masukan ke file users.json
	fs.writeFileSync("./data/users.json", JSON.stringify(users))
}

const generateColor = (nama) => {
	const data = [];
	const splitName = nama.split(" ");

	if(splitName.length < 2){
		const avatar =  splitName[0].charAt(0) + splitName[0].charAt(1);
		data.push(avatar)
	}else {
		const avatar =  splitName[0].charAt(0) + splitName[1].charAt(0);
		data.push(avatar)
	}
	
	const charCodeRed = data[0].charCodeAt(0);
	const charCodeGreen = data[0].charCodeAt(1);

	const red = Math.pow(charCodeRed, 7) % 200;
	const green = Math.pow(charCodeGreen, 7) % 200;
	const blue = (red + green) % 200;

	const rgb = `rgb(${red}, ${green}, ${blue})`;
	data.push(rgb)
	
	return data;
}

module.exports = {
	addData,
	loadData,
	generateColor
}