import app from './app';
import { config } from './config/config';

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server is running in ${config.env} mode on port ${PORT}`);
});
