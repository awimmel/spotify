import axios from 'axios';
import RawData from '../models/RawData';
import Song from '../models/Song';

const storeRawData = async function(streamingInstances: RawData) {
  const response = await axios.post('http://localhost:5001/rawData', streamingInstances);

  return <boolean>response.data;
};

const retrieveRawData = async function(userId: string){
  const response = await axios.get(`http://localhost:5001/rawData/${userId}`);
  return <Song[]> response.data;
}

export { storeRawData, retrieveRawData };
