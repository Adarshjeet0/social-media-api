// import FriendRepository from './friends.repository.js';
// export default class FriendController{
//     constructor(){
//         this.friendRepository = new FriendRepository();
//     }
//     async getAllFriend(req, res){
//         try {
//             const userId = req.params.userId;
//             const friends = await this.friendRepository.getAllFriend(userId);
//             if(friends){
//                 return res.status(200).send(friends);
//             }else{
//                 return res.status(404).send("This user don't have any friend");
//             }
//         } catch (error) {
//             console.log(error);
//             res.status(501).send("Something went wrong with databases");
//         }
//     }

//     async getPendingRequests(req, res){
//         try {
//             const pendingRequests = await friendRepository.getPendingRequests(req.userId);
//             return res.status(200).json(pendingRequests);
//         } catch (err) {
//             return res.status(500).json({ error: 'Unable to fetch pending requests' });
//         }
//     }

//     async toggleFriendship(req, res){
//         const { friendId } = req.params;
//         const { userId } = req; // Assume `req.userId` is available via middleware
//         try {
//             const status = await friendRepository.toggleFriendship(userId, friendId);
//             return res.status(200).json({ message: 'Friendship status updated', status });
//         } catch (err) {
//             return res.status(500).json({ error: 'Unable to toggle friendship' });
//         }
//     }

//     async responseTORequest(req, res){
//         const { friendId } = req.params;
//         const { response } = req.body; // 'accept' or 'decline'
//         const { userId } = req; // Assume `req.userId` is available via middleware
//         try {
//             const result = await friendRepository.respondToRequest(userId, friendId, response);
//             return res.status(200).json({ message: 'Response recorded', result });
//         } catch (err) {
//             return res.status(500).json({ error: 'Unable to respond to request' });
//         }
//     }
// }




import FriendRepository from './friends.repository.js';

export default class FriendController {
    constructor() {
        this.friendRepository = new FriendRepository();
    }

    async getAllFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friends = await this.friendRepository.getAllFriend(userId);
            if (!friends || friends.length === 0) {
                return res.status(404).json({ message: "This user doesn't have any friends." });
            }
            return res.status(200).json(friends);
        } catch (error) {
            console.error('Error fetching friends:', error);
            return res.status(500).json({ error: "Database error occurred while fetching friends." });
        }
    }

    async getPendingRequests(req, res) {
        try {
            const pendingRequests = await this.friendRepository.getPendingRequests(req.userId);
            return res.status(200).json(pendingRequests);
        } catch (err) {
            console.error('Error fetching pending requests:', err);
            return res.status(500).json({ error: 'Unable to fetch pending requests' });
        }
    }

    async toggleFriendship(req, res) {
        const { friendId } = req.params;
        const userId  = req.userId;

        try {
            const status = await this.friendRepository.toggleFriendship(userId, friendId);
            return res.status(200).json({ message: 'Friendship status updated', status });
        } catch (err) {
            console.error('Error toggling friendship:', err);
            return res.status(500).json({ error: 'Unable to toggle friendship' });
        }
    }

    async responseTORequest(req, res) {
        const { friendId } = req.params;
        const { response } = req.body;
        const { userId } = req;

        try {
            const result = await this.friendRepository.respondToRequest(userId, friendId, response);
            return res.status(200).json({ message: 'Response recorded', result });
        } catch (err) {
            console.error('Error responding to request:', err);
            return res.status(500).json({ error: 'Unable to respond to request' });
        }
    }
}
