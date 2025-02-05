

const testAPI = async () => {
  try {
    const level = 1; // Change this to the level you want to test
    const response = await axios.get(`http://localhost:3000/api/users?level=${level}`);
    console.log('Fetched Data:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

testAPI();