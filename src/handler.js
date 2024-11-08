const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
const { title, body, tags } = request.payload;
const id = nanoid(16);
const createdAt = new Date().toISOString();
const updatedAt = createdAt;
const newNote = {
  title, tags, body, id, createdAt, updatedAt
};

notes.push(newNote);
const isSuccess = notes.filter((note) => note.id === id).length > 0;
if(isSuccess) {
         const response = h.response(JSON.stringify(
              {
                   status: 'success',
                   message: 'Catatan berhasil ditambahkan',
                   data: {
                        noteId: id,
                   },
              }
         ));
         response.code(201);
         response.header('Content-Type', 'application/json');
         response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
         return response;
    }

     const response = h.response(JSON.stringify({
          status: 'fail',
          message: 'Catatan gagal ditambahkan'
     }));

     response.code(500);

     return response;
};

const getAllNotesHandler = (request, h) => {
  const response = h.response(JSON.stringify({
    status: 'success',
    data: {
      notes,
    }
  }));

  response.code(200);
  response.header('Content-Type', 'application/json');

  return response;
};

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      }
    };
  }
  const response = h.response(JSON.stringify({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  }));
  response.code(404);
  console.log(notes);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;

  const updatedAt = new Date().toISOString;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  };

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// eslint-disable-next-line no-undef
module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };