import bcrypt from 'bcrypt';

export const hashData = async (data, rounds = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, rounds);
        return hashedData;
    } catch (error) {
        throw error;
    }
}

export const compareHashData = async (data, hashedData) => {
    try {
        const comparedData = await bcrypt.compare(data, hashedData);
        return comparedData;
    } catch (error) {
        throw error;
    }
}