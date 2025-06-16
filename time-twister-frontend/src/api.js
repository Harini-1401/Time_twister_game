import axios from 'axios';

export async function getGameState() {
  const response = await axios.get('http://localhost:8080/api/state');
  return response.data;
}

export async function postMove(direction) {
  const response = await axios.post('http://localhost:8080/api/move', { direction });
  return response.data;
}

export async function undoMove() {
  const response = await axios.post('http://localhost:8080/api/undo');
  return response.data;
}
