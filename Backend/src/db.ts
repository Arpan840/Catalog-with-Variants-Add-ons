import { AppDataSource } from './dataSource';

const Connections = async () => {
AppDataSource.initialize()
  .then(() => {
    console.log('PostgreSQL database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
};
  export default Connections;