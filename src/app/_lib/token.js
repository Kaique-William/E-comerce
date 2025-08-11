import jwt from 'jsonwebtoken';

const SecretKey = process.env.JWT_SECRET || "UltraSecretKey";

async function CreateToken(email){
 
    try{
        // Cria um novo token
        const token = jwt.sign({ email }, SecretKey, { 
            algorithm: "HS256",
            expiresIn: '12h' // Define a expiração em 12 horas  
        });

        return token;
     
    } catch (error) {
        console.error("Error: ", error);
    }
}

async function ValidateToken(token) {
    try {
       
        const decoded = jwt.verify(token, SecretKey);
        // console.log("validar decoded", decoded)

        if(decoded){
             const search = await db.query(`SELECT * FROM Usuarios WHERE token = ?`, [token]);

            if (search.length > 0) {
                return { isValid: true, user: search[0] };
            } else {
                return { isValid: false, message: "Usuário não encontrado" };
            }

        }
    
    } catch (error) {
        return { isValid: false, message: error.message };
    }
}

export { CreateToken, ValidateToken };