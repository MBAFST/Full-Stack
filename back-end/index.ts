import express, { Request, Response } from "express";
import cors from "cors";
import Chance from "chance";

const app = express();
app.use(cors());
app.use(express.json());

const chance = new Chance();

const animals = [...Array(250).keys()].map(id => {
	return {
		id: id,
		type: chance.animal(),
		age: chance.age(),
		name: chance.name()
	};
});

app.get("", (request: Request, response: Response) => {
	const query = (request.query.q as string)?.toLowerCase() || "";
	const results = animals.filter(animal => animal.type.toLowerCase().startsWith(query));

	response.send(results);
});

app.listen(8080, () => console.log("Listening on port http://localhost:8080"));
