import bcrypt from 'bcrypt';

export const hashPW = async(password) => {
    const saltRound = 5
    const hash = await bcrypt.hash(password, saltRound)
    return hash
}

export const comparePW = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}
