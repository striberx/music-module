import type { MoonlinkManager } from 'moonlink.js';
import { ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Resumes lavalink player
 *
 * @param music - MoonlinkManager
 * @param guildId - Guild ID that the player is in
 * @returns Object containing a response of ProcessResponseType
 */
export default async function pause(music: MoonlinkManager, guildId: string) {
  const playResponse = {} as ProcessResponseType;

  const player = music.players.get(guildId);
  if (!player?.connected) {
    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  if (!player?.paused) {
    playResponse.response = ProcessResponses.PlayerBusy;
    return playResponse;
  }

  await player.resume();

  playResponse.response = ProcessResponses.PlayerResumed;
  return playResponse;
}
