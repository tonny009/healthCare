import app from "./app";
import { seedSuperAdmin } from "./app/utils/seed";

const bootstrap = async() => {
    try {
        await seedSuperAdmin(); // Seed the super admin user
        app.listen(3000, () => {
            console.log(`Server is running on http://localhost:3000`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

bootstrap();