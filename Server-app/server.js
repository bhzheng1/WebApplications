const express = require("express");
const fs = require("fs-extra");
const cors = require("cors");

const app = express();
const port = 3000;

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// Use cors middleware
app.use(cors(corsOptions));

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

async function readData() {
    try {
        const jsonData = await fs.readFile("db.json", "utf8");
        return JSON.parse(jsonData);
    } catch (err) {
        console.error("Error reading data:", err);
        return { items: [] };
    }
}

// GET route - Allows to get all the items
// example: localhost:3000/clothes?page=0&perPage=2
app.get("/clothes", async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const perPage = parseInt(req.query.perPage) || 10;

    await readData()
        .then((data) => {
            const start = page * perPage;
            const end = start + perPage;
            const result = data.items.slice(start, end);
            res.status(200).json({
                items: result,
                total: data.items.length,
                page,
                perPage,
                totalPages: Math.ceil(data.items.length / perPage),
            });
        })
        .catch((err) => {
            console.error("Error reading data:", err);
            res.status(500).send("Internal Server Error");
        });
});

// POST route - Allows to add a new item
// example: localhost:3000/clothes
/*
  body: {
    "image": "https://your-image-url.com/image.png",
    "name": "T-shirt",
    "price": "10",
    "rating": 4
  }
*/
app.post("/clothes", async (req, res) => {
    const { image, name, price, rating } = req.body;

    await readData()
        .then(async (data) => {
            const maxId = data.items.reduce(
                (max, item) => Math.max(max, item.id),
                0
            );
            const newItem = {
                id: maxId + 1,
                image,
                name,
                price,
                rating,
            };
            data.items.push(newItem);

            await fs.writeFile("db.json", JSON.stringify(data, null, 2));
            res.status(201).json(newItem);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
});

// PUT route - Allows to update an item
// example: localhost:3000/clothes/1
/*
  body: {
    "image": "https://your-image-url.com/image.png",
    "name": "T-shirt",
    "price": "10",
    "rating": 4
  }
*/
app.put("/clothes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { image, name, price, rating } = req.body;

    await readData()
        .then(async (data) => {
            const index = data.items.findIndex((item) => item.id === id);

            if (index === -1) {
                res.status(404).send("Not Found");
                return;
            }

            data.items[index] = {
                id,
                image,
                name,
                price,
                rating,
            };

            await fs.writeFile("db.json", JSON.stringify(data, null, 2));
            res.status(200).json(data.items[index]);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
});

// DELETE route - Allows to delete an item
// example: localhost:3000/clothes/1
app.delete("/clothes/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    await readData()
        .then(async (data) => {
            const index = data.items.findIndex((item) => item.id === id);

            if (index === -1) {
                res.status(404).send("Not Found");
                return;
            }

            data.items.splice(index, 1);

            await fs.writeFile("db.json", JSON.stringify(data, null, 2));
            res.status(204).send();
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

// npm start
