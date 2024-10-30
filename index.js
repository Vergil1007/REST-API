import express from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import open from "open";
import { countries, cities } from "./world.js";

const port = 3000;
const app = express();
app.use(express.json());

const swaggerDocs = yaml.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/countries", (req, res) => res.json(countries));

app.get("/countries/:id", (req, res) => {
  const country = countries.find((c) => c.id === parseInt(req.params.id));
  country
    ? res.json(country)
    : res.status(404).json({ message: "Country not found" });
});

app.post("/countries", (req, res) => {
  const country = { id: countries.length + 1, ...req.body };
  countries.push(country);
  res.status(201).json(country);
});

app.put("/countries/:id", (req, res) => {
  const index = countries.findIndex((c) => c.id === parseInt(req.params.id));
  if (index !== -1) {
    countries[index] = { ...countries[index], ...req.body };
    res.json(countries[index]);
  } else {
    res.status(404).json({ message: "Country not found" });
  }
});

app.delete("/countries/:id", (req, res) => {
  const index = countries.findIndex((c) => c.id === parseInt(req.params.id));
  if (index !== -1) {
    countries.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Country not found" });
  }
});

app.get("/cities", (req, res) => res.json(cities));

app.get("/cities/:id", (req, res) => {
  const city = cities.find((c) => c.id === parseInt(req.params.id));
  city ? res.json(city) : res.status(404).json({ message: "City not found" });
});

app.post("/cities", (req, res) => {
  const city = { id: cities.length + 1, ...req.body };
  cities.push(city);
  res.status(201).json(city);
});

app.put("/cities/:id", (req, res) => {
  const index = cities.findIndex((c) => c.id === parseInt(req.params.id));
  if (index !== -1) {
    cities[index] = { ...cities[index], ...req.body };
    res.json(cities[index]);
  } else {
    res.status(404).json({ message: "City not found" });
  }
});

app.delete("/cities/:id", (req, res) => {
  const index = cities.findIndex((c) => c.id === parseInt(req.params.id));
  if (index !== -1) {
    cities.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "City not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  open(`http://localhost:${port}/api-docs`);
});
