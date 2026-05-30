import Contact from "../models/Contact.js";

// SEND MESSAGE (frontend form)
export const sendMessage = async (req, res) => {
  try {
    const message = await Contact.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// GET ALL MESSAGES (admin panel)
export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// DELETE MESSAGE
export const deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};