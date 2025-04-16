import FriendModel from './friends.schema.js'; // Assuming you have a Mongoose model for friends.

export default class FriendRepository {
    /**
     * Get all friends of a user
     * @param {string} userId - The ID of the user
     * @returns {Array} List of friends
     */
    async getAllFriend(userId) {
        try {
            const friends = await FriendModel.find({
                $or: [
                    { requester: userId, status: 'accepted' },
                    { recipient: userId, status: 'accepted' }
                ]
            })
                .populate('requester', 'name email') // Populate requester details
                .populate('recipient', 'name email'); // Populate recipient details
            return friends;
        } catch (error) {
            console.error('Error fetching friends:', error);
            throw new Error('Database error while fetching friends.');
        }
    }

    /**
     * Get all pending friend requests for a user
     * @param {string} userId - The ID of the user
     * @returns {Array} List of pending friend requests
     */
    async getPendingRequests(userId) {
        try {
            const pendingRequests = await FriendModel.find({
                recipient: userId,
                status: 'pending'
            })
                .populate('requester', 'name email'); // Populate requester details
            return pendingRequests;
        } catch (error) {
            console.error('Error fetching pending requests:', error);
            throw new Error('Database error while fetching pending requests.');
        }
    }

    /**
     * Toggle friendship status between two users
     * @param {string} userId - The ID of the current user
     * @param {string} friendId - The ID of the other user
     * @returns {string} The updated status ("added", "removed", "pending")
     */
    async toggleFriendship(userId, friendId) {
        try {
            const existingRequest = await FriendModel.findOne({
                $or: [
                    { requester: userId, recipient: friendId },
                    { requester: friendId, recipient: userId }
                ]
            });

            if (existingRequest) {
                if (existingRequest.status === 'accepted') {
                    await FriendModel.deleteOne({ _id: existingRequest._id });
                    return 'removed';
                } else if (existingRequest.status === 'pending') {
                    existingRequest.status = 'accepted';
                    await existingRequest.save();
                    return 'accepted';
                }
            } else {
                const newRequest = new FriendModel({
                    requester: userId,
                    recipient: friendId,
                    status: 'pending'
                });
                await newRequest.save();
                return 'pending';
            }
        } catch (error) {
            console.error('Error toggling friendship:', error);
            throw new Error('Database error while toggling friendship.');
        }
    }

    /**
     * Respond to a friend request
     * @param {string} userId - The ID of the current user
     * @param {string} friendId - The ID of the requester
     * @param {string} response - The response ("accept" or "decline")
     * @returns {Object} Updated request or null
     */
    async respondToRequest(userId, friendId, response) {
        try {
            const request = await FriendModel.findOne({
                recipient: userId,
                requester: friendId,
                status: 'pending'
            });

            if (!request) {
                throw new Error('No pending request found.');
            }

            if (response === 'accept') {
                request.status = 'accepted';
                await request.save();
                return request;
            } else if (response === 'decline') {
                await FriendModel.deleteOne({ _id: request._id });
                return null;
            }
        } catch (error) {
            console.error('Error responding to request:', error);
            throw new Error('Database error while responding to request.');
        }
    }
}
