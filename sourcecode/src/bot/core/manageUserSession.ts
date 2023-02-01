import { v4 as uuidv4 } from "uuid";
export default function manageUserSession(username: string): string {
    let sessionId;
    if (sessions.get(username)) {
        sessionId = sessions.get(username);
    } else {
        sessionId = uuidv4();
        sessions.set(username, sessionId);
    }
    console.log(`Session ID : ${sessionId}`);
    return sessionId;
}
