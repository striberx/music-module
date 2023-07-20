import type { Manager } from 'magmastream';
import { ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Resumes lavalink player
 *
 * @param music - MoonlinkManager
 * @param guildId - Guild ID that the player is in
 * @returns Object containing a response of ProcessResponseType
 */
export default async function pause(music: Manager, guildId: string) {
  const playResponse = {} as ProcessResponseType;

  const player = music.players.get(guildId);
  if (!player) {
    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  if (!player?.paused) {
    playResponse.response = ProcessResponses.PlayerBusy;
    return playResponse;
  }

  player.pause(false);

  playResponse.response = ProcessResponses.PlayerResumed;
  return playResponse;
}
