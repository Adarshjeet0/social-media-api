
import UserModel from '../users/user.schema.js'; // Replace with your actual user schema path
import bcrypt from 'bcrypt';

export default class SendOTPRepository {
    /**
     * Finds a user in the database by their email.
     * @param {string} useremail - The email of the user to find.
     * @returns {Promise<Object|null>} The user object if found, otherwise null.
     */
    async findUserByEmail(useremail) {
        try {
            const user = await UserModel.findOne({ email: useremail });
            return user;
        } catch (error) {
            console.error(`Error finding user by email: ${error.message}`);
            throw new Error('Database query failed');
        }
    }

    /**
     * Hashes the provided password using bcrypt.
     * @param {string} newPassword - The plain-text password to hash.
     * @returns {Promise<string>} The hashed password.
     */
    async hashPassword(newPassword) {
        try {
            const saltRounds = 10; // Number of rounds for salting
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            return hashedPassword;
        } catch (error) {
            console.error(`Error hashing password: ${error.message}`);
            throw new Error('Failed to hash password');
        }
    }

    /**
     * Updates the password for a user in the database.
     * @param {string} useremail - The email of the user whose password needs to be updated.
     * @param {string} hashedPassword - The new hashed password.
     * @returns {Promise<Object>} The result of the update operation.
     */
    async updatePassword(useremail, hashedPassword) {
        try {
            const result = await UserModel.updateOne(
                { email: useremail },
                { password: hashedPassword }
            );
            return result;
        } catch (error) {
            console.error(`Error updating password: ${error.message}`);
            throw new Error('Failed to update password');
        }
    }
}
