import { SpaceHeader } from './space-header';

/**
 * Space history
 */
interface SpaceHistory {
    stack: string[];
    headers: { [spaceID: string]: SpaceHeader };
}

export default SpaceHistory;
