import http from '../http-common';

const HomeDataService = {
  getAll() {
    return http.get('/');
  },
  submit(data) {
    return http.post('/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  },
  getAllLevels() {
    return http.get('/levels');
  },
  editLevel(levelID, levelData) {
    console.log(levelData);
    return http.post(`/levels/${levelID}/edit`, levelData);
  },
  deleteLevel(levelID) {
    return http.post(`/levels/${levelID}/delete`);
  },
}

export default HomeDataService;
