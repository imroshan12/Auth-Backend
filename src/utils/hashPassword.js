import bcrypt from 'bcrypt';

const hashData = async (data, rounds = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, rounds);
        return hashedData;
    } catch (error) {
        throw error;
    }
}

export default hashData