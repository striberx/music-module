import type { MoonlinkManager } from 'moonlink.js';
import { ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Loops lavalink player
 *
 * @param music - MoonlinkManager
 * @param guildId - Guild ID that the player is in
 * @param loopType - Value to represent loop type (0 - Disabled, 1 - Track, 2 - Queue)
 * @returns Object containing a response of ProcessResponseType
 */
export default async function loop(music: MoonlinkManager, guildId: string, loopType: number) {
  const processResponse = {} as ProcessResponseType;

  const player = music.players.get(guildId);
  if (!player?.connected) {
    processResponse.response = ProcessResponses.NoPlayer;
    return processResponse;
  }

  player.setLoop(loopType === 0 ? null : loopType);

  switch (loopType) {
    case 0:
      processResponse.response = ProcessResponses.LoopDisabled;
      break;
    case 1:
      processResponse.response = ProcessResponses.LoopModeTrack;
      break;
    case 2:
      processResponse.response = ProcessResponses.LoopModeQueue;
      break;
  }

  return processResponse;
}
