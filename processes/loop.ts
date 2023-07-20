import type { Manager } from 'magmastream';
import { ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Loops lavalink player
 *
 * @param music - Manager
 * @param guildId - Guild ID that the player is in
 * @param loopType - Value to represent loop type (0 - Disabled, 1 - Track, 2 - Queue)
 * @returns Object containing a response of ProcessResponseType
 */
export default async function loop(music: Manager, guildId: string, loopType: number) {
  const processResponse = {} as ProcessResponseType;

  const player = music.players.get(guildId);
  if (!player) {
    processResponse.response = ProcessResponses.NoPlayer;
    return processResponse;
  }

  switch (loopType) {
    case 0:
      player.setQueueRepeat(false);
      player.setTrackRepeat(false);
      processResponse.response = ProcessResponses.LoopDisabled;
      break;
    case 1:
      player.setQueueRepeat(false);
      player.setTrackRepeat(true);
      processResponse.response = ProcessResponses.LoopModeTrack;
      break;
    case 2:
      player.setQueueRepeat(true);
      player.setTrackRepeat(false);
      processResponse.response = ProcessResponses.LoopModeQueue;
      break;
  }

  return processResponse;
}
