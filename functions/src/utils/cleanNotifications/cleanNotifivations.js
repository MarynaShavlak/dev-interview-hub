const { db } = require('../notificationHelpers/notificationHelpers');

/**
 * Helper function to delete old notifications for a specific user
 * @param {object} personalNotificationsRef - Firestore reference to personal notifications
 * @param {string} userId - User ID
 * @param {string} cutoffTimestamp - ISO string timestamp for 30 days ago
 * @returns {number} Count of deleted notifications
 */
async function deleteOldUserNotifications(
    personalNotificationsRef,
    userId,
    cutoffTimestamp,
) {
    // Query for old notifications for this user
    const oldUserNotificationsQuery = await personalNotificationsRef
        .collection(userId)
        .where('timestamp', '<', cutoffTimestamp)
        .get();

    if (oldUserNotificationsQuery.empty) {
        return 0;
    }

    // Delete each notification in batches
    const batch = db.batch();
    let userCount = 0;

    oldUserNotificationsQuery.forEach((doc) => {
        batch.delete(doc.ref);
        userCount += 1;
    });

    // Commit the batch delete
    await batch.commit();
    console.log(`Deleted ${userCount} old notifications for user ${userId}`);
    return userCount;
}

/**
 * Delete general notifications older than the cutoff date
 * @param {string} cutoffTimestamp - ISO string timestamp for 30 days ago
 */
async function cleanupGeneralNotifications(cutoffTimestamp) {
    // Get reference to general notifications collection
    const generalNotificationsRef = db
        .collection('notifications')
        .doc('general')
        .collection('messages');

    // Query for old notifications
    const oldNotificationsQuery = await generalNotificationsRef
        .where('timestamp', '<', cutoffTimestamp)
        .get();

    // Check if we found any notifications to delete
    if (oldNotificationsQuery.empty) {
        console.log('No old general notifications to delete');
        return;
    }

    // Delete each notification in batches
    const batch = db.batch();
    let count = 0;

    oldNotificationsQuery.forEach((doc) => {
        batch.delete(doc.ref);
        count += 1;
    });

    // Commit the batch delete
    await batch.commit();
    console.log(`Deleted ${count} old general notifications`);
}

/**
 * Delete personal notifications older than the cutoff date for all users
 * @param {string} cutoffTimestamp - ISO string timestamp for 30 days ago
 */
async function cleanupPersonalNotifications(cutoffTimestamp) {
    // Get reference to personal notifications
    const personalNotificationsRef = db
        .collection('notifications')
        .doc('personal');

    // Get all user subcollections
    const userCollectionsSnapshot =
        await personalNotificationsRef.listCollections();
    const userCollections = userCollectionsSnapshot.map(
        (collection) => collection.id,
    );

    // Process all users' notifications using Promise.all
    const results = await Promise.all(
        userCollections.map((userId) =>
            deleteOldUserNotifications(
                personalNotificationsRef,
                userId,
                cutoffTimestamp,
            ),
        ),
    );

    // Sum up the total deleted count
    const totalDeleted = results.reduce((sum, count) => sum + count, 0);
    console.log(`Total personal notifications deleted: ${totalDeleted}`);
}

module.exports = { cleanupGeneralNotifications, cleanupPersonalNotifications };
