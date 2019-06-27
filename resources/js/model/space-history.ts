import { SpaceHeader } from './space-list';

/**
 * Space history
 */
interface SpaceHistory {
    stack: string[];
    headers: { [spaceID: string]: SpaceHeader };
}

export default SpaceHistory;
