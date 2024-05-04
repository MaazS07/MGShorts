const Content = require('../models/contentModel');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const createContent = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('File Upload Error');
      }

      const { title, content } = req.body;

      // Update to use the file path and content type from the file upload
      const imagePath = req.file.filename; // Use only the filename, not the full path
      const contentType = req.file.mimetype;

      const newContent = new Content({ image: { data: imagePath, contentType }, title, content });

      try {
        await newContent.validate();  // Explicitly validate the document
        await newContent.save();      // Save the document if validation passes
        res.status(201).json(newContent);
      } catch (validationError) {
        console.error(validationError);
        res.status(400).json({ error: 'Validation Error', details: validationError.errors });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};






const getAllContent = async (req, res) => {
  try {
    const allContent = await Content.find();
    res.json(allContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


const deleteContent = async (req, res) => {
  const id = req.params.id;

  try {
    await Content.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


const updateContent = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required for update' });
    }

    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true } 
    );

    if (!updatedContent) {
      return res.status(404).json({ error: 'Content not found for update' });
    }

    res.json(updatedContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createContent,
  getAllContent,
  deleteContent,
  updateContent, 
};

