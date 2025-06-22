export type FirestoreCollectionType =
    | 'articles'
    | 'comments'
    | 'notifications'
    | 'users'
    | 'ratings'
    | 'questions'
    | 'links'
    | 'hrInterviewQA'
    | 'vocabularies'
    | 'notifications/general/messages'
    | `notifications/personal/${string}`
    | 'liveCodeTasks';
