import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// const directoryPathLinux = `${path.join(__dirname, "..", "Routes").slice(1)}\*.js`;
const directoryPath = `${path.join(__dirname, "..", "Routes").slice(1)}/*.js`;
const decodedpath = decodeURIComponent(directoryPath);
// console.log(`SWAGGER_LINUX:PATH--->`,directoryPathLinux)
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "CARS",
            version: "1.7.1",
            description: "CARS",
            contact: {
                name: "Patrick",
                url: "https://www.folio11.vercel.app",
                email: "mohammedola1234@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:4200/",
                description: "Development server",
            },
        ],
        basePath: "/",
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        explorer: true,
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [decodedpath],
};
const swaggerconfig = swaggerJSDoc(options);
export default swaggerconfig;
