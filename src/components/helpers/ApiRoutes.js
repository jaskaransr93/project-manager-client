const BASE_URL = 'http://localhost:5000';
export default {
    user: BASE_URL +'/api/users',
    auth: BASE_URL + '/api/auth',
    contact: BASE_URL + '/api/contacts',
    updateContact: (id) => BASE_URL + '/api/contacts/update/' + id,
    notes: BASE_URL + '/api/contacts/notes',
    deleteContact: (id) => BASE_URL + '/api/contacts/' + id
}