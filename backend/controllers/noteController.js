import Note from "../models/Note.js";

// get all notes for logged-in user
export const getNotes = async (req, res) => {
  // Note.find() kabhi null return nahi karta - agar kuch nahi mila, toh ye [] (empty array) return karega
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

// get single note for logged in user
export const getSingleNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({message: "Note not found"});

    //Koi aur user dusre user ka note access na kar paye isliye ye check important hai
    if(note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({message: "Unauthorized access"});
    }

    res.status(200).json({note});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }  
}

// create a new note
export const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const note = await Note.create({
    user: req.user._id,
    title,
    content,
  });
  res.status(201).json(note);
};

// update a note
export const updateNote = async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

  if (!note) return res.status(404).json({ message: "Note not found" });

  note.title = title || note.title;
  note.content = content || note.content;
  const updatedNote = await note.save();

  res.status(200).json(updatedNote);
};

// delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    //note yahan ek Mongoose document instance hai — ek single Note object jo MongoDB se mila hai.
    // note k andar mongoose ke internal methods bhi honge like .save(), .remove() etc

    if (!note)
      return res.status(404).json({ message: "deleting note not found" });

    await note.deleteOne(); // ye note jo abhi mil gaya hai, isko database se hata do
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
