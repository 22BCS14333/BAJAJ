const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      throw new Error("Invalid input format");
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
    const highest_alphabet = alphabets.length ? [alphabets.sort().pop()] : [];

    res.json({
      is_success: true,
      user_id: "your_fullname_ddmmyyyy",
      email: "your_email@xyz.com",
      roll_number: "your_roll_number",
      numbers,
      alphabets,
      highest_alphabet
    });
  } catch (error) {
    res.status(400).json({ is_success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
